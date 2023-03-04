import kleur from "kleur";
import { loggerFunctionFactory } from "./factory.js";
import type { LoggerType } from "./types.js";

const logger: LoggerType = {
	info: loggerFunctionFactory({ fullname: "info", color: kleur.cyan }),
	debug: loggerFunctionFactory({ fullname: "debug", color: kleur.blue }),
	warn: loggerFunctionFactory({ fullname: "warn", color: kleur.yellow }),
	error: loggerFunctionFactory({ fullname: "error", color: kleur.red }),
	fatal: loggerFunctionFactory({ fullname: "fatal", color: kleur.magenta }),
};

export default logger;

