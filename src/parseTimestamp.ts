import { LoggerFunctionOptions } from "./types.js";

export default function parseTimestamp(options: LoggerFunctionOptions | undefined): string {
	if (options === undefined || options.timestamp === undefined) {
		const date = new Date();
		return `${date.getHours()}:${date.getMinutes()}`;
	}

	const { timestamp } = options;

	if (typeof timestamp === "string") {
		return timestamp;
	} else if (timestamp instanceof Date) {
		return `${timestamp.getHours()}:${timestamp.getMinutes()}`;
	} else {
		throw "Timestamp option in Logger has to be a Date or a string.";
	}
}
