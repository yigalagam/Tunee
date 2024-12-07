// Audio player in which the puzzle player has to arrange the pieces in the right order.

class AudioPlayer extends PieceContainer {

    constructor(nSlots, segmentDuration, sampleRate, testMode, debugMode=false) {
        super(nSlots, testMode, debugMode)
        this.slotDuration = segmentDuration / nSlots
        this.sampleRate = sampleRate

        // Create a "silent" piece to play empty slots.
        const slotArrayLen = Math.round(this.slotDuration * this.sampleRate)
        const zeroSound = [Array(slotArrayLen).fill(0), Array(slotArrayLen).fill(0)]
        this.silentPiece = new Piece(zeroSound, this.sampleRate, -1, this.testMode)
    }

    static isPlaying = false
    
    play(slotIndex) {
        // Play the content of a player from a slot to the nearest gap.
        if (this.slots[slotIndex] != null) {
            let endSlotIndex = slotIndex + 1
            while ((this.slots[endSlotIndex] != null) && (endSlotIndex < this.nSlots)) {
                endSlotIndex++
            }
            return this.playSegment(slotIndex, endSlotIndex - 1, false)
        }
        // Empty slot.
        return null
    }
    
    playAllSlots(buttonPressed=false) {
        // Play all slots in the player.
        return this.playSegment(0, this.nSlots - 1, buttonPressed)
    }

    async playSegment(slotIndex, endSlot, buttonPressed=false) {
        // Play the content of the player between two slot indexes, pausing at slots with no pieces.

        if (!this.testMode) {
            console.log('slotIndex: ' + slotIndex)
            console.log('endSlot: ' + endSlot)
            if (slotIndex > endSlot) {
                if (buttonPressed) {
                    this.playButton.classList.remove('audio-player-play-active')
                    this.playButton.classList.add('audio-player-play')
                }
                return
            }

            if (buttonPressed) {
                this.playButton.classList.remove('audio-player-play')
                this.playButton.classList.add('audio-player-play-active')
            }
            if (!AudioPlayer.isPlaying) {
                AudioPlayer.isPlaying = true
                let pieceToPlay
                if (this.isSlotOccupied(slotIndex)) {
                    pieceToPlay = this.slots[slotIndex]
                    this.slotsGUI[slotIndex].classList.add('piece-playing')
                } else {
                    pieceToPlay = this.silentPiece
                    this.slotsGUI[slotIndex].classList.add('piece-playing-empty-slot')
                }
                pieceToPlay.play()

                pieceToPlay.audioSource.onended = () => {
                    console.log('Slot ' + slotIndex + ' finished playing')
                    this.slotsGUI[slotIndex].classList.remove('piece-playing')
                    this.slotsGUI[slotIndex].classList.remove('piece-playing-empty-slot')
                    AudioPlayer.isPlaying = false
                    this.playSegment(slotIndex + 1, endSlot, buttonPressed)
                }
            }

        } else {            
            // In test mode, just return the concatenated sound data.
            const soundOut = []
            let pieceToPlay
            for (let testSlotIndex = slotIndex; testSlotIndex <= endSlot; testSlotIndex++) {
                if (this.isSlotOccupied(testSlotIndex)) {
                    pieceToPlay = this.slots[testSlotIndex]
                } else {
                    pieceToPlay = this.silentPiece
                }
                soundOut.push(pieceToPlay.play())
            }
            return soundOut
        }
    }

    startGUI() {
        // Gather all the divs that belong to the audio player.
        super.startGUI('audio-player')
        this.playButton = document.querySelector('.audio-player-play')
    }

}