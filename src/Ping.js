import Logger from "./Logger.js";
import Parser from "./parser/Parser.js";
import Resources from "./Resources.js";

const notAuthorizedError = Resources.NOT_AUTHORIZED_ERROR;

export default class Ping {
    #interval;
    constructor(intervalHours) {
        Logger.log(`Initializing Ping service`);
        this.#interval = intervalHours * 60 * 60 * 1000;
        Logger.log(`Ping service has been initialized successfully with interval - ${intervalHours} hours`);
    }

    #ping = async () => {
        const url = Resources.GET_TASKS_HTML_URL;

        Logger.log(`Trying to ping server with url - ${url}`);
        try {
            await Parser.getInstance().requestGet(url);
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

    start = () => {
        Logger.log(`Starting asynchronous ping service`);
        setInterval(this.#ping, this.#interval);
        Logger.log(`Ping asynchronous has been started`);
    }
}