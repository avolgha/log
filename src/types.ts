import kleur from "kleur";

export type LoggerFunctionOptions = {
	timestamp?: Date | string;
}

export type LoggerFunction = (message: string, objects: Record<string, unknown>, options?: LoggerFunctionOptions) => void;

export type LoggerType = {
	info: LoggerFunction;
	debug: LoggerFunction;
	warn: LoggerFunction;
	error: LoggerFunction;
	fatal: LoggerFunction;
};

export type LogLevel = {
	fullname: string;
	color: kleur.Color;
}

