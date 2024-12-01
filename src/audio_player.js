// Audio player in which the puzzle player has to arrange the pieces in the right order.

class AudioPlayer extends PieceContainer {

    constructor(nSlots, segmentDuration, sampleRate) {
        super(nSlots)
        this.slotDuration = segmentDuration / nSlots
        this.sampleRate = sampleRate

        // Preallocate array of zeros for playing empty slots.
        const slotArrayLen = Math.round(this.slotDuration * this.sampleRate)
        this.zeroArray = Array(slotArrayLen).fill(0)
    }

    play(testMode) {
        // Play the content of the player, pausing at slots with no pieces.

        let buffer = [[], []]
        for (let slotIndex = 0; slotIndex < this.nSlots; slotIndex++) {
            if (this.isSlotOccupied(slotIndex)) {
                // Append sound from piece in the slot.
                buffer[0].push(...this.slots[slotIndex].sound[0])
                buffer[1].push(...this.slots[slotIndex].sound[1])
            } else {
                // Append a pause.
                buffer[0].push(...this.zeroArray)
                buffer[1].push(...this.zeroArray)
            }
        }

        if (!testMode) {

        } else {
            // Return played data for testing.
            return buffer
        }

    }

}