class ShareManager {

    constructor(timer, debugMode) {
        // Set up a share manager object with a timer showing time to complete the puzzle.
        this.timer = timer
        this.debugMode = debugMode
        this.shareImageDiv = null
        this.shareImage = null
        this.imageShareLink = null
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
        nameDiv.style.fontFamily = font
        nameDiv.style.fontSize = shareNameFontSizeEM + 'em'
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
        topRowDiv.style.alignItems = 'center'
        topRowDiv.style.marginBottom = baseSizePx + 'px'
        topRowDiv.append(leftPiece)
        topRowDiv.append(nameDiv)
        topRowDiv.append(rightPiece)

        const websiteDiv = document.createElement('div')
        websiteDiv.style.fontFamily = font
        websiteDiv.style.fontSize = shareWebsiteFontSizeEM + 'em'
        websiteDiv.style.fontWeight = 'bold'
        websiteDiv.style.color = darkGray
        websiteDiv.style.userSelect = 'none'
        websiteDiv.style.marginTop = (2 * baseSizePx) + 'px'
        websiteDiv.style.marginBottom = baseSizePx + 'px'
        websiteDiv.innerHTML = website

        // Create the div that will be shared as an image.
        const shareImageDiv = document.createElement('div')
        shareImageDiv.style.width = shareDivWidthPx + 'px'
        shareImageDiv.style.height = shareDivHeightPx + 'px'
        shareImageDiv.style.backgroundColor = lightGray
        shareImageDiv.style.border = borderWidth + 'px solid'
        shareImageDiv.style.borderRadius = borderRadius
        shareImageDiv.style.padding = baseSizePx + 'px'
        shareImageDiv.style.boxSizing = 'border-box'
        shareImageDiv.style.marginTop = baseSizePx + 'px'
        shareImageDiv.style.display = 'flex'
        shareImageDiv.style.flexDirection = 'column'
        shareImageDiv.style.placeItems = 'center'
      
        shareImageDiv.appendChild(topRowDiv)
        // Show final timer result in the shared image.
        shareImageDiv.appendChild(this.timer.cloneNode(true))
        shareImageDiv.appendChild(websiteDiv)
        this.shareImageDiv = shareImageDiv

        // Create a row div that contains the image and platform-specific sharing buttons.

        const shareButtonsRow = document.createElement('div')
        shareButtonsRow.style.width = controlDivWidthPx + 'px'
        shareButtonsRow.style.height = slotSizePx + 'px'
        shareButtonsRow.style.padding = baseSizePx + 'px'
        shareButtonsRow.style.boxSizing = 'border-box'
        shareButtonsRow.style.display = 'flex'
        shareButtonsRow.style.justifyContent = 'space-between'

        const shareButtons = [
            {'image': 'facebook', 'click': this.shareFacebook, 'hover': 'Share on Facebook'},
            {'image': 'instagram', 'click': this.shareInstagram, 'hover': 'Share on Instagram'},
            {'image': 'whatsapp', 'click': this.shareWhatsApp, 'hover': 'Share on WhatsApp'},
            {'image': 'copy', 'click': this.shareCopy, 'hover': 'Copy to Clipboard'},
        ]

        // Get link to image for social media sharing.
        this.getShareImageLink()

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
        shareDiv.style.width = controlDivWidthPx + 'px'
        shareDiv.style.height = controlDivHeightPx + 'px'
        shareDiv.style.transition = 'opacity 1s ease-in-out'
        shareDiv.appendChild(shareImageDiv)
        shareDiv.appendChild(shareButtonsRow)

        return shareDiv

    }

    async shareFacebook() {
        if (this.debugMode) {
            console.log('Sharing to Facebook')
        }
        const facebookURL = 'https://www.facebook.com/sharer/sharer.php?u=' + this.imageShareLink
        window.open(facebookURL, 'facebook-share-dialog')
    }

    shareInstagram() {
        if (this.debugMode) {
            console.log('Sharing to Instagram')
        }
        const instagramURL = 'https://www.instagram.com/share?url=' + this.imageShareLink
        window.open(instagramURL, '_blank');
    }

    shareWhatsApp() {
        if (this.debugMode) {
            console.log('Sharing to Facebook')
        }
        const whatsAppURL = 'https://wa.me/?text=' + this.imageShareLink
        console.log(whatsAppURL)
        window.open(whatsAppURL, '_blank');
    }

    async shareCopy(event) {
        // Copy the image data to the clipboard.
        if (this.debugMode) {
            console.log('Copying to clipboard')
        }
        await this.generateClipboardImage()
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

    async generateClipboardImage() {
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
        
        return this.shareImage
    }

    getShareImageLink() {
        // For sharing on social media platforms, use a pre-generated image with the right time displayed.
        // If time is more than 1 hour, share an image without a timer result.
        const timerStr = this.timer.innerHTML
        if (timerStr.length == 5) {
            this.imageShareLink = website + '/images/share/' + this.timer.innerHTML.replaceAll(':', '_') + '.png'
        } else {
            this.imageShareLink = website + '/images/share/share.png'
        }
        return this.imageShareLink
    }

}