class Timer {

    constructor(testMode=false, debugMode=false) {
        this.seconds = 0
        this.timerGUI = null
        this.trigger = null
        this.testMode = testMode
        this.debugMode = debugMode
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
        this.timerGUI = document.querySelectorAll('.timer')[0]
        this.displayTime()
    }

    displayTime() {
        // Convert number of seconds to an hh:mm:ss string.
        this.timerGUI.innerHTML = this.getTimeString()
    }

    getTimeString() {
        const hh = Math.floor(this.seconds / 3600).toString().padStart(2, '0');;
        const mm = Math.floor((this.seconds % 3600) / 60).toString().padStart(2, '0');
        const ss = (this.seconds % 60).toString().padStart(2, '0');
        return hh + ':' + mm + ':' + ss
    }

}
