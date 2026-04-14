export class CookieJar {

    static parseSetCookie = rawSetCookie => {
        let cookiesText = "";
        rawSetCookie.map(cookieText => cookieText.split(";")[0]).forEach(cookieText => cookiesText += cookieText + ";");
        return this.parse(cookiesText);
    }

    static parse = rawText => {
        const text = decodeURIComponent(rawText);
        const splitItems = text.split(";");
        const cookies = splitItems.map(item => item.length <= 1 ? undefined : Cookie.parse(item)).filter(item => item !== undefined);
        return new CookieJar(cookies);
    }


    #cookies = [];

    constructor(cookies) {
        this.#cookies = cookies ?? [];
    }

    refresh = cookieJar => {
        cookieJar.#cookies.forEach(cookie => this.createCookie(cookie));
    }

    createCookie = cookie => {
        const name = cookie.getName();
        const existingCookie = this.getCookie(name);
        if (existingCookie !== undefined) {
            existingCookie.setValue(cookie.getValue());
        } else {
            this.#cookies.push(cookie);
        }
    }

    getCookie = name => this.#cookies.filter(cookie => cookie.getName() === name)[0];

    getAllCookiesText = () => {
        let allCookiesText = "";

        this.#cookies.forEach((cookie, index) => allCookiesText += `${cookie.getName()}=${cookie.getValue()}${index === this.#cookies.length-1 ? "" : "; "}`);

        return allCookiesText;
    }
}

export class Cookie {

    static parse = text => {
        const slicingIndex = text.indexOf("=");
        const name = text.slice(0, slicingIndex).replaceAll(" ", "");
        const value = text.slice(slicingIndex + 1, text.length);

        if (name === undefined || name.length <= 0 || value === undefined || value.length <= 0) {
            throw `Cookie parse error: Cookie name or value cannot be empty {Cookie raw = ${text}}`;
        }

        return new Cookie(name, value);
    }


    #name;
    #value;

    constructor(name, value) {
        this.#name = name;
        this.#value = value;
    }

    getValue = () => this.#value;
    getName = () => this.#name;

    setValue = value => this.#value = value;
}