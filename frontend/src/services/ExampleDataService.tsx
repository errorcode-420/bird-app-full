import ApiService from './ApiService';

const ExampleService = {
    async reverseWord(word: string) {
        return await ApiService.post('reverse', { word });
    },

    // Weitere Methoden zur Kommunikation mit dem Server
};

export default ExampleService;
