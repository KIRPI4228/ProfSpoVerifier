import Resources from "./Resources.js";
import Verifier from "./Verifier.js";

const verifier = new Verifier(Resources.SESSION_ID);

verifier.verifiAll();