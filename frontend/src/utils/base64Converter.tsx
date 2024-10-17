// utils/base64Converter.ts
export const convertImageToBase64 = (imagePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imagePath;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/jpeg'); // Du kannst das Format anpassen
                resolve(dataURL);
            } else {
                reject(new Error('Canvas context is not available'));
            }
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };
    });
};
