class Piece {

    constructor(scWidget, startTime, endTime, fade, index, testMode) {
        // Initialize puzzle piece with sound data.
        // Sound comes from a SoundCloud widget, which the piece uses to stream a short durtation.
        // Most pieces play without fade (0), but the first piece plays with fade in (1) and the last piece plays with fade out (2).
        
        this.scWidget = scWidget
        // Time boundaries of played music in seconds.
        this.startTime = startTime
        this.endTime = endTime
        this.fade = fade
        this.index = index
        this.testMode = testMode
    }

    play() {
        // Stream music from start time to end time using the SoundCloud widget.
        if (!this.testMode) {
            console.log('playing, piece index: ' + this.index)
            this.scWidget.seekTo(this.startTime * 1000)
            this.scWidget.play()
            this.scWidget.bind(SC.Widget.Events.PAUSE, () => {
                this.scWidget.unbind(SC.Widget.Events.PAUSE)
                console.log('playEnd event dispatched, piece index: ' + this.index)
                document.dispatchEvent(new CustomEvent('playEnd', {}))
            })
            setTimeout(() => {
                this.scWidget.pause()
            }, (this.endTime - this.startTime) * 1000)
        }
        return this.index
    }

}