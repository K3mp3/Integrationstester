/**
 * @jest-environment jsdom
 */
import { movies } from "../ts/services/__mocks__/movieservice";
import { getData } from "../ts/services/movieservice";

jest.mock("axios", () => ({
    get: async (url: string) => {
        return new Promise ((resolve, reject) => {
            if(url.endsWith("error")) {
                reject([]);
            }
            else {
                resolve ( {data: movies})
            }
        })
    }
}));

test("Should get data correctly", async () => {
    let data = await getData("test");
})

test("Should get error getting data", async () => {
    try {
        let data = await getData("error");
    }
    catch (error: any) {
        expect(error.length).toBe(0)
    }
})