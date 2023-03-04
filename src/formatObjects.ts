import kleur from "kleur";

export default function formatObjects(objects: Record<string, unknown> = {}): string {
	const keys = Object.keys(objects);
	if (keys.length < 1) {
		return "";
	}

	return keys.map((key) => ({
		key,
		value: objects[key],
	})).map(({ key, value }) => {
		let builder = ` ${kleur.gray(key + "=")}`;
		if (value === undefined) {
			builder += kleur.red("undefined");
		} else if (typeof value === "string") {
			builder += kleur.gray(`"${value}"`);
		} else if (typeof value === "number") {
			builder += kleur.gray(value);
		} else if (typeof value === "boolean") {
			builder += kleur[value === true ? "green" : "red"](value + "");
		} else if (typeof value === "symbol") {
			builder += kleur.gray(`Symbol{${value.description}}`);
		} else if (typeof value === "bigint") {
			builder += kleur.gray(`BigInt{${value.toString()}}`);
		} else if (typeof value === "function") {
			builder += kleur.gray(`Function{${value.name}}`);
		} else if (Array.isArray(value)) {
			builder += kleur.gray(`Array{${value.length}}`);
		} else {
			builder += kleur.gray("Object{}");
		}
		return builder;
	}).join("");
}
