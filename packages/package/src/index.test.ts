import { init } from "./index";

describe("Test of the setup", () => {
    it("tests work", () => {
        expect(typeof init).toBe("function");
    })
})