/** @type {import('prettier').Options} */
const config = {
	useTabs: true,
	printWidth: 100,
	semi: false,
	trailingComma: "all",
	overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
	plugins: ["prettier-plugin-svelte", "@ianvs/prettier-plugin-sort-imports"],
	importOrder: [
		"^(svelte/(.*)$)|^(svelte$)",
		"^(@sveltejs/(.*)$)|^(@sveltejs/kit$)",
		"<THIRD_PARTY_MODULES>",
		"^$lib/(.*)$",
		"^[./]",
	],
	importOrderSeparation: true,
}

export default config
