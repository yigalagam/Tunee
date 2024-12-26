class ShareManager {

    constructor(timerDiv, debugMode=false) {
        // Set up a share manager object with a the time taken to complete the puzzle.
        this.timerDiv = timerDiv       
        this.timeStr = timerDiv.innerHTML
        this.debugMode = debugMode
        this.resultImage = null
    }

    getShareDiv() {

        // Div with final timer result and copy button for sharing.

        // Top row: Game title between two puzzle pieces.
        
        const pieceDiv = document.createElement('div')
        pieceDiv.style.width = slotSizePx + 'px'
        pieceDiv.style.height = slotSizePx + 'px'
        pieceDiv.style.backgroundImage = "url('../images/piece.png')"
        pieceDiv.style.backgroundSize = 'cover'
        const leftPiece = pieceDiv
        const rightPiece = pieceDiv.cloneNode(true)
        
        const nameDiv = document.createElement('div')
        nameDiv.style.fontFamily = font
        nameDiv.style.fontSize = resultAppNameFontSizeEM + 'em'
        nameDiv.style.fontWeight = 'bold'
        nameDiv.style.color = darkGray
        nameDiv.style.userSelect = 'none'
        nameDiv.innerHTML = appName

        const topRowDiv = document.createElement('div')
        topRowDiv.style.width = '100%'
        topRowDiv.style.height = slotSizePx + 'px'
        topRowDiv.style.marginTop = baseSizePx + 'px'
        topRowDiv.style.marginBottom = baseSizePx + 'px'
        topRowDiv.style.paddingLeft = baseSizePx + 'px'
        topRowDiv.style.paddingRight = baseSizePx + 'px'
        topRowDiv.style.boxSizing = 'border-box'
        topRowDiv.style.display = 'flex'
        topRowDiv.style.justifyContent = 'space-between'
        topRowDiv.style.alignItems = 'center'
        topRowDiv.append(leftPiece)
        topRowDiv.append(nameDiv)
        topRowDiv.append(rightPiece)

        // Create a div that contains the copy button.
        const copyButtonDiv = document.createElement('div')
        copyButtonDiv.style.backgroundImage = 'url("../images/copy.png")'
        copyButtonDiv.style.backgroundSize = 'cover'
        copyButtonDiv.style.width = copyButtonSizePx + 'px'
        copyButtonDiv.style.height = copyButtonSizePx + 'px'
        copyButtonDiv.onclick = this.copyResult.bind(this)
 
        // The full result div contains the top row, timer result and copy button.

        const nameAndTimerDiv = document.createElement('div')
        nameAndTimerDiv.style.width = '100%'
        nameAndTimerDiv.style.backgroundColor = lightGray
        nameAndTimerDiv.style.border = borderWidth + 'px solid'
        nameAndTimerDiv.style.borderRadius = borderRadius
        nameAndTimerDiv.style.marginBottom = baseSizePx + 'px'
        nameAndTimerDiv.style.display = 'flex'
        nameAndTimerDiv.style.flexDirection = 'column'
        nameAndTimerDiv.style.placeItems = 'center'
        nameAndTimerDiv.appendChild(topRowDiv)
        this.timerDiv.style.marginBottom = baseSizePx + 'px'
        nameAndTimerDiv.appendChild(this.timerDiv)

        const resultDiv = document.createElement('div')
        resultDiv.style.width = resultDivWidthPx + 'px'
        resultDiv.style.display = 'flex'
        resultDiv.style.flexDirection = 'column'
        resultDiv.style.placeItems = 'center'
        resultDiv.appendChild(nameAndTimerDiv)
        resultDiv.appendChild(copyButtonDiv)

        return resultDiv
    }

    copyResult(event) {
        // Copy to clipboard.

        const copyText = this.getShareText()
        if (this.debugMode) {
            console.log(copyText)
        }
        navigator.clipboard.writeText(copyText)

        // Turn on "copied" indicator.
        this.copiedResult(event.target)
    }

    copiedResult(shareButtonDiv) {
        // Temporarily disable the copy button after copying.
        shareButtonDiv.onclick = null
        shareButtonDiv.style.backgroundImage = 'url("../images/copied.png")'
        setTimeout(() => {
            shareButtonDiv.onclick = this.copyResult.bind(this)
            shareButtonDiv.style.backgroundImage = 'url("../images/copy.png")'
        }, copiedDelay)
    }

    getShareText() {
        // Generate a text to copy to the clipboard for sharing.

        // Date in YYYY/MM/DD format.
        const today = new Date()
        const year = today.getFullYear()
        const month = (today.getMonth() + 1).toString().padStart(2, '0')
        const day = today.getDate().toString().padStart(2, '0')
        const dateStr = year + '/' + month + '/' + day

        // Musical note character.
        const note = String.fromCodePoint(0x1F3B5)
        
        let shareText = note + ' ' + appName + ', ' + dateStr + ' ' + note

        // Timer result with padding.
        shareText += ('\n\n' + 'Time to solve: ' + this.timeStr)

        shareText += ('\n\n' + website + '\n')

        return shareText
    }

    getShareImageLink(external=false) {
        // For sharing on social media platforms, use a pre-generated image with the right time displayed.
        // If time is more than 1 hour, share an image without a timer result.
        let prefix
        if (external) {
            prefix = website
        } else {
            prefix = '..'
        }
        let imageShareLink
        if (this.timeStr.length == 5) {
            // Time is mm:ss, meaning less than 1 hour.
            imageShareLink = prefix + '/images/share/' + this.timeStr.replaceAll(':', '_') + '.png'
        } else {
            // Time has an hours component, meaning at least 1 hour.
            imageShareLink = prefix + '/images/share/share.png'
        }
        return imageShareLink
    }

}