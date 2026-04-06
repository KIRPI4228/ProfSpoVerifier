import Logger from "./Logger.js";
import ProfSpoParser from "./parser/ProfSpoParser.js";
import Resources from "./Resources.js";

const baseUrl = Resources.BASE_URL;

export default class Verifier {
    #parser;
    constructor(sessionId) {
        Logger.log(`Initializing Verifier service...`);
        this.#parser = new ProfSpoParser(sessionId);
        Logger.log(`Verifier service has been initialized successfully with session id - ${sessionId}`);
    }

    verifiAll = async () => {
        Logger.log(`Start verifing all tasks`);
        const hrefs = await this.#parser.getUncommitedTasksHrefs();
        Logger.log(`Got all tasks hrefs`);
        hrefs.forEach(async href => {
            Logger.log(`Verifing ${href}`);
            const response = await this.#parser.requestGet(`${baseUrl}${href}?confirmReading`);
            Logger.log(`Successfully verified ${href}`);
            Logger.log(`Unverified tasks: ${(await this.#parser.getUncommitedTasksHrefs()).length}`);
        });
    }
}