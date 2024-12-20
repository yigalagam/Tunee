describe('Timer Test', () =>  {
 
    beforeEach(() => {
        // Create timer div for testing.
        this.timerDiv = document.createElement('div')
        this.timerDiv.classList.add('timer')
        document.body.append(this.timerDiv)

        this.timer = new Timer()
        this.timer.startGUI()
    })

    afterEach(() => {
        this.timerDiv.remove()
    })
    
    it('Time', () => {

        // Initial state.
        expect(this.timer.seconds).toBe(0)
        expect(this.timer.trigger).toBe(null)

        for (let i = 0; i < 100; i++) {
            this.timer.advance()
        }
        expect(this.timer.seconds).toBe(100)

        this.timer.start()
        expect(this.timer.trigger).not.toBe(null)

        this.timer.stop()
        expect(this.timer.trigger).toBe(null)
    })


    it('Time String', () => {
        // Conversion of number of seconds to an HH:MM:SS string.

        this.timer.reset()
        expect(timer.getTimeString()).toBe('00:00:00')

        this.timer.advance()
        expect(timer.getTimeString()).toBe('00:00:01')

        this.timer.seconds = 60
        expect(timer.getTimeString()).toBe('00:01:00')

        this.timer.seconds = 3599
        expect(timer.getTimeString()).toBe('00:59:59')

        this.timer.seconds = 3600
        expect(timer.getTimeString()).toBe('01:00:00')

        this.timer.seconds = 86401
        expect(timer.getTimeString()).toBe('24:00:01')
    })

    it('GUI', () => {

        // Check that time is displayed correctly in the GUI.
        expect(this.timer.timerGUI.innerHTML).toBe('00:00:00')

        for (let i = 0; i < 201; i++) {
            this.timer.advance()
        }
        expect(this.timer.timerGUI.innerHTML).toBe('00:03:21')
    })

})