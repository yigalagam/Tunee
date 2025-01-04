document.title = appName

// Icon to appear in browser tab.
let icon = document.createElement('link');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'images/piece_mouseover.png');
document.head.appendChild(icon);

// Check if operating in a desktop or mobile environment.
const isAndroid = /Android/i.test(navigator.userAgent)
const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
isMobile = isAndroid || isiOS
const mobileIndex = Number(isMobile)

// Start a game object from an audio file.
const guiManager = new GUIManager(appName, nBoardRows[mobileIndex], nBoardCols[mobileIndex], null, null, false, debugMode)
const game = new Game(guiManager, nPieces, [nBoardRows[mobileIndex], nBoardCols[mobileIndex]], false, debugMode)

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
let dateStr = params.get('d')
if (dateStr == null) {
    dateStr = getTodayDateStr()
}
const gameData = getAudioData(dateStr)

function startGame() {
    // Start game: Song title, soundcloud link, start time, end time.
    game.start(gameData[0], gameData[1], gameData[2], gameData[3])
}