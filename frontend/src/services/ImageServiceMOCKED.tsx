import { Image } from "../types/Image";

class ImageService {


    public getImageSrc(className: string):string {
        return `${process.env.PUBLIC_URL}/assets/images/testing/${className}/1.jpg`;
    }

   
    public getImageSources = (className: string) => {
        return [
            `${process.env.PUBLIC_URL}/assets/images/testing/${className}/1.jpg`,
            `${process.env.PUBLIC_URL}/assets/images/testing/${className}/2.jpg`,
            `${process.env.PUBLIC_URL}/assets/images/testing/${className}/3.jpg`,
            `${process.env.PUBLIC_URL}/assets/images/testing/${className}/4.jpg`,
        ];
    };

    public fetchImages = async (className: string): Promise<Image[]> => {
        // Simuliere das Laden von Bildern
        return new Promise((resolve) => {
            setTimeout(() => {
                const imageSources = this.getImageSources(className);
                const images: Image[] = imageSources.map((url, index) => ({
                    id: index + 1,
                    url: url,
                    title: `Bild ${index + 1}`,
                    description: `Beschreibung für Bild ${index + 1}`,
                }));
                resolve(images);
            }, 1000); // Simuliere eine Ladezeit von 1 Sekunde
        });
    };
};
const imageService = new ImageService();
export default imageService;
