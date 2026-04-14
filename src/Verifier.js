import Logger from "./Logger.js";
import Parser from "./parser/Parser.js";
import Resources from "./Resources.js";

const baseUrl = Resources.BASE_URL;

export default class Verifier {
    static _instance;
    static getInstance = () => this._instance;

    constructor() {
        Logger.log(`Initializing Verifier service...`);
        if (Verifier._instance === undefined) {
            Verifier._instance = this;
        } else {
            throw Resources.CREATE_SECOND_SINGLETON_ERROR;
        }
        Logger.log(`Verifier service has been initialized successfully`);
    }

    verifyAll = async () => {
        Logger.log(`Start verifing all tasks`);
        const hrefs = await Parser.getInstance().getUncommitedTasksHrefs();
        Logger.log(`Got all tasks hrefs`);
        hrefs.forEach(async href => {
            Logger.log(`Verifing ${href}`);
            await Parser.getInstance().requestGet(`${baseUrl}${href}?confirmReading`);
            Logger.log(`Successfully verified ${href}`);
            Logger.log(`Unverified tasks: ${(await Parser.getInstance().getUncommitedTasksHrefs()).length}`);
        });
    }
}