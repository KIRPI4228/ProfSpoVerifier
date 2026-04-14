import axios from "axios";
import Logger from "../Logger.js";
import { JSDOM } from "jsdom";
import { CookieJar } from "./Cookie.js";

export default class Parser {
    static #instance;
    static getInstance = () => this.#instance;

    #cookies = new CookieJar();

    constructor() {
        Logger.log(`Initialing Parser service`);
        Parser.#instance = this;
        Logger.log(`Parser service has been initialized successfully`);
    }

    getHtml = async (url) => {
        Logger.log(`Getting html with url - ${url}`);
        return new Html(new JSDOM(await this.requestGet(url)).window.document);
    }

    requestGet = async (url, body, headers) => {
        Logger.log(`Making get request to url - ${url}`);
        return await this.#request(async (url, body, headers) => await axios.get(url, {headers: headers}), url, body, headers);
    }

    requestPost = async (url, body, headers) => {
        Logger.log(`Making post request to url - ${url}`);
        return await this.#request(async (url, body, headers) => await axios.post(url, body, {headers: headers}), url, body, headers);
    }

    #request = async (method, url, body, headers) => {
        const response = await await method(url, body, {
            'Cookie': this.#cookies.getAllCookiesText(),
            'X-Requested-With': (headers ?? {XRequestedWith: ""}).XRequestedWith
        });

        this.#cookies.refresh(CookieJar.parseSetCookie(response.headers['set-cookie']));

        return response;
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