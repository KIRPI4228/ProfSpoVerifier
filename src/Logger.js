export default class Logger {

    static log = (text) => {
        console.log(this.#text(text, "LOG"));
    }

    static info = (text) => {
        console.info(this.#text(text, "INFO"));
    }

    static warn = (text) => {
        console.warn(this.#text(text, "WARN"));
    }

    static error = (text) => {
        console.error(this.#text(text, "ERROR"));
    }

    static debug = (text) => {
        console.debug(this.#text(text, "DEBUG"));
    }

    static #text = (text, type) => {
        return `${this.#getTime()} [${type}]  - ${text}`;
    }

    static #getTime = () => {
        const date = new Date();
        return `[${date}]`;
    }
}