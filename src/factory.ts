import kleur from "kleur";
import { buildStackTrace } from "./error.js";
import formatObjects from "./formatObjects.js";
import parsePrefix from "./parsePrefix.js";
import parseTimestamp from "./parseTimestamp.js";
import { LogLevel, LoggerFunction, ErrorLoggerFunction } from "./types.js";

export function loggerFunctionFactory(level: LogLevel): LoggerFunction {
	return (message, objects = {}, options = {}) => {
		const timestamp = parseTimestamp(options);
		const prefix    = parsePrefix(level);
		const formatted = formatObjects(objects);

		process.stdout.write(`${timestamp} ${prefix} ${message}${formatted}\n`);
	};
}

export function errorLoggerFunctionFactory(level: LogLevel): ErrorLoggerFunction {
	const buildString_file = (file: string) => file.length < 1 ? "" : ` ${kleur.gray(`(${file})`)}`;
	const buildString = (error: Error) => buildStackTrace(error)
		.map((stack) => `\n\t${kleur.gray("at")} ${stack.call}${buildString_file(stack.file)} (${kleur.red(stack.line)}:${kleur.green(stack.index)})`)
		.join("");

	return (error, options = {}) => {
		const timestamp = parseTimestamp(options);
		const prefix    = parsePrefix(level);

		process.stdout.write(`${timestamp} ${prefix} [${error.name}]: ${error.message}${buildString(error)}`);
	};
}
