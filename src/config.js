const appName = 'Mystery Song'
const website = 'www.mysterysong.com'

const nBoardRows = 5
const nBoardCols = 12
const nPieces  = 2

// Title div styling.
const titleFontSizeEM = 2.8
const subtitleFontSizeEM = 1.5

// This will generate some console messages.
const debugMode = true

// Parameters for setting up the game GUI.
const baseSizePx = 10
const slotSizePx = 7 * baseSizePx
const font = 'Verdana'
const fontSizeEM = 1.3
const lightGray = '#AFAFAF'
const darkGray = '#5F5F5F'
const yellow = '#FFC000'
const borderWidth = 3
const borderRadius = '10px'

// Bottom div outside the board with button and timer.
const controlDivWidthPx = 50 * baseSizePx
const controlDivHeightPx = 19 * baseSizePx

// Parameters for the sharing interface.
const shareDivWidthPx = 47 * baseSizePx
const shareDivHeightPx = 22 * baseSizePx
const shareNameFontSizeEM = 2.1
const shareWebsiteFontSizeEM = 1
const shareFadeoutInterval = 1000
const shareImageScaling = 0.5
const copiedDelay = 3000