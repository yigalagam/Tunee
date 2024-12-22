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

// Load audio data for today's date.
const today = new Date()
const year = today.getFullYear()
const month = (today.getMonth() + 1).toString().padStart(2, '0')
const day = today.getDate().toString().padStart(2, '0')
const date_filename = 'src/audio_data_' + year + month + day + '.js'

const audioData = document.createElement('script')
audioData.src = 'src/audio_data.js'
document.body.appendChild(audioData)

function startGame() {
    game.start('coltrane.wav')
}