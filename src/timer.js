class Timer {

    constructor(guiManager) {
        this.guiManager = guiManager
        this.seconds = 0
        this.timerGUI = null
        this.trigger = null
    }

    reset() {
        this.seconds = 0
    }

    advance() {
        this.seconds++
        this.displayTime()
    }

    start() {
        if (this.trigger) {
            this.stop()
        }
        this.displayTime()
        this.trigger = setInterval(this.advance.bind(this), 1000);
    }

    stop() {
        clearInterval(this.trigger)
        this.trigger = null
    }

    startGUI() {
        this.timerGUI = this.guiManager.timer
        this.displayTime()
    }

    displayTime() {
        this.guiManager.showTime(this.getTimeString())
    }

    getTimeString() {
        const hh = Math.floor(this.seconds / 3600).toString().padStart(2, '0');;
        const mm = Math.floor((this.seconds % 3600) / 60).toString().padStart(2, '0');
        const ss = (this.seconds % 60).toString().padStart(2, '0');
        if (this.seconds < 3600) {
            return mm + ':' + ss
        } else {
            return hh + ':' + mm + ':' + ss
        }
    }

}
