describe('Share Manager Test', () =>  {
 
    it('Result Display', () => {
        
        const timerDiv = document.createElement('div')
        timerDiv.innerHTML = '59:59'
        let shareManager = new ShareManager(timerDiv, false)
        const resultDiv = shareManager.getResultDiv()

        // Verify timer display.
        let outputTimerDiv = resultDiv.children[0].children[1]
        expect(outputTimerDiv).toBe(timerDiv)
        
        timerDiv.innerHTML = '01:00:00'
        shareManager = new ShareManager(timerDiv, false)
        outputTimerDiv = resultDiv.children[0].children[1]
        expect(outputTimerDiv).toBe(timerDiv)

    })

})