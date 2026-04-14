import Authorization from "./Authorization.js";
import ProfSpoParser from "./parser/ProfSpoParser.js"
import Logger from "./Logger.js";
import Ping from "./Ping.js";
import Resources from "./Resources.js";
import Verifier from "./Verifier.js";

const email = Resources.AUTHORIZATION_EMAIL;
const password = Resources.AUTHORIZATION_PASSWORD;


const logTraceActions = [() => {}, trace => Logger.error(trace)];
const logTrace = logTraceActions[+Resources.DO_TRACE_LOGGING];

const isPingActive = Resources.IS_PING_ACTIVE;

const main = async () => {
    Logger.log(`ProfSpoVerifier has been started`);
    new ProfSpoParser();
    new Authorization();
    new Verifier();
    new Ping();
    await login();
    if (isPingActive) {
        Ping.getInstance().start();
    }
    await Verifier.getInstance().verifyAll();
}

const login = async () => await Authorization.getInstance().login(email, password);

try {
    await main();
} catch (error) {
    if (error.message === Resources.NOT_AUTHORIZED_ERROR) {
        Logger.warn(`Not authorized error occured`);
        await login();
    } else {
        Logger.error(error.message);
        logTrace(error.stack);
    }
}

