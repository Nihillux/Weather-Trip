// Required by Jest to understand ES6
import "regenerator-runtime/runtime";

// Import the js file to test
import { updateUi } from "../src/client/js/formHandler.js"

describe("Testing the updateUI function defined", () => {
    test("Testing the updateUI() function is defined", () => {
        expect(updateUi).toBeDefined();
    })
});