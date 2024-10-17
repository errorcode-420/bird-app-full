import { SavedBird } from "./SavedBird";

export interface User {
    id: number;
    username: string;
    savedBirds: SavedBird[]
}