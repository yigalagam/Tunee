describe('Share Manager Test', () =>  {
 
    it('Share on social media', () => {
        // The sharing buttons share a pregenerated image with the timer result if it is less than an hour,
        // Otherwise an image without a time display.
        
        let shareManager = new ShareManager('59:59', false)
        let imageLink = shareManager.getShareImageLink()
        expect(imageLink).toContain('/59_59.png')

        shareManager = new ShareManager('01:00:00', false)
        imageLink = shareManager.getShareImageLink()
        expect(imageLink).toContain('share.png')
    })

})