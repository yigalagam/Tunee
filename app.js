// Start a game object from an audio file.
const guiManager = new GUIManager(appName, nBoardRows, nBoardCols, false, debugMode)
const game = new Game(guiManager, nPieces, [nBoardRows, nBoardCols], false, debugMode)

// Set up game container.
document.body.appendChild(guiManager.gameDiv)

// Set action button to start the game.
guiManager.setActionButtonText('Start')
guiManager.setActionButtonClick(startGame)

// Image for dragging operations (positioned outside the page).
document.body.appendChild(guiManager.dragImage)

// Load today's script for loading audio data.
const audioScriptName = getTodayScript()
const audioScript = document.createElement('script')
audioScript.src = audioScriptName
document.body.appendChild(audioScript)


function startGame() {
    game.start('')
}