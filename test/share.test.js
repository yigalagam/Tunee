describe('Share Test', () =>  {
 
    beforeEach(() => {
        this.guiManager = new GUIManager('Test', 3, 5)
        this.timer = new Timer(this.guiManager, false)
        this.shareManager = new ShareManager(this.guiManager.timer, false)
    })
    
    it('Copy to clipboard', async () => {

        this.timer.seconds = 7307
        this.timer.displayTime()
        const shareDiv = this.shareManager.getShareDiv()
        const shareImageDiv = shareDiv.children[0]

        // Verify the div that gets converted to a canvas for copying.

        // The shared div contains a copy of the timer, so the time on it should be the same as the main timer.
        const timerCopy = shareImageDiv.children[1]
        expect(timerCopy.innerHTML).toBe('02:01:47')
        
        // Verify canvas object that gets copied to the clipboard.
        document.body.appendChild(shareDiv)
        const copyCanvas = await this.shareManager.generateClipboardImage()
        expect(copyCanvas.width).toBeGreaterThan(100)
        expect(copyCanvas.height).toBeGreaterThan(100)
        shareDiv.remove()

    })

})