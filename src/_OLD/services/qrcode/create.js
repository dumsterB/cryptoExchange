import QRCode from 'qrcode';

async function loadImage(src) {
    return new Promise(resolve => {
        const image = new Image();

        image.onload = () => resolve(image);

        image.src = src;
    });
}

export async function createQRCode(
    canvas,
    {
        width = 150,
        height = 150,
        text = '',
        imageSrc = ''
    } = {}
) {
    try {
        QRCode.toCanvas(
            canvas,
            text,
            {
                width: width * 2,
                height: height * 2,
                errorCorrectionLevel: 'H',
                margin: 1,
                color: {
                    dark: '#15141B',
                    light: "#ffffff",
                },
            }
        );

        const ctx = canvas.getContext('2d');
        const loadedImage = await loadImage(imageSrc);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(110, 110, 80, 80);
        ctx.drawImage(loadedImage, 120, 120, 60, 60);

        canvas.style.width = `${ width }px`;
        canvas.style.height = `${ height }px`;
    } catch (error) {
        console.error(error);
    }
}