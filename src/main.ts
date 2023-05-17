import kleur from "kleur";
import { loggerFunctionFactory, errorLoggerFunctionFactory } from "./factory.js";
import type { LoggerType } from "./types.js";

const logger: LoggerType = {
	info: loggerFunctionFactory({ fullname: "info", color: kleur.cyan }),
	debug: loggerFunctionFactory({ fullname: "debug", color: kleur.blue }),
	warn: loggerFunctionFactory({ fullname: "warn", color: kleur.yellow }),
	fatal: loggerFunctionFactory({ fullname: "fatal", color: kleur.magenta }),

	error: errorLoggerFunctionFactory({ fullname: "error", color: kleur.red }),
};

export default logger;

