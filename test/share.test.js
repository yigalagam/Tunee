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

    it('Share on social media', () => {
        // The sharing buttons share a pregenerated image with the timer result if it is less than an hour,
        // Otherwise an image without a time display.
        
        this.timer.seconds = 3599
        this.timer.displayTime()
        let imageLink = this.shareManager.getShareImageLink()
        expect(imageLink).toContain('/59_59.png')

        this.timer.seconds = 3600
        this.timer.displayTime()
        imageLink = this.shareManager.getShareImageLink()
        expect(imageLink).toContain('share.png')


    })

})