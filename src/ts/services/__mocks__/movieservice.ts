import { IMovie } from "../../models/Movie";

export let movies: IMovie[] = [
    {
        Title: "Cars 3",
        imdbID: "5",
        Type: "Animated",
        Poster: "...",
        Year: "2017"
    }
]

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
        if (searchText === "") {
            reject([])
        } else {
            resolve(movies);
        }
    });
}