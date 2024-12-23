class ShareManager {

    constructor(timeStr, debugMode) {
        // Set up a share manager object with a the time taken to complete the puzzle.
        this.timeStr = timeStr
        this.debugMode = debugMode
        this.shareImage = null
    }

    getShareDiv() {

        // Build an interface for sharing results on social media.

        // Show the shared image from a pre-generated set.
        // If the time is less than an hour, show an image with a timer, otherwise a generic image.
        this.shareImage = document.createElement('img')
        this.shareImage.src = this.getShareImageLink()
        this.shareImage.style.width = shareDivWidthPx + 'px'
        this.shareImage.style.marginTop = baseSizePx + 'px'
     
        // Create a row div that contains the image and platform-specific sharing buttons.

        const shareButtonsRow = document.createElement('div')
        shareButtonsRow.style.width = shareDivWidthPx + 'px'
        shareButtonsRow.style.height = slotSizePx + 'px'
        shareButtonsRow.style.paddingLeft = baseSizePx + 'px'
        shareButtonsRow.style.paddingRight = baseSizePx + 'px'
        shareButtonsRow.style.boxSizing = 'border-box'
        shareButtonsRow.style.display = 'flex'
        shareButtonsRow.style.justifyContent = 'space-between'

        const shareButtons = [
            {'image': 'facebook', 'click': this.shareFacebook, 'hover': 'Share on Facebook'},
            {'image': 'instagram', 'click': this.shareInstagram, 'hover': 'Share on Instagram'},
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
        shareDiv.style.width = shareDivWidthPx + 'px'
        shareDiv.style.transition = 'opacity 1s ease-in-out'
        shareDiv.appendChild(this.shareImage)
        shareDiv.appendChild(shareButtonsRow)

        return shareDiv

    }

    async shareFacebook() {
        if (this.debugMode) {
            console.log('Sharing to Facebook')
        }
        const facebookURL = 'https://www.facebook.com/sharer/sharer.php?u=' + this.getShareImageLink(true)
        window.open(facebookURL, 'facebook-share-dialog')
    }

    shareInstagram() {
        if (this.debugMode) {
            console.log('Sharing to Instagram')
        }
        const instagramURL = 'https://www.instagram.com/share?url=' + this.getShareImageLink(true)
        window.open(instagramURL, '_blank');
    }

    shareWhatsApp() {
        if (this.debugMode) {
            console.log('Sharing to Facebook')
        }
        const whatsAppURL = 'https://wa.me/?text=' + this.getShareImageLink(true)
        console.log(whatsAppURL)
        window.open(whatsAppURL, '_blank');
    }

    async shareCopy(event) {
        // Copy the image data to the clipboard.
        if (this.debugMode) {
            console.log('Copying to clipboard')
        }

        // Copy shared image to a canvas object.
        const canvas = document.createElement('canvas')
        canvas.width = this.shareImage.width
        canvas.height = this.shareImage.height
        const context = canvas.getContext('2d')
        context.drawImage(this.shareImage, 0, 0, this.shareImage.width, this.shareImage.height)

        // Copy to clipboard.
        const dataURL = canvas.toDataURL('image/png'); 
        const response = await fetch(dataURL);
        const blob = await response.blob();
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])

        // Turn on "copied" indicator.
        this.shareCopied(event.target)
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

        return shareImage
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