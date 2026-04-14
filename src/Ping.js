import Logger from "./Logger.js";
import Resources from "./Resources.js";
import Verifier from "./Verifier.js";

const notAuthorizedError = Resources.NOT_AUTHORIZED_ERROR;

export default class Ping {
    static _instance;
    static getInstance = () => this._instance;

    #interval;
    constructor() {
        Logger.log(`Initializing Ping service`);
        if (Ping._instance === undefined) {
            Ping._instance = this;
        } else {
            throw Resources.CREATE_SECOND_SINGLETON_ERROR;
        }
        Logger.log(`Ping service has been initialized successfully`);
    }

    #ping = async () => {
        const url = Resources.GET_TASKS_HTML_URL;

        Logger.log(`Trying to ping server with url - ${url}`);
        try {
            await Verifier.getInstance().verifyAll();
            Logger.log(`Server has been successfully respond`);
        } catch (error) {
            Logger.log(`Server has not been respond or an error occurred`);
            
            //throw error;
        }
    }

    start = () => {
        const interval = Resources.PING_INTERVAL;

        Logger.log(`Starting asynchronous ping service with interval - ${interval}`);
        setInterval(this.#ping, interval * 60 * 60 * 1000);
        Logger.log(`Ping asynchronous has been started`);
    }
}