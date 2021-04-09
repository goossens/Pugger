#!/usr/bin/env node

//	Copyright (c) 2020-2021 Johan A. Goossens. All rights reserved.
//
//	This work is licensed under the terms of the MIT license.
//	For a copy, see <https://opensource.org/licenses/MIT>.

const fs = require("fs");
const path = require("path");
const program = require("commander");
const mkdirp = require("mkdirp");
const pug = require("pug");
const prettier = require("prettier");

// setup comannd line parsing
program
	.version(require("pug/package.json").version)
	.usage("[options] [dir|file ...]")
	.option("-a, --assets", "synchronize assets")
	.option("-l, --lightbox", "add lightbox assets")
	.option("-m, --media", "add media (audio/video) assets")
	.option("-o, --out <dir>", "output the rendered HTML to <dir>", ".");

program.parse(process.argv);

// change the extension of a file
function changeExtension(file, extension) {
	const basename = path.basename(file, path.extname(file));
	return path.join(path.dirname(file), basename + extension);
}

// function to render a file
function renderFile(input, output) {
	global.lightbox = program.opts().lightbox;
	global.media = program.opts().media;

	// get the file content
	var raw = fs.readFileSync(input, "utf8");

	// let pug render the html
	var html = pug.render(raw, {
		filename: input,
		basedir: path.join(__dirname, "lib"),
		globals: [
			"lightbox",
			"media"
		]
	});

	// patch html to support classes on markdown images
	html = html.replaceAll(/<img src="class:([a-zA-Z\-0-9:]*):/g, function(match, p1) {
		return "<img class=\"" + p1.replace(":", " ") + "\" src=\"";
	});

	var prettified = prettier.format(html, {
		parser: "html"
	});

	fs.writeFileSync(output, prettified);
}

// walk a directory
function walk(dir, callback) {
	fs.readdir(dir, function(err, files) {
		if (err) {
			throw err;
		}

		files.forEach(function(file) {
			var filepath = path.join(dir, file);

			fs.stat(filepath, function(err,stats) {
				callback(filepath);

				if (stats.isDirectory()) {
					walk(filepath, callback);
				}
			});
		});
	});
}

// copy a directory
function copyDirectory(src, dest) {
	walk(src, function(entry) {
		var stat = fs.lstatSync(entry);

		if (stat.isDirectory()) {
			mkdirp.sync(path.join(dest, entry.substr(src.length + 1)));

		} else {
			fs.copyFileSync(entry, path.join(dest, entry.substr(src.length + 1)));
		}
	});
}

// function to render a directory
function renderDirectory(input, output) {
	// walk all sub-directories and render all pug files
	walk(input, function(entry) {
		var stat = fs.lstatSync(entry);

		if (stat.isDirectory()) {
			mkdirp.sync(path.join(output, entry.substr(input.length + 1)));

		} else if (path.extname(entry) == ".pug") {
			renderFile(entry, changeExtension(path.join(output, entry.substr(input.length + 1)), ".html"));
		}
	});

	// synchronize assets if required
	if (program.opts().assets) {
		copyDirectory(path.join(__dirname, "assets"), output);
	}

	// synchronize lightbox if required
	if (program.opts().lightbox) {
		copyDirectory(path.join(__dirname, "lightbox"), output);
	}

	// synchronize media if required
	if (program.opts().media) {
		copyDirectory(path.join(__dirname, "media"), output);
	}
}

// process each directory/file
program.args.forEach(function(arg) {
	var stat = fs.lstatSync(arg);

	if (stat.isDirectory()) {
		// process a directory
		renderDirectory(arg, program.opts().out);

	} else {
		// process file
		renderFile(file, changeExtension(file, ".html"));
	}
});
