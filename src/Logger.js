import log4js from 'log4js'

export default class Logger {
    static {
        log4js.configure({
            appenders: {
                everything: {
                    type: 'file',
                    filename: `logs/${Date.now()}.log`,
                    maxLogSize: 10485760,
                    backups: 2,
                    compress: true
                }
            },
            categories: {
                default: { appenders: ["everything"], level: "info" }
            }
        });
    }

    static #logger = log4js.getLogger('ProfSpoVerifier');

    static log = (text) => {
        console.log(this.#text(text, "LOG"));
        Logger.#logger.log(text);
    }

    static info = (text) => {
        console.info(this.#text(text, "INFO"));
        Logger.#logger.info(text);
    }

    static warn = (text) => {
        console.warn(this.#text(text, "WARN"));
        Logger.#logger.warn(text);
    }

    static error = (text) => {
        console.error(this.#text(text, "ERROR"));
        Logger.#logger.error(text);
    }

    static debug = (text) => {
        console.debug(this.#text(text, "DEBUG"));
        Logger.#logger.debug(text);
    }

    static #text = (text, type) => {
        return `${this.#getTime()} [${type}]  - ${text}`;
    }

    static #getTime = () => {
        const date = new Date();
        return `[${date}]`;
    }
}