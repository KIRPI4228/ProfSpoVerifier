import axios from "axios";
import { JSDOM } from "jsdom";

export default class Parser {
    #sessionId;
    #defaultHeaders;

    constructor(sessionId) {
        this.#sessionId = sessionId;
        this.#defaultHeaders = {
            'Cookie': `laravel_session=${this.#sessionId};`
        };
    }

    getHtml(url) {
        return new Html(new JSDOM(this.requestGet(url)).window.document);
    }

    requestGet(url) {
        return axios.get(url, { headers: this.#defaultHeaders });
    }
}

export class Html {
    #dom;
    constructor(dom) {
        this.#dom = dom;
    }

    #getItems(parse, isArray = true) {
        const arrayComposer = [elements => elements, elements => Array.from(elements).map(element => new Html(element))];

        const elements = parse(dom);
        return arrayComposer[isArray](elements);
    }

    getItemsById(id, isArray = true) {
        return this.#getItems(() => this.#dom.getElementById(id), isArray);
    }

    getItemsByClassName(className, isArray = true) {
        return this.#getItems(() => this.#dom.getElementsByClassName(className), isArray);
    }

    getItemsByQuery(selector, isArray = true) {
        return this.#getItems(() => this.#dom.querySelectorAll(selector), isArray);
    }

    getElement() {
        return this.#dom;
    }
}