import axios from "axios";
import Logger from "../Logger.js";
import { JSDOM } from "jsdom";

export default class Parser {
    #sessionId;
    #defaultHeaders;

    constructor(sessionId) {
        Logger.log(`Initialing Parser service`);
        this.#sessionId = sessionId;
        this.#defaultHeaders = {
            'Cookie': `laravel_session=${this.#sessionId};`
        };
        Logger.log(`Parser service has been initialized successfully with session id - ${this.#sessionId}`);
    }

    getHtml = async (url) => {
        Logger.log(`Getting html with url - ${url}`);
        return new Html(new JSDOM(await this.requestGet(url)).window.document);
    }

    requestGet = async (url) => {
        Logger.log(`Making get request to url - ${url}`);
        return (await axios.get(url, { headers: this.#defaultHeaders })).data;
    }
}

export class Html {
    #dom;
    constructor(dom) {
        this.#dom = dom;
    }

    #getItems = (elements) => {
        return Array.from(elements).map(element => new Html(element));
    }

    getItemsById = (id) => {
        return this.#getItems(this.#dom.getElementById(id));
    }

    getItemsByClassName = (className) => {
        return this.#getItems(this.#dom.getElementsByClassName(className));
    }

    getItemsByQuery = (selector) => {
        return this.#getItems(this.#dom.querySelectorAll(selector));
    }

    getElement = () => {
        return this.#dom;
    }
}