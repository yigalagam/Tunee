document.title = appName

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

// Check if a specific date passed in URL.
// If not, use today's data.
const params = new URLSearchParams(window.location.search)
const dateStr = params.get('date')
let audioScriptName
if (dateStr != null) {
    audioScriptName = '../audio_data/' + dateStr + '.js'
} else {
    audioScriptName = getTodayScript()
}

// Run the script that define the function to load audio data.
const audioScript = document.createElement('script')
audioScript.src = audioScriptName
document.body.appendChild(audioScript)

function startGame() {
    game.start('')
}