/**
 * @jest-environment jsdom
 */

import { displayNoResult, handleSubmit } from "../ts/movieApp";
import * as movieApp from "../ts/movieApp";
import { getData } from "../ts/services/movieservice";
import { IMovie} from "../ts/models/Movie";
import { movies } from "../ts/services/__mocks__/movieservice";


beforeEach( () => {
    document.body.innerHTML = "";
})

jest.mock("../ts/services/movieservice.ts");

test('Should spy on handleSubmit()', () =>{
    document.body.innerHTML = 
    `<form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
    </form>
    `;

    let spyOnHandleSubmit = jest.spyOn(movieApp, "handleSubmit").mockReturnValue(new Promise<void>((resolve) => {
        resolve();
    }));

    movieApp.init();

    (document.querySelector('#searchForm') as HTMLFormElement)?.submit();
    expect(spyOnHandleSubmit).toHaveBeenCalledTimes(1);
    spyOnHandleSubmit.mockRestore();
});

describe("handleSubmit", () => {
    test("Should show movies", async () => {
        //Arrange
        document.body.innerHTML = `
        <form id="searchForm">
          <input type="text" id="searchText" placeholder="Skriv titel här" />
          <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>`;
    
        //Act
        let searchText = (document.getElementById("searchText") as HTMLInputElement)
        let spyOnCreateHtml = jest.spyOn(movieApp, "createHtml").mockReturnValue()
        let container: HTMLDivElement = document.getElementById(
            "movie-container"
          ) as HTMLDivElement;
          container.innerHTML = "";
    
        searchText.value = "Cars 3";
        await handleSubmit(); 
        //await getData("Cars 3");

        //let movies :IMovie [] = await getData("cars 3")
    
        //Assert
        expect(spyOnCreateHtml).toBeCalled();
        expect(spyOnCreateHtml).toBeCalledWith(movies, container);
        spyOnCreateHtml.mockRestore();
    })

    test("Should call function displayNoResult", async () => {
        //Arrange
        document.body.innerHTML = `
        <form id="searchForm">
          <input type="text" id="searchText" placeholder="Skriv titel här" />
          <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>`;

        let spyOnNoResult = jest.spyOn(movieApp, "displayNoResult").mockReturnValue()
    
        //Act
        await handleSubmit();

        //Assert
        expect(spyOnNoResult).toBeCalled();
        spyOnNoResult.mockRestore();
    })

})


test("Should create HTML", () => {
    //Arrange
    document.body.innerHTML = `
        <div id="movie-container"></div>
    `;
    
    const container = (document.getElementById("movie-container") as HTMLInputElement)

    //Act
    movieApp.createHtml(movies, container);

    //Assert
    expect(movies[0].Title).toEqual("Cars 3");
    expect(movies[0].imdbID).toEqual("5");
})


test("Should create p element and display text", () => {
    //Arrange
    document.body.innerHTML = `
        <div id="movie-container"></div>
    `;

    //Act
    const container = (document.getElementById("movie-container") as HTMLInputElement)
    const newPElement = `<p>Inga sökresultat att visa</p>`
    
    movieApp.displayNoResult(container)

    let htmlResult = document.querySelector("#movie-container")?.innerHTML;
    //let htmlClass = document.querySelector("#movie-container")?.firstElementChild;

    //Assert
    expect(htmlResult).toEqual(newPElement);
})