import Logger from "./Logger.js";
import ProfSpoParser from "./parser/ProfSpoParser.js";
import Resources from "./Resources.js";

const notAuthorizedError = Resources.NOT_AUTHORIZED_ERROR;

export default class Ping {
    #interval;
    #parser
    constructor(sessionId, intervalHours) {
        Logger.log(`Initializing Ping service`);
        this.#parser = new ProfSpoParser(sessionId);
        this.#interval = intervalHours * 60 * 60 * 1000;
        Logger.log(`Ping service has been initialized successfully with interval - ${intervalHours} hours`);
    }

    start = () => {
        Logger.log(`Starting asynchronous ping service`);
        setInterval(ping, this.#interval);
        Logger.log(`Ping asynchronous has been started`);
    }

    //TODO: make it private
    ping = async () => {
        const url = Resources.GET_TASKS_HTML_URL;

        Logger.log(`Trying to ping server with url - ${url}`);
        try {
            await this.#parser.requestGet(url);
            Logger.log(`Server has been successfully respond`);
        } catch (error) {
            Logger.log(`Server has not been respond or an error occurred`);
            
            if (error === notAuthorizedError) {
                Logger.warn(`Not authorized error occured`);
            } else {
                Logger.error(error);
            }
        }
    }
}