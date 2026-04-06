export default class Logger {
    static log = (text) => {
        console.log(this.#text(text));
    }

    static info = (text) => {
        console.info(this.#text(text));
    }

    static warn = (text) => {
        console.warn(this.#text(text));
    }

    static error = (text) => {
        console.error(this.#text(text));
    }

    static debug = (text) => {
        console.debug(this.#text(text));
    }

    static #text = (text) => {
        return `${this.#getTime()} - ${text}`;
    }

    static #getTime = () => {
        const date = new Date();
        return `[${date}]`;
    }
}