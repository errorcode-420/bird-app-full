import {Result} from "./Result"

export interface SavedBird {
    class: string;
    id?: number;
    savedResults: Result[]
}