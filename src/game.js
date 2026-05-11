class Game {
    
    constructor(guiManager, nPieces, boardSize, testMode, debugMode=false) {
        // Initialize a game from an audio file.
        // boardSize: [# rows, # columns].

        this.guiManager = guiManager
        this.nPieces = nPieces
        this.testMode = testMode
        this.debugMode = debugMode
        this.gameEnded = false

        // Segment object to be populated when loading an audio file.
        this.segment = null
        this.solution = null

        // Game board where all the pieces are laid out.
        this.boardSize = boardSize
        this.board = new Board(this.guiManager, boardSize[0], boardSize[1], this.testMode, this.debugMode)

        // Timer that runs until the puzzle is solved.
        this.timer = new Timer(this.guiManager)

        // Properties used to handle moving pieces.
        this.slotBeingMovedFrom = ''
        this.slotBeingMovedElement = null

        // Audio engine.
        this.activeAudioContext = null
    }

    waitForYoutubePlayer = (interval = 100) => {
        return new Promise((resolve) => {
            const check = () => {
                if (this.guiManager.youtubePlayer != null) {
                    resolve(this.guiManager.getYoutubePlayer)
                } else {
                    setTimeout(check, interval)
                }
            }
            check()
        })
    }
    
    start(songTitle, youtubeId, startTime, endTime) {
        // Initialize a Youtube player with a music track, then start game.
        this.guiManager.setSongTitle(songTitle)
       
        if (!this.testMode) {
            this.guiManager.getYoutubePlayer(youtubeId)
            this.waitForYoutubePlayer().then(() => {
                this.guiManager.youtubePlayer.addEventListener('onReady', () => {
                    // Play the first piece silently so the segemnt gets buffered.
                    const player = this.guiManager.youtubePlayer
                    player.setVolume(0)
                    player.seekTo(startTime)
                    player.playVideo()
                    setTimeout(doneBuffering, (endTime - startTime) / nPieces * 1000)
                })
            })
        } else {
            this.youtubeReady(null, startTime, endTime)
        }

        const doneBuffering = () => {
            if (this.debugMode) {
                console.log('Done Buffering')
            }
            this.guiManager.youtubePlayer.pauseVideo()

            this.youtubeReady(this.guiManager.youtubePlayer, startTime, endTime)
        }

        // This is a hack for making the game work on Apple products: iPhone, iPad, Safari.
        // They have a 0.5 second delay in playing any audio.
        // It keeps the audio engine open all the time to prevent the delay when starting to play a piece.

        let activeAudioContext

        // Call this on a 'Click' or 'Touch' event before playing the widget
        const wakeAudioRail = () => {
            if (activeAudioContext) return

            const AudioContext = window.AudioContext || window.webkitAudioContext
            this.activeAudioContext = new AudioContext()

            // Create a silent buffer to keep the hardware awake
            const buffer = this.activeAudioContext.createBuffer(1, 1, 22050)
            const source = this.activeAudioContext.createBufferSource()
            source.buffer = buffer
            source.connect(this.activeAudioContext.destination)
            
            // Standard iOS requirement: resume context within user gesture
            this.activeAudioContext.resume().then(() => {
                source.start(0)
                console.log('Audio rail is primed and awake')
            })
        }

        wakeAudioRail()

    }

    youtubeReady(youtubePlayer, startTime, endTime) {
        this.segment = new Segment(startTime, endTime, this.testMode)
        this.solution = this.segment.divide(this.nPieces)
        this.board.reset()
        this.board.loadPieces(this.solution, youtubePlayer)
        this.gameEnded = false
        this.startGUI()
        this.timer.start()
    }

    end() {
        this.endGUI()
        this.gameEnded = true
        this.activeAudioContext.close()
    }

    movePiece(originIndex, destIndex) {
        // Move a piece between any two slots on the board.

        // If a legal move (slot with a piece to a slot without a piece) return true, otherwise false.
        if (this.board.isSlotOccupied(originIndex) && !this.board.isSlotOccupied(destIndex)) {
            this.board.movePiece(originIndex, destIndex)
            if (this.debugMode) {
                console.log('Moved from slot ' + originIndex + ' to slot ' + destIndex)
            }
            return true
        }
        console.log('Unable to move from slot ' + originIndex + ' to slot ' + destIndex)
        return false
    }

    isSolved() {
        // Check if the pieces are arranged on the board in the right order to play the segment.
        
        // Find the location of the first piece of the solution.
        const firstIndex = this.board.findPiece(this.solution[0])

        // The solution has to be arranged in a single row.
        if (firstIndex % this.boardSize[1] > this.boardSize[1] - this.nPieces) {
            return false
        } 

        // Check if the other slots match the solution.
        for (let i = firstIndex; i < firstIndex + this.nPieces; i++) {
            if (this.board.slots[i] != this.solution[i - firstIndex]) {
                if (this.debugMode) {
                    console.log('Solution check: not solved')
                }
                return false
            }
        }
        console.log('Solution check: solved')
        return true
    }

    // ***** GUI Management ***** //

    startGUI() {
        this.board.updateGUI()
        this.timer.startGUI()
        this.guiManager.setActionButtonGameOn()
    }

    endGUI() {
        this.guiManager.inactivateBoard()
        this.timer.stop()
        this.guiManager.endGame()
    }

    slotClick(slotIndex) {
        // Click on a puzzle piece.
        this.board.playSequence(slotIndex)
    }

    slotDrag(slotElement) {
        // Callback function when a piece is getting dragged.
        this.slotBeingMovedElement = slotElement
        this.guiManager.setSlotPieceDragged(Number(slotElement.id))
        if (this.board.playing) {
            if (this.debugMode) {
                console.log('Slot ' + slotElement.id + ' moving, interrupting audio')
            }
            this.board.stopPlaying()
        }
    }

    slotDragEnd() {
        this.guiManager.setSlotPieceDropped(Number(this.slotBeingMovedElement.id))
        this.slotBeingMovedElement = null
    }

    slotDrop(slotElement) {
        // Callback function when a piece is getting dropped.

        if (!this.gameEnded) {
            if (this.debugMode) {
                console.log('Dropped on Slot: ' + slotElement.id)
            }

            this.movePiece(Number(this.slotBeingMovedElement.id), Number(slotElement.id))

            // Check if puzzle is solved.
            if (this.isSolved()) {
                const firstIndex = this.board.findPiece(this.solution[0])
                this.board.isGameOver = true
                this.board.playSequence(firstIndex)
                this.end()
            }
        }
    }
}