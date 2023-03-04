import { LogLevel } from "./types.js";

export default function parsePrefix(level: LogLevel): string {
	const name = level.fullname.substring(0, 4).toUpperCase();
	return level.color(name);
}
