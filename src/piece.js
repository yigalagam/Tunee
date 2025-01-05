class Piece {

    constructor(startTime, endTime, fade, index) {
        // Initialize puzzle piece with sound data.
        // Most pieces play without fade (0), but the first piece plays with fade in (1) and the last piece plays with fade out (2).
        
        // Time boundaries of played music in seconds.
        this.startTime = startTime
        this.endTime = endTime
        this.fade = fade
        this.index = index
    }

}