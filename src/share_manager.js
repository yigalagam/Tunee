class ShareManager {

    constructor(timer, debugMode) {
        // Set up a share manager object with a timer showing time to complete the puzzle.
        this.timer = timer
        this.debugMode = debugMode
        this.shareImageDiv = null
        this.shareImage = null
    }

    getShareDiv() {

        // Build an interface for sharing results on social media.

        // Top row: Game title between two puzzle pieces.
        
        const pieceDiv = document.createElement('div')
        pieceDiv.style.width = slotSizePx + 'px'
        pieceDiv.style.height = slotSizePx + 'px'
        pieceDiv.style.backgroundImage = "url('../images/piece.png')"
        pieceDiv.style.backgroundSize = 'cover'
        const leftPiece = pieceDiv
        const rightPiece = pieceDiv.cloneNode(true)
        
        const nameDiv = document.createElement('div')
        nameDiv.style.height = slotSizePx + 'px'
        nameDiv.style.fontFamily = font
        nameDiv.style.fontSize = (2.25 * fontSizeEM) + 'em'
        nameDiv.style.fontWeight = 'bold'
        nameDiv.style.color = darkGray
        nameDiv.style.userSelect = 'none'
        nameDiv.innerHTML = appName

        const topRowDiv = document.createElement('div')
        topRowDiv.style.width = '100%'
        topRowDiv.style.height = slotSizePx + 'px'
        topRowDiv.style.backgroundColor = lightGray
        topRowDiv.style.display = 'flex'
        topRowDiv.style.justifyContent = 'space-between'
        topRowDiv.append(leftPiece)
        topRowDiv.append(nameDiv)
        topRowDiv.append(rightPiece)

        // Create the div that will be shared as an image.
        const shareImageDiv = document.createElement('div')
        shareImageDiv.style.width = bottomDivWidthPx + 'px'
        shareImageDiv.style.height = bottomDivHeightPx + 'px'
        shareImageDiv.style.backgroundColor = lightGray
        shareImageDiv.style.border = borderWidth + 'px solid'
        shareImageDiv.style.borderRadius = borderRadius
        shareImageDiv.style.padding = baseSize + 'px'
        shareImageDiv.style.boxSizing = 'border-box'
        shareImageDiv.style.marginTop = baseSize + 'px'
        shareImageDiv.style.marginLeft = 'auto'
        shareImageDiv.style.marginRight = 'auto'
        shareImageDiv.style.marginTop = baseSize + 'px'
        shareImageDiv.style.display = 'flex'
        shareImageDiv.style.flexDirection = 'column'
        shareImageDiv.style.placeItems = 'center'
        shareImageDiv.style.justifyContent = 'space-between'
      
        shareImageDiv.appendChild(topRowDiv)
        // Show final timer result in the shared image.
        shareImageDiv.appendChild(this.timer.cloneNode(true))
        this.shareImageDiv = shareImageDiv

        // Create a row div that contains the image and platform-specific sharing buttons.

        const shareButtonsRow = document.createElement('div')
        shareButtonsRow.style.width = bottomDivWidthPx + 'px'
        shareButtonsRow.style.height = slotSizePx + 'px'
        shareImageDiv.style.padding = baseSize + 'px'
        shareImageDiv.style.boxSizing = 'border-box'
        shareButtonsRow.style.display = 'flex'
        shareButtonsRow.style.justifyContent = 'space-between'

        const shareButtons = [
            {'image': 'facebook', 'click': this.shareFacebook, 'hover': 'Share on Facebook'},
            {'image': 'instagram', 'click': this.shareInstagram, 'hover': 'Share on Instagram'},
            {'image': 'x', 'click': this.shareX, 'hover': 'Share on X'},
            {'image': 'bluesky', 'click': this.shareBluesky, 'hover': 'Share on Bluesky'},
            {'image': 'whatsapp', 'click': this.shareWhatsApp, 'hover': 'Share on WhatsApp'},
            {'image': 'copy', 'click': this.shareCopy, 'hover': 'Copy to Clipboard'},
        ]

        shareButtons.forEach(shareButton => {
            const shareButtonDiv = document.createElement('div')
            shareButtonDiv.style.backgroundImage = 'url("../images/' + shareButton.image + '.png")'
            shareButtonDiv.style.backgroundSize = 'cover'
            shareButtonDiv.style.width = slotSizePx + 'px'
            shareButtonDiv.style.height = slotSizePx + 'px'
            shareButtonDiv.onclick = shareButton.click.bind(this)
            shareButtonsRow.appendChild(shareButtonDiv)
        })

        const shareDiv = document.createElement('div')
        shareDiv.style.width = bottomDivWidthPx + 'px'
        shareDiv.style.height = bottomDivHeightPx + 'px'
        shareDiv.appendChild(shareImageDiv)
        shareDiv.appendChild(shareButtonsRow)

        return shareDiv

    }

    async shareFacebook() {
        if (this.debugMode) {
            console.log('Sharing to Facebook')
        }
        await this.generateShareImage()
        const dataURL = this.shareImage.toDataURL('image/png')
        console.log(dataURL)
        const facebookShareURL = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(dataURL)
        window.open(facebookShareURL, 'facebook-share-dialog')
    }

    shareInstagram() {
    }

    shareX() {
    }

    shareBluesky() {
    }

    shareWhatsApp() {
    }

    async shareCopy(event) {
        // Copy the image data to the clipboard.
        if (this.debugMode) {
            console.log('Copying to clipboard')
        }
        await this.generateShareImage()
        this.shareImage.toBlob(blob => {
            if (blob) {
                navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
                this.shareCopied(event.target)
            }
        })
    }

    shareCopied(shareButtonDiv) {
        // Temporarily disable the copy button after copying.
        shareButtonDiv.onclick = null
        shareButtonDiv.style.backgroundImage = 'url("../images/copied.png")'
        setTimeout(() => {
            shareButtonDiv.onclick = this.shareCopy.bind(this)
            shareButtonDiv.style.backgroundImage = 'url("../images/copy.png")'
        }, copiedDelay)
    }

    async generateShareImage() {
        // Create an image to share on social media or to copy to clipboard.

        if (this.shareImage == null) {
            if (this.debugMode) {
                console.log('Generating shareable image')
            }
            const canvas = await html2canvas(this.shareImageDiv)

            // Scale shared image.
            const context = canvas.getContext('2d')
            const scaledCanvas = document.createElement('canvas')
            const scaledContext = scaledCanvas.getContext('2d')
            scaledCanvas.width = canvas.width * shareImageScaling
            scaledCanvas.height = canvas.height * shareImageScaling;
            scaledContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, scaledCanvas.width, scaledCanvas.height)

            this.shareImage = scaledCanvas
        }
    }

}