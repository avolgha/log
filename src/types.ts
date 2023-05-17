import kleur from "kleur";

export interface LoggerFunctionOptions {
	timestamp?: Date | string;
}

export type LoggerFunction = (message: string, objects?: Record<string, unknown>, options?: LoggerFunctionOptions) => void;

export type ErrorLoggerFunction = (error: Error, options?: LoggerFunctionOptions) => void;

export interface LoggerType {
	info: LoggerFunction;
	debug: LoggerFunction;
	warn: LoggerFunction;
	fatal: LoggerFunction;

	error: ErrorLoggerFunction;
}

export interface LogLevel {
	fullname: string;
	color: kleur.Color;
}

