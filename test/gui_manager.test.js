describe('GUI Manager Test', () =>  {
 
    it('End game', () => {
        // Show a final panel with or without song information.

        let guiManager = new GUIManager('', 4, 7)
        let songTitleDiv = guiManager.getSongTitleDiv()
        expect(songTitleDiv.innerHTML).toBe('')
        let youtubeDiv = guiManager.getYoutubeDiv()
        expect(youtubeDiv.innerHTML).toBe('')
        let endDiv = guiManager.endGame()
        expect(endDiv.children.length).toBe(1)
        
        guiManager = new GUIManager('', 4, 7, 'Beatles: A Day in the Life')
        songTitleDiv = guiManager.getSongTitleDiv()
        expect(songTitleDiv.innerHTML).toBe('Beatles: A Day in the Life')
        youtubeDiv = guiManager.getYoutubeDiv()
        expect(youtubeDiv.innerHTML).toBe('')
        endDiv = guiManager.endGame()
        expect(endDiv.children[1].children[0].innerHTML).toBe('Beatles: A Day in the Life')
        expect(endDiv.children[1].children[1].innerHTML).toBe('')

        guiManager = new GUIManager('', 4, 7, 'Beatles: Help!', 'my_youtube')
        songTitleDiv = guiManager.getSongTitleDiv()
        expect(songTitleDiv.innerHTML).toBe('Beatles: Help!')
        youtubeDiv = guiManager.getYoutubeDiv()
        expect(youtubeDiv.innerHTML).toContain('youtube.com/embed')
        expect(youtubeDiv.innerHTML).toContain('my_youtube')
        endDiv = guiManager.endGame()
        expect(endDiv.children[1].children[0].innerHTML).toBe('Beatles: Help!')
        expect(endDiv.children[1].children[1].innerHTML).toContain('youtube.com/embed')
    })

})