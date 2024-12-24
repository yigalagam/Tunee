describe('GUI Manager Test', () =>  {
 
    it('End game', () => {
        // Show a sharing panel with or without song information.

        let guiManager = new GUIManager('', 4, 7)
        let songTitleDiv = guiManager.getSongTitleDiv()
        expect(songTitleDiv.innerHTML).toBe('')

        guiManager = new GUIManager('', 4, 7, 'Beatles: A Day in the Life')
        songTitleDiv = guiManager.getSongTitleDiv()
        expect(songTitleDiv.innerHTML).toBe('Beatles: A Day in the Life')
       
    })

})