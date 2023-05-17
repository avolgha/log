/*
 * DESCRIPTION:
 *
 * this file is here to extract the stack trace of an error
 * and put it in a format that our internal system can handle
 * to process it further.
 */

export type StackTrace = TraceObject[];

export interface TraceObject {
	// the method/function call in which the error was thrown
	call: string;
	// the file of the method/function call
	file: string;

	// x and y position of the method/function call in the file
	line: number;
	index: number;

	// any other attributes like "async"
	attr: string;
}

export interface RawTraceObject {
	string: string;
	attribute: string;
	name: string;
	location: string;
}

export function buildTrace(obj: RawTraceObject): TraceObject {
	const fileRegex = /^(node:)?(file:\/{3})?([a-zA-Z:/_\-.]+):(\d+):(\d+)$/gm;
	let call = "<unknown>",
		file = "",
		line = 0, index = 0;
	const attr = typeof obj.attribute === "string" ? obj.attribute.trim() : "";

	let result: RegExpExecArray | null;
	if (obj.location) {
		const loc = obj.location.trim().replaceAll("(", "").replaceAll(")", "");
		call = obj.name;

		if (!loc.startsWith("index ") && (result = fileRegex.exec(loc)) !== null) {
			const [attributeNode, attributeFile, fileLoc, y, x] = result.slice(1);
			file = `${attributeNode || attributeFile || ""}${fileLoc}`;
			line = parseInt(y);
			index = parseInt(x);
		}
	} else if ((result = fileRegex.exec(obj.name)) !== null) {
		const [attributeFile, fileLoc, y, x] = result.slice(2);
		file = `${attributeFile || ""}${fileLoc}`;
		line = parseInt(y);
		index = parseInt(x);
		call = "<anonymous>";
	}

	return {
		call,
		file,
		line,
		index,
		attr,
	};
}

export function buildStackTrace(error: Error): StackTrace {
	const { stack } = error;
	if (!stack) return[];

	const regex = /^\s+at\s(async\s)?([a-zA-Z0-9.:/]*)(\s\(.*\))?$/gm;
	const trace: StackTrace = [];
	let m;
	while ((m = regex.exec(stack)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}

		const [string, attribute, name, location] = m;
		const obj: RawTraceObject = {
			string,
			attribute,
			name,
			location
		};

		trace.push(buildTrace(obj));
	}

	return trace;
}
