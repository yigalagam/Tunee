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

        this.scWidget.getVolume(function(volume) {
            this.baseVolume = volume;
        }.bind(this))
    }

    play() {
        // Stream music from start time to end time using the SoundCloud widget.
        console.log('Base volume 1: ' + this.baseVolume)
        if (!this.testMode) {
            console.log('playing, piece index: ' + this.index)
            this.scWidget.seekTo(this.startTime * 1000)
            const nVolumeSteps = 10
            const volumeInterval = this.baseVolume / nVolumeSteps
            this.scWidget.setVolume(this.baseVolume)

            // Fade in.
            if (this.fade == 1) {
                let currVolume = 0
                this.scWidget.setVolume(currVolume)
                const fadeInInterval = setInterval(function() {
                    if (currVolume < this.baseVolume) {
                        currVolume += volumeInterval
                        this.scWidget.setVolume(currVolume)
                    } else {
                        clearInterval(fadeInInterval)
                    }
                }.bind(this), this.fade / nVolumeSteps * 1000)
            }

            // Fade out.
            if (this.fade == 2) {
                let currVolume = this.baseVolume
                this.scWidget.setVolume(currVolume)
                const fadeOutInterval = setInterval(function() {
                    if (currVolume > 0) {
                        currVolume -= volumeInterval
                        this.scWidget.setVolume(currVolume)
                    } else {
                        clearInterval(fadeOutInterval)
                    }
                }.bind(this), this.fade / nVolumeSteps * 1000)
            }

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