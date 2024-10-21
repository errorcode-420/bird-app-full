import axios from "axios";
import { config } from '../config';


let API_URL = 'http://127.0.0.1:5000/hello';
if(!config.useMockBackend) {
    API_URL = 'https://bird-app-backend-835758320072.europe-west3.run.app';
}

const ApiService = {
    async post(endpoint: string, data: any) {
        try {
alert(API_URL)
            const response = await axios.post(`${API_URL}/${endpoint}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

export default ApiService;


