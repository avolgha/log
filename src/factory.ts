import formatObjects from "./formatObjects.js";
import parsePrefix from "./parsePrefix.js";
import parseTimestamp from "./parseTimestamp.js";
import { LogLevel, LoggerFunction } from "./types.js";

export function loggerFunctionFactory(level: LogLevel): LoggerFunction {
	return (message, objects = {}, options = {}) => {
		const timestamp = parseTimestamp(options);
		const prefix    = parsePrefix(level);
		const formatted = formatObjects(objects);

		process.stdout.write(`${timestamp} ${prefix} ${message}${formatted}\n`);
	};
}
