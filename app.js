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
const dateStr = params.get('d')
let audioScriptName
if (dateStr != null) {
    audioScriptName = 'audio_data/' + dateStr + '.js'
} else {
    audioScriptName = getTodayScript()
}

// Run the script that define the function to load audio data.
const audioScript = document.createElement('script')
audioScript.src = audioScriptName
document.body.appendChild(audioScript)


function startGame() {
    game.start('Coldplay: Viva La Vida', 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/255770309', 60, 65)
}