const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const DIST = "dist";

const LAYOUT = (title, content) => `<!DOCTYPE html>
<html>
<head>
	<title>${title}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
	<style type="text/css">
	body {
		color: #444;
		line-height: 1.6;
		font-size: 18px;
		margin: 40px auto;
		max-width: 650px;
		padding: 0 10px;
	}
	h1, h2, h3 { line-height: 1.2; }
	a { color: #4183c4; }
	code {
		background: #f4f4f4;
		padding: 2px 6px;
		border-radius: 3px;
		font-size: 0.9em;
	}
	pre code {
		display: block;
		padding: 12px;
		overflow-x: auto;
	}
	blockquote {
		border-left: 3px solid #ccc;
		margin-left: 0;
		padding-left: 1em;
		color: #666;
	}
	footer, footer a {
		color: #999;
		font-size: x-small;
		margin-top: 4em;
		text-align: center;
		text-decoration: none;
	}
	footer a:hover { text-decoration: underline; }
	</style>
</head>
<body>
	<article>
		${content}
	</article>
	<footer>
		<a href="/">Jerome @ Leclanche</a>
	</footer>
</body>
</html>`;

function parseFrontmatter(src) {
	const match = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { attrs: {}, body: src };
	const attrs = {};
	for (const line of match[1].split("\n")) {
		const m = line.match(/^(\w+):\s*"?([^"]*)"?$/);
		if (m) attrs[m[1]] = m[2];
	}
	return { attrs, body: match[2] };
}

function copyRecursive(src, dest) {
	const stat = fs.statSync(src);
	if (stat.isDirectory()) {
		fs.mkdirSync(dest, { recursive: true });
		for (const child of fs.readdirSync(src)) {
			copyRecursive(path.join(src, child), path.join(dest, child));
		}
	} else {
		fs.copyFileSync(src, dest);
	}
}

// Clean and create dist
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// Static files to copy as-is
const staticFiles = [
	"index.html",
	"avatar-512.png",
	"avatar.png",
	"favicon.ico",
	"europass.pdf",
	"pubkey.asc.txt",
	"keybase.txt",
	"humans.txt",
	"google009c5da7c313b60e.html",
];

for (const file of staticFiles) {
	if (fs.existsSync(file)) {
		fs.copyFileSync(file, path.join(DIST, file));
	}
}

// Copy static directory
if (fs.existsSync("static")) {
	copyRecursive("static", path.join(DIST, "static"));
}

// Copy .well-known if it exists
if (fs.existsSync(".well-known")) {
	copyRecursive(".well-known", path.join(DIST, ".well-known"));
}

// Markdown pages with frontmatter
const pages = [
	"guido.md",
	"tabs.md",
	"heroic-brawl.md",
	"password-managers.md",
	"posts/re-things-i-dont-know.md",
	"posts/on-learning-languages.md",
];

for (const file of pages) {
	if (!fs.existsSync(file)) continue;
	const src = fs.readFileSync(file, "utf-8");
	const { attrs, body } = parseFrontmatter(src);

	// Replace Jekyll template variables
	let content = body;
	for (const [key, value] of Object.entries(attrs)) {
		content = content.replaceAll(`{{ page.${key} }}`, value);
	}

	const html = marked.parse(content);
	const title = html.match(/<h1>(.*?)<\/h1>/)?.[1] || "leclan.ch";

	// Determine output path from permalink or filename
	let permalink = attrs.permalink;
	if (!permalink) {
		const name = path.basename(file, ".md");
		permalink = `/${path.dirname(file)}/${name}/`;
	}
	// Ensure it ends with /
	if (!permalink.endsWith("/")) permalink += "/";

	const outDir = path.join(DIST, permalink);
	fs.mkdirSync(outDir, { recursive: true });
	fs.writeFileSync(path.join(outDir, "index.html"), LAYOUT(title, html));

	console.log(`${file} -> ${permalink}`);
}

console.log("Build complete.");
