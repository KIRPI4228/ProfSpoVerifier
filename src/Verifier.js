import ProfSpoParser from "./parser/ProfSpoParser";
import Resources from "./Resources";

const baseUrl = Resources.BASE_URL;

export default class Verifier {
    #parser;
    constructor(sessionId) {
        this.#parser = new ProfSpoParser(sessionId);
    }

    verifiAll = async () => {
        const hrefs = await this.#parser.getUncommitedTasksHrefs();
        hrefs.forEach(async href => {
            console.log(`Verifing ${href}`);
            const response = await this.#parser.requestGet(`${baseUrl}${href}/confirmReading`);
            console.log(`Successfully verified ${href} with response -   ${response}`); 
        });
    }
}