const appName = 'Tunee'
const subtitle = "Click on the puzzle pieces, put them in order, hear today's music!"
const website = 'https://tuneepuzzle.github.io/play'
const email = 'tuneepuzzle@gmail.com'

// This will generate some console messages.
var debugMode = false

// Mobile vs. Desktop (this will be overridden by the main app script, but needs to be specified for testing).
var isMobile = false

// Board dimensions: [desktop, mobile]
const nBoardRows = [5, 5]
const nBoardCols = [14, 14]

// Number of pieces making up the puzzle.
const nPieces = 12

// Title div styling.
const titleFontSizeEM = 3
const subtitleFontSizeEM = 1.5

// Fade in and fade out.
const fadeDuration = 0.4
const nFadeSteps = 15

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

// Feedback button.
const feedbackButtonSizePx = 7 * baseSizePx

// Dislaimer statement.
const disclaimerFontSizeEM = 0.75

// Parameter for displaying song information.
const songTitleFontSizeEM = 1.3
const soundcloudFrameWidthPx = 47.5 * baseSizePx

// Parameters for the result display.
const resultDivWidthPx = 47.5 * baseSizePx
const resultAppNameFontSizeEM = 2.1
const resultFadeoutInterval = 1000
const copyButtonSizePx = 7 * baseSizePx
const copiedDelay = 3000