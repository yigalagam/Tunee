document.title = appName

// Icon to appear in browser tab.
let icon = document.createElement('link');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'images/piece_mouseover.png');
document.head.appendChild(icon);

// Check if operating in a desktop or mobile environment.
const userAgent = navigator.userAgent.toLowerCase()
const isAndroid = /android/i.test(userAgent)
const isiOS = /iphone|ipad|ipod/i.test(userAgent)
const isChrome = /chrome/i.test(userAgent)
const isSafari = /safari/i.test(userAgent) && (!isChrome)
isMobile = isAndroid || isiOS
const mobileIndex = Number(isMobile)

var params = new URLSearchParams(window.location.search)

// Parameters for testing on unsupported platforms.
const safariParam = params.get('safari')
const mobileParam = params.get('mobile')

if (params.has('debug')) {
    debugMode = true
}

if (debugMode) {
    console.log(userAgent)
}

if (params.has('solved')) {
    solved = true
}

const guiManager = new GUIManager(appName, nBoardRows[mobileIndex], nBoardCols[mobileIndex], null, false, debugMode)

// Start a game object.
var game = new Game(guiManager, nPieces, [nBoardRows[mobileIndex], nBoardCols[mobileIndex]], false, solved, debugMode)

// Set up game container.
document.body.appendChild(guiManager.gameDiv)

// Set action button to start the game.
guiManager.setActionButtonText('Start')
guiManager.setActionButtonClick(startGame)

// Image for dragging operations (positioned outside the page).
document.body.appendChild(guiManager.dragImage)

// Check if a specific date passed in URL.
// If not, use today's data.
let dateStr = params.get('d')
if (dateStr == null) {
    dateStr = getTodayDateStr()
}
var gameData = getAudioData(dateStr)

function startGame() {
    // Start game: Song title, Youtube link, start time, end time.
    guiManager.setActionButtonText('Loading')
    game.start(gameData[0], gameData[1], gameData[2], gameData[3])
}
