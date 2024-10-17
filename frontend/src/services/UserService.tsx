import {Prediction} from "../types/Prediction";
import {User} from "../types/User";


class UserService {
 
    // Diese Methode wandelt die Vorhersagen in das gewünschte Result-Format um
    async getUserDataMOCKED(): Promise<User> {
        return {
            id: 1,
            username: "Max Mustermann",
            savedBirds: []
        };
    }

}

const userService = new UserService();
export default userService;
