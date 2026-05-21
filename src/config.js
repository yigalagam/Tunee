const appName = 'Tunee'
const subtitle = "Click on the puzzle pieces, put them in order, hear today's music!"
const website = 'https://tuneepuzzle.github.io/play'
const playstore = 'https://play.google.com/store/apps/details?id=com.mayuga.tunee'
const email = 'tuneepuzzle@gmail.com'

// Check if operating in a desktop or mobile environment.
const userAgent = navigator.userAgent.toLowerCase()
const isAndroid = /android/i.test(userAgent)
const isiOS = /iphone|ipad|ipod/i.test(userAgent)
const isChrome = /chrome/i.test(userAgent)
const isSafari = /safari/i.test(userAgent) && (!isChrome)
const isMobile = isAndroid || isiOS

// Make everything slightly larget on mobile.
mobileScale = isMobile ? 1.12 : 1
mobileFontScale = isMobile ? 1.3 : 1

// This will generate some console messages.
var debugMode = false

// Start the game already solved (but one piece).
var solved = false

// Board dimensions: [desktop, mobile]
const nBoardRows = isMobile ? 6 : 5
const nBoardCols = isMobile ? 12 : 14

// Number of pieces making up the puzzle.
const nPieces = 12

// Title div styling.
const titleFontSizeEM = 3 * mobileFontScale
const subtitleFontSizeEM = 1.5 * mobileFontScale

// Fade in and fade out.
const fadeDuration = 0.5
const nFadeSteps = 10

// Parameters for setting up the game GUI.
const baseSizePx = 10 * mobileScale
const slotSizePx = 7 * baseSizePx
const font = 'Verdana'
const fontSizeEM = 1.3 * mobileFontScale
const lightGray = '#AFAFAF'
const darkGray = '#5F5F5F'
const yellow = '#FFC000'
const borderWidth = 3 * mobileScale
const borderRadius = (10 * mobileScale ) + 'px'
const boardWidth = nBoardCols * slotSizePx + borderWidth

// Reset (restart) button.
const resetButtonSizePx = 3.5 * baseSizePx

// Bottom div outside the board with button and timer.
const controlDivWidthPx = 50 * baseSizePx
const controlDivHeightPx = 19 * baseSizePx

// email and app buttons.
const linkButtonSizePx = 9 * baseSizePx

// Dislaimer statement.
const disclaimerFontSizeEM = 1 * mobileFontScale

// Parameter for displaying song information.
const songTitleFontSizeEM = 1.3 * mobileFontScale
const youtubeFrameWidthPx = 0.48 * boardWidth

// Parameters for the result display.
const resultDivWidthPx = 0.48 * boardWidth
const resultAppNameFontSizeEM = 2.1 * mobileFontScale
const resultFadeoutInterval = 1000
const copyButtonSizePx = 7 * baseSizePx
const copiedDelay = 3000