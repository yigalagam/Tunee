const appName = 'Musicle'
const website = 'www.musicle.com'

const nBoardRows = 5
const nBoardCols = 12
const nPieces  = 2

// This will generate some console messages.
const debugMode = true

// Parameters for setting up the game GUI.
const baseSize = 10
const slotSizePx = 7 * baseSize
const font = 'Verdana'
const fontSizeEM = 1.3
const lightGray = '#AFAFAF'
const darkGray = '#5F5F5F'
const yellow = '#FFC000'
const borderWidth = 3
const borderRadius = '10px'
// Bottom div outside the board.
const bottomDivWidthPx = 50 * baseSize
const bottomDivHeightPx = 19 * baseSize

// Parameters for the sharing interface.
const shareFadeoutInterval = 1000
const shareImageScaling = 0.5
const copiedDelay = 3000