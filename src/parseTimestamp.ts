import { LoggerFunctionOptions } from "./types.js";

export default function parseTimestamp(options: LoggerFunctionOptions | undefined): string {
	const parseMinutes = (date: Date) => String(date.getMinutes()).padStart(2, "0");

	if (options === undefined || options.timestamp === undefined) {
		const date = new Date();
		return `${date.getHours()}:${parseMinutes(date)}`;
	}

	const { timestamp } = options;

	if (typeof timestamp === "string") {
		return timestamp;
	} else if (timestamp instanceof Date) {
		return `${timestamp.getHours()}:${parseMinutes(timestamp)}`;
	} else {
		throw "Timestamp option in Logger has to be a Date or a string.";
	}
}
