class GUIManager {

    constructor(name, nBoardRows, nBoardCols, songTitle=null, testMode=false, debugMode=false) {

        this.name = name

        this.nBoardRows = nBoardRows
        this.nBoardCols = nBoardCols
        this.songTitle = songTitle
        this.gameDiv = null
        this.controlDiv = null
        this.resetButton = null
        this.youtubeDiv = null
        this.youtubeFinalLoc = null
        this.boardSlots = []
        this.boardActive = true
        this.actionButton = null
        this.timer = null
        this.linksDiv = null
        this.disclaimerDiv = null
        this.dragImage = this.getDragImage()
        this.songTitle = ''
        this.youtubePlayer = null

        this.testMode = testMode
        this.debugMode = debugMode
        if (debugMode) {
            if (isMobile) {
                console.log('Detected mobile environment')
            } else {
                console.log('Detected desktop environment')
            }
        }

        // Create the main application div.
        this.gameDiv = this.getGameDiv()
    }

    close() {
        if (this.gameDiv) {
            this.gameDiv.remove()
        }
    }

    getGameDiv() {
        this.gameDiv = document.createElement('div')
        this.gameDiv.style.margin = '0 auto'
        this.gameDiv.style.display = 'grid'
        this.gameDiv.style.justifyItems = 'center'
        this.gameDiv.style.alignItems = 'center'
        
        // Add game elements.
        this.gameDiv.appendChild(this.getTitleDiv())
        this.gameDiv.appendChild(this.getResetButton())
        this.gameDiv.appendChild(this.getBoardDiv())
        this.gameDiv.appendChild(this.getControlDiv())
        this.gameDiv.appendChild(this.getLinksDiv())
        this.gameDiv.appendChild(this.getDisclaimerDiv())
       
        return this.gameDiv
    }

    getYoutubeDiv() {
        // Set up a Youtube frame to stream music.
        // While the game is played, the frame is not visible.
        const youtubeDiv = document.createElement('div')
        youtubeDiv.id = 'youtube-player'
        youtubeDiv.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture')
        youtubeDiv.style.position = 'absolute'
        if (!this.debugMode) {
            // Place outside the screen.
            youtubeDiv.style.left = (-youtubeFrameWidthPx) + 'px'
            youtubeDiv.style.top = (-youtubeFrameWidthPx) + 'px'
        } else {
            // In debug mode the Youtube frame is visible.
            youtubeDiv.style.left = '0px'
            youtubeDiv.style.top = '0px'
        }
        return youtubeDiv
    }

    getYoutubePlayer(youtubeId) {

        const injectScript = () => {
            if (!document.getElementById('yt-api-script')) {
                const tag = document.createElement('script');
                tag.id = 'yt-api-script';
                tag.src = "https://www.youtube.com/iframe_api";
                document.head.appendChild(tag);
            }
        };

        // Poll for the YT object every 100ms
        const checkAPI = setInterval(() => {
            if (window.YT && window.YT.Player) {
                console.log('API detected via polling');
                clearInterval(checkAPI);
                if (this.debugMode) {
                    console.log('Initializing with ID:', youtubeId)
                }
                this.initYTPlayer(youtubeId);
                
                // This addresses a mysterious issue on the GitHub server, where the video ID is not populated in the frame src.
                const youtubeFrame = this.youtubePlayer.getIframe()
                const youtubeSrc = this.youtubePlayer.g.src
                if (youtubeSrc.includes('/embed/?')) {
                    // Set video ID manually if it's missing.
                    this.youtubePlayer.g.src = youtubeSrc.replace('/embed/?', `/embed/${youtubeId}/?`)
                }
            }
        }, 100);

        injectScript();
    }

    initYTPlayer(youtubeID) {
        this.youtubeDiv = document.createElement('div')
        this.youtubeDiv.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture')
        this.youtubeDiv.id = 'youtube-player'
        this.youtubeDiv.style.position = 'absolute'
        if (!this.debugMode) {
            // Place outside the screen.
            this.youtubeDiv.style.left = (-2 * youtubeFrameWidthPx) + 'px'
        } else {
            // In debug mode the Youtube frame is visible.
            this.youtubeDiv.style.left = '0px'
        }
        this.gameDiv.appendChild(this.youtubeDiv)

        // Create a player object.
        // Keep the width to a minimum during playing to minimize buffering.
        let playerWidth
        if (!this.debugMode) {
            playerWidth = '0'
        } else {
            playerWidth = youtubeFrameWidthPx.toString()
        }
        this.youtubePlayer = new YT.Player('youtube-player', {
            host: 'https://www.youtube.com',
            width: playerWidth,
            videoId: youtubeID,
            playerVars: {
                'widget_referrer': window.location.href, // This helps YouTube verify the exact page
                'enablejsapi': 0,
                'autoplay': 0,
                'controls': 1,
                'rel': 0 // Don't show related videos from other channels
            },
            events: {
                'onError': (event) => {
                    console.error('YouTube Player Error:', event.data)
                }
            }
        })
    }
    
    getTitleDiv() {
        const mainTitleDiv = document.createElement('div')
        mainTitleDiv.style.fontFamily = font
        mainTitleDiv.style.fontSize = titleFontSizeEM + 'em'
        mainTitleDiv.style.fontWeight = 'bold'
        mainTitleDiv.style.color = darkGray
        mainTitleDiv.innerHTML = this.name

        const subTitleDiv = document.createElement('div')
        subTitleDiv.style.fontFamily = font
        subTitleDiv.style.fontSize = subtitleFontSizeEM + 'em'
        subTitleDiv.style.fontWeight = 'bold'
        subTitleDiv.style.color = lightGray
        subTitleDiv.innerHTML = subtitle

        const titleDiv = document.createElement('div')
        titleDiv.style.display = 'grid'
        titleDiv.style.placeItems = 'center'
        titleDiv.appendChild(mainTitleDiv)
        titleDiv.appendChild(subTitleDiv)

        return titleDiv
    }
    
    getResetButton() {
        this.resetButton = document.createElement('div')
        this.resetButton.style.backgroundImage = 'url("images/reset.png")'
        this.resetButton.style.backgroundSize = 'cover'
        this.resetButton.style.width = resetButtonSizePx + 'px'
        this.resetButton.style.height = resetButtonSizePx + 'px'
        this.resetButton.style.marginTop = baseSizePx + 'px'
        this.resetButton.style.cursor = 'pointer'
        return this.resetButton
    }

    setResetButtonClick(func) {
        this.resetButton.onclick = func
    }

    getBoardDiv() {
        const boardDiv = document.createElement('div')
        boardDiv.style.backgroundColor = lightGray
        boardDiv.style.border = borderWidth + 'px' + ' solid'
        boardDiv.style.width = (slotSizePx * this.nBoardCols) + 'px'
        boardDiv.style.height = (slotSizePx * this.nBoardRows) + 'px'
        boardDiv.style.marginTop = (2 * baseSizePx) + 'px'
        boardDiv.style.display = 'flex'
        boardDiv.style.flexWrap = 'wrap'
        for (let i = 0; i < this.nBoardRows * this.nBoardCols; i++) {
            const slotDiv = this.getBoardSlotDiv(i)
            boardDiv.appendChild(slotDiv)
            this.boardSlots.push(slotDiv)
        }
        return boardDiv
    }

    getBoardSlotDiv(id) {
        // Generate a div element for board slots.

        const slotDiv = document.createElement('div')
        slotDiv.classList.add('board-slot')
        slotDiv.id = id
        slotDiv.style.width = (slotSizePx) + 'px'
        slotDiv.style.height = (slotSizePx) + 'px'
        slotDiv.style.border = 'dotted 0.25px'
        slotDiv.style.boxSizing = 'border-box'
        slotDiv.draggable = false

        // Set up drag and drop listeners for moving pieces.
        if (isMobile) {
            // Drag & drop isteners for mobile.

            const hammer = new Hammer(slotDiv)
            hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL })

            hammer.on('tap', () => {
                if (debugMode) {
                    console.log('Tap: slot ' + slotDiv.id)
                }
                game.slotClick(Number(slotDiv.id))
            })

            hammer.on('panstart', () => {
                if (this.isPiece(slotDiv)) {
                    if (debugMode) {
                        console.log('Drag start, mobile: slot ' + slotDiv.id)
                    }
                    game.slotDrag(slotDiv)
                }
            })

            hammer.on('panend', (event) => {
                if (this.isPiece(slotDiv)) {
                    if (debugMode) {
                        console.log('Drag end, mobile: slot ' + slotDiv.id)
                    }

                    const targetSlotDiv = document.elementFromPoint(event.center.x, event.center.y)
                    if (this.boardSlots.includes(targetSlotDiv)) {
                        if (this.debugMode) {
                            console.log('Dropped on slot ' + targetSlotDiv.id)
                        }
                        if (targetSlotDiv == slotDiv) {
                            // Touch and release in the same slot: consider as a click.
                            if (debugMode) {
                                console.log('Play: slot ' + slotDiv.id)
                            }
                            game.slotClick(Number(slotDiv.id))
                        } else {
                            // Touch ended in a different slot than the origin: drag operation.
                            game.slotDrop(targetSlotDiv)
                        }
                    }

                    game.slotDragEnd()
                }
            })

        } else {
            // Mouse action listeners for desktop.

            slotDiv.onmouseover = () => {
                if (this.boardActive && slotDiv.classList.contains('piece')) {
                    this.setSlotMouseOver(slotDiv.id)
                }
            }

            slotDiv.onmouseout = () => {
                this.setSlotMouseNotOver(slotDiv.id)
            }
            
            slotDiv.onclick = () => {
                if (debugMode) {
                    console.log('Play: slot ' + slotDiv.id)
                }
                game.slotClick(Number(slotDiv.id))
            }

            slotDiv.ondragstart = (event) => {
                if (debugMode) {
                    console.log('Drag start: slot ' + slotDiv.id)
                }
                this.setSlotMouseNotOver(slotDiv.id)
                event.stopPropagation()
                event.dataTransfer.setDragImage(this.dragImage, slotSizePx / 2, slotSizePx / 2)
                event.dataTransfer.effectAllowed = 'move'
                game.slotDrag(slotDiv)
            }

            slotDiv.ondragend = (event) => {
                if (debugMode) {
                    console.log('Drag end: slot ' + slotDiv.id)
                }
                this.setSlotMouseNotOver(slotDiv.id)
                event.preventDefault()
                game.slotDragEnd()
            }
            
            slotDiv.ondrop = () => {
                if (debugMode) {
                    console.log('Drop: slot ' + slotDiv.id)
                }
                this.setSlotMouseNotOver(slotDiv.id)
                game.slotDrop(slotDiv)
            }
        }
        
        return slotDiv
    }

    isPiece(slotDiv) {
        return slotDiv.classList.contains('piece')
    }

    getDragImage() {
        const dragImage = new Image();
        dragImage.src = 'images/piece_dragged.png';
        dragImage.style.width = slotSizePx + 'px'
        dragImage.style.height = slotSizePx + 'px'
        const dragDiv = document.createElement('div')
        dragDiv.appendChild(dragImage)
        // The dragging element has to be in the document body, but we don't want it to show permanently, so positioning it off the page.
        dragDiv.style.position = 'absolute'
        dragDiv.style.top = (-slotSizePx * 2) + 'px'
        dragDiv.style.left = (-slotSizePx * 2) + 'px'
        return dragDiv
    }

    setSlotPiece(slotIndex) {
        // Slot occupied by a puzzle piece.
        // Show the piece and make it draggable so it can be moved.

        this.boardSlots[slotIndex].classList.add('piece')
        this.boardSlots[slotIndex].draggable = true
        // Prevent dropping pieces in an occupied slot.
        this.boardSlots[slotIndex].ondragover = null
    }

    setSlotEmpty(slotIndex) {
        // Empty slot without a puzzle piece.
        this.boardSlots[slotIndex].classList.remove('piece')
        this.boardSlots[slotIndex].draggable = false
        // This listener is needed to allow dropping pieces in this slot.
        this.boardSlots[slotIndex].ondragover = (event) => {
            event.stopPropagation()
            event.preventDefault()
        }
    }

    setSlotPieceDragged(slotIndex) {
        this.boardSlots[slotIndex].classList.add('piece-dragged')
    }

    setSlotPieceDropped(slotIndex) {
        this.boardSlots[slotIndex].classList.remove('piece-dragged')
    }

    setSlotPiecePlaying(slotIndex) {
        // Slot currently playing, has a different appearance than other slots.
        this.boardSlots[slotIndex].classList.add('piece-playing')
    }

    setSlotPieceNotPlaying(slotIndex) {
        // Slot that finished playing, remove special appearance.
        this.boardSlots[slotIndex].classList.remove('piece-playing')
    }

    setSlotMouseOver(slotIndex) {
        if (typeof(slotIndex) === 'string') {
            slotIndex = Number(slotIndex)
        }
        this.boardSlots[slotIndex].classList.add('piece-mouseover')
    }

    setSlotMouseNotOver(slotIndex) {
        if (typeof(slotIndex) === 'string') {
            slotIndex = Number(slotIndex)
        }
        this.boardSlots[slotIndex].classList.remove('piece-mouseover')
    }

    inactivateBoard() {
        this.boardActive = false
        let slotGUI
        for (let slotIndex = 0; slotIndex < this.nSlots; slotIndex++) {
            slotGUI = this.boardSlots[slotIndex]
            if (this.debugMode) {
                console.log('Inactivating slot ' + slotIndex)
            }
            slotGUI.draggable = false
            this.setSlotMouseNotOver(slotIndex)
        }
    }

    // *** Button to start the game and share after you win ***
    
    getActionButton(text) {
        this.actionButton = document.createElement('div')
        this.actionButton.classList.add('action-button')
        this.actionButton.style.backgroundColor = yellow
        this.actionButton.style.border = borderWidth + 'px solid'
        this.actionButton.style.borderRadius = borderRadius
        this.actionButton.style.width = (10 * baseSizePx) + 'px'
        this.actionButton.style.height = (10 * baseSizePx) + 'px'
        this.actionButton.style.fontFamily = font
        this.actionButton.style.fontSize = fontSizeEM + 'em'
        this.actionButton.style.fontWeight = 'bold'
        this.actionButton.style.color = darkGray
        this.actionButton.style.display = 'flex'
        this.actionButton.style.alignItems = 'center'
        this.actionButton.style.justifyContent = 'center'
        this.actionButton.style.userSelect = 'none'
        this.actionButton.innerHTML = text
        return this.actionButton
    }

    setActionButtonClick(func) {
        this.actionButton.onclick = func
    }

    setActionButtonImage(imgStr) {
        this.actionButton.style.backgroundImage = imgStr
        this.actionButton.style.backgroundSize = 'cover'
    }

    setActionButtonText(textStr) {
        this.actionButton.innerHTML = textStr
    }

    setActionButtonGameOn() {
        this.setActionButtonClick(null)
        this.setActionButtonText('')
        this.setActionButtonImage("url('images/game_on.png')")
    }

    // *** Timer display ***

    getTimer() {
        this.timer = document.createElement('div')
        this.timer.classList.add('timer')
        this.timer.style.backgroundColor = yellow
        this.timer.style.border = borderWidth + 'px solid'
        this.timer.style.borderRadius = borderRadius
        this.timer.style.width = (15 * baseSizePx) + 'px'
        this.timer.style.height = (8 * baseSizePx) + 'px'
        this.timer.style.fontFamily = font
        this.timer.style.fontSize = fontSizeEM + 'em'
        this.timer.style.fontWeight = 'bold'
        this.timer.style.color = darkGray
        this.timer.style.display = 'flex'
        this.timer.style.alignItems = 'center'
        this.timer.style.justifyContent = 'center'
        this.timer.style.userSelect = 'none'
        this.timer.innerHTML = '00:00'
        return this.timer
    }
            
    showTime(timeStr) {
        this.timer.innerHTML = timeStr
    }

    // *** Area containing the game controls (anything outside the board) ***

    getControlDiv() {
        const controlDiv = document.createElement('div')
        controlDiv.style.width = controlDivWidthPx + 'px'
        controlDiv.style.height = controlDivHeightPx + 'px'
        controlDiv.style.backgroundColor = lightGray
        controlDiv.style.border = borderWidth + 'px solid'
        controlDiv.style.borderRadius = borderRadius
        controlDiv.style.marginLeft = 'auto'
        controlDiv.style.marginRight = 'auto'
        controlDiv.style.marginTop = baseSizePx + 'px'
        controlDiv.style.display = 'flex'
        controlDiv.style.justifyContent = 'space-around'
        controlDiv.style.alignItems = 'center'
        controlDiv.appendChild(this.getActionButton('Start'))
        controlDiv.appendChild(this.getTimer())
        this.controlDiv = controlDiv
        return controlDiv
    }

    getLinksDiv() {
        // Div for email and app downloads.
        this.linksDiv = document.createElement('div')
        this.linksDiv.style.display = 'flex'
        this.linksDiv.style.flexDirection = 'horizontal'
        this.linksDiv.style.gap = (3 * baseSizePx) + 'px'
        this.linksDiv.append(this.getFeedbackButton())
        this.linksDiv.append(this.getPlaystoreButton())
        return this.linksDiv
    }

    getFeedbackButton() {
        // Mailto link for feedback.
        const feedbackButton = document.createElement('div')
        feedbackButton.style.backgroundImage = 'url("images/feedback.png")'
        feedbackButton.style.backgroundSize = 'cover'
        feedbackButton.style.width = linkButtonSizePx + 'px'
        feedbackButton.style.height = linkButtonSizePx + 'px'
        feedbackButton.style.marginTop = baseSizePx + 'px'
        feedbackButton.title = email
        feedbackButton.style.cursor = 'pointer'
        feedbackButton.onclick = () => {
            window.open('mailto:' + email, '_blank')
        }
        return feedbackButton
    }

    getPlaystoreButton() {
        // Link to Android app download.
        const playstoreButton = document.createElement('div')
        playstoreButton.style.backgroundImage = 'url("images/playstore.png")'
        playstoreButton.style.backgroundSize = 'cover'
        playstoreButton.style.width = linkButtonSizePx + 'px'
        playstoreButton.style.height = linkButtonSizePx + 'px'
        playstoreButton.style.marginTop = baseSizePx + 'px'
        playstoreButton.title = playstore
        playstoreButton.style.cursor = 'pointer'
        playstoreButton.onclick = () => {
            window.open(playstore)
        }
        return playstoreButton
    }

    getDisclaimerDiv() {
        this.disclaimerDiv = document.createElement('div')

        const privacyLink = document.createElement('a')
        privacyLink.href = 'privacy.html'
        privacyLink.textContent = 'Privacy Policy'
        privacyLink.target = '_blank'
        privacyLink.style.textDecoration = 'none'
        privacyLink.style.color = darkGray

        this.disclaimerDiv.style.fontFamily = font
        this.disclaimerDiv.style.fontSize = disclaimerFontSizeEM + 'em'
        this.disclaimerDiv.style.fontWeight = 'bold'
        this.disclaimerDiv.style.color = lightGray
        this.disclaimerDiv.style.textAlign = 'center'
        const br = document.createElement('br');
        this.disclaimerDiv.appendChild(document.createTextNode('All music used in this game is copyrighted and belongs to its legal owners.'))
        this.disclaimerDiv.appendChild(br)
        this.disclaimerDiv.appendChild(privacyLink)
        return this.disclaimerDiv
    }

    // *** Song information ***

    setSongTitle(songTitle) {
        this.songTitle = songTitle
    }

    getSongTitleDiv() {
        const songTitleDiv = document.createElement('div')
        songTitleDiv.style.fontFamily = font
        songTitleDiv.style.fontSize = songTitleFontSizeEM + 'em'
        songTitleDiv.style.fontWeight = 'bold'
        songTitleDiv.style.color = darkGray
        songTitleDiv.style.whiteSpace = 'pre-wrap'
        songTitleDiv.style.textAlign = 'center'
        songTitleDiv.innerHTML = this.songTitle
        if (this.debugMode) {
            console.log(this.songTitle)
        }
        return songTitleDiv
    }

    getSongDiv() {
        const songDiv = document.createElement('div')
        songDiv.style.display = 'flex'
        songDiv.style.flexDirection = 'column'
        songDiv.style.placeItems = 'center'
        songDiv.appendChild(this.getSongTitleDiv())
        songDiv.style.gap = baseSizePx + 'px'
        // Add a placeholder to determine the coordinates to move the youtube player frame into.
        this.youtubeFinalLoc = document.createElement('div')
        songDiv.appendChild(this.youtubeFinalLoc)

        return songDiv
    }

    endGame() {
        // Fade out the control panel and fade in song information and the result panel.
        
        const shareManager = new ShareManager(this.timer, this.debugMode)
        const resultDiv = shareManager.getResultDiv()

        const endDiv = document.createElement('div')
        endDiv.style.display = 'flex'
        endDiv.style.alignItems = 'center'
        endDiv.style.marginTop = baseSizePx + 'px'
        endDiv.appendChild(resultDiv)

        // Div with song title and youtube player.
        const songDiv = this.getSongDiv()
        endDiv.style.gap = (2 * baseSizePx) + 'px'
        endDiv.appendChild(songDiv)

        // Make the game control fade out before showing the solution.
        this.controlDiv.style.opacity = 1
        this.linksDiv.style.opacity = 1
        this.disclaimerDiv.style.opacity = 1
        const fadeOutInterval = setInterval(() => {
            if (this.controlDiv.style.opacity > 0) {
                this.controlDiv.style.opacity -= 0.05
                this.linksDiv.style.opacity -= 0.05
                this.disclaimerDiv.style.opacity -= 0.05
            } else {
                this.controlDiv.remove()
                this.controlDiv.remove()
                clearInterval(fadeOutInterval)
                this.gameDiv.append(endDiv)
                this.linksDiv.style.opacity = 1
                this.disclaimerDiv.style.opacity = 1
                this.gameDiv.append(this.linksDiv)
                this.gameDiv.append(this.disclaimerDiv)

                // Move the Youtube frame to the placeholder we created in the solution div.
                // We have to use absolute coordinates because using appendChild will create a new player.
                const youtubeFrame = this.youtubePlayer.getIframe()
                this.youtubePlayer.setSize(youtubeFrameWidthPx, youtubeFrame.height)
                const youtubeRect = youtubeFrame.getBoundingClientRect()
                this.youtubeFinalLoc.style.width = youtubeRect.width + 'px'
                this.youtubeFinalLoc.style.minWidth = youtubeRect.width + 'px'
                this.youtubeFinalLoc.style.height = youtubeRect.height + 'px'
                this.youtubeFinalLoc.style.minHeight = youtubeRect.height + 'px'
                const rect = this.youtubeFinalLoc.getBoundingClientRect()
                youtubeFrame.style.position = 'absolute'
                youtubeFrame.style.top = rect.top + 'px'
                youtubeFrame.style.left = rect.left + 'px'
            }

        }, resultFadeoutInterval / 20)

        return endDiv
    }

}