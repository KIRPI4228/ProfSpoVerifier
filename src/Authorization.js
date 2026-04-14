import axios from "axios"
import Resources from "./Resources.js"
import Logger from "./Logger.js";
import Randomstring from "randomstring";
import ProfSpoParser from "./parser/ProfSpoParser.js";

const loginUrl = Resources.POST_LOGIN_URL;

export default class Authorization {
    #couldNotLoginException = (email, password, response) => `Could not login with [email - ${email}, password - ${password}]  { status: ${response.status}}  `


    login = async (email, password) => {
        const parser = new ProfSpoParser();

        Logger.log(`Loggin in profspo`);
        const response = await parser.requestPost(loginUrl, {
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

        return parser;
    }

}