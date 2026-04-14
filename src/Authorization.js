import Resources from "./Resources.js"
import Logger from "./Logger.js";
import Randomstring from "randomstring";
import Parser from "./parser/Parser.js";

const loginUrl = Resources.POST_LOGIN_URL;

export default class Authorization {
    static _instance;
    static getInstance = () => this._instance;


    #couldNotLoginException = (email, password, response) => `Could not login with [email - ${email}, password - ${password}]  { status: ${response.status}}  `

    constructor () {
        Logger.log(`Initialing Authorization service`);
        if (Authorization._instance === undefined) {
            Authorization._instance = this;
        } else {
            throw Resources.CREATE_SECOND_SINGLETON_ERROR;
        }
        Logger.log(`Authorization service has been initialized successfully`);
    }

    login = async (email, password) => {
        Logger.log(`Loggin in profspo`);
        const response = await Parser.getInstance().requestPost(loginUrl, {
            '_token': Randomstring.generate(40),
            'email': email,
            'password': password,
            'remember': "exact"
        }, {
            XRequestedWith: 'XMLHttpRequest'
        });


        if (response.status !== 200 || response.data.auth === false) {
            throw this.#couldNotLoginException(email, password, response);
        }

        Logger.log(`Successfully logged in`);
    }

}