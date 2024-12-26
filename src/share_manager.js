class ShareManager {

    constructor(timeStr, debugMode=false) {
        // Set up a share manager object with a the time taken to complete the puzzle.
        this.timeStr = timeStr
        this.debugMode = debugMode
        this.resultImage = null
    }

    getShareDiv() {

        // Build an interface for sharing results on social media.

        // Show the shared image from a pre-generated set.
        // If the time is less than an hour, show an image with a timer, otherwise a generic image.
        this.resultImage = document.createElement('img')
        this.resultImage.src = this.getShareImageLink()
        this.resultImage.style.width = shareDivWidthPx + 'px'
        this.resultImage.style.marginTop = baseSizePx + 'px'
     
        // Create a div that contains the copy button.
        const copyButtonDiv = document.createElement('div')
        copyButtonDiv.style.backgroundImage = 'url("../images/copy.png")'
        copyButtonDiv.style.backgroundSize = 'cover'
        copyButtonDiv.style.width = Math.round(2.5 * slotSizePx) + 'px'
        copyButtonDiv.style.height = Math.round(2.5 * slotSizePx) + 'px'
        copyButtonDiv.onclick = this.copyResult.bind(this)
 
        const resultDiv = document.createElement('div')
        resultDiv.style.width = shareDivWidthPx + 'px'
        resultDiv.style.marginTop = baseSizePx + 'px'
        resultDiv.style.display = 'flex'
        resultDiv.style.flexDirection = 'column'
        resultDiv.style.placeItems = 'center'
        resultDiv.appendChild(this.resultImage)
        resultDiv.appendChild(copyButtonDiv)

        return resultDiv
    }

    copyResult(event) {
        // Copy to clipboard.

        const copyText = this.getShareText()

        //navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])

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
        const nSpaces = Math.round((shareText.length - this.timeStr.length) / 2)
        shareText += ('\n' + ' '.repeat(nSpaces) + this.timeStr + ' '.repeat(nSpaces))

        shareText += ('\n' + website + '\n')

        if (this.debugMode) {
            console.log(shareText)
        }
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