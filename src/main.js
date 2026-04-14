import Authorization from "./Authorization.js";
import Logger from "./Logger.js";
import Ping from "./Ping.js";
import Resources from "./Resources.js";
import Verifier from "./Verifier.js";

const email = Resources.AUTHORIZATION_EMAIL;
const password = Resources.AUTHORIZATION_PASSWORD;


const logTraceActions = [() => {}, trace => Logger.error(trace)];
const logTrace = logTraceActions[+Resources.DO_TRACE_LOGGING];

const main = async () => {
    Logger.log(`ProfSpoVerifier has been started`);
    const verifier = new Verifier();
    if (Resources.IS_PING_ACTIVE === true) {
        const ping = new Ping(sessionId, Resources.PING_INTERVAL);
        ping.start();
    }
    const authorization = new Authorization();
    await authorization.login(email, password, sessionId);
    await verifier.verifiAll();
}

try {
    main();
} catch (error) {
    Logger.error(error);
    logTrace(error.stack);
}

