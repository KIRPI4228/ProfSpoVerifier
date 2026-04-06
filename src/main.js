import Logger from "./Logger.js";
import Ping from "./Ping.js";
import Resources from "./Resources.js";
import Verifier from "./Verifier.js";


const sessionId = Resources.SESSION_ID;


const main = () => {
    Logger.log(`ProfSpoVerifier has been started`);
    const verifier = new Verifier(sessionId);
    verifier.verifiAll();
    const ping = new Ping(sessionId, 1);
    ping.ping();
}


try {
    main();
} catch (error) {
    Logger.error(error);
}

