const nBoardRows = 5
const nBoardCols = 12
const nPieces  = 10
const debugMode = true

// Start a game object from an audio file.
const game = new Game(nPieces, [nBoardRows, nBoardCols], false, debugMode)
const gameGUI = new gui(nBoardRows, nBoardCols)

// Set up game container.
const gameDiv = gameGUI.getGameDiv()
document.body.appendChild(gameDiv)

// Set action button to start the game.
gameGUI.setActionButtonClick(startGame)

// Image for dragging operations (positioned outside the page).
document.body.appendChild(gameGUI.dragImage)

// Load audio data for today's date.
const today = new Date()
const year = today.getFullYear()
const month = (today.getMonth() + 1).toString().padStart(2, '0')
const day = today.getDate().toString().padStart(2, '0')
const date_filename = 'src/audio_data_' + year + month + day + '.js'
console.log(date_filename)

const audioData = document.createElement('script')
audioData.src = 'src/audio_data.js'
document.body.appendChild(audioData)

function startGame() {
    game.start('coltrane.wav')
}