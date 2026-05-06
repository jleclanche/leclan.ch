import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://leclan.ch",
	trailingSlash: "always",
	build: { format: "directory" },
});
