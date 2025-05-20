# Pugger

Welcome to the repository for my very specific Pugger tool that allows
me to quickly create static web sites for Github Pages. The tool enables
me to create more consistent HTML without to edit something that
is pretty unreadable. Obviously, I could have used one of the many HTML
editors but it would be hard to keep all pages in all project consistent.

Pugger is basically a nodejs-based command line tool that takes pug
templates that might refer to markdown text and generate all the HTML,
CSS and Javascript files required to view the site.

In my normal workflow, the source for the web pages is stored in the
various projects and a script generates the required files in the top-level
docs folder for use by Github Pages. Both the source and the generated
pages are in the repository so it's easy to keep them synchronized.
I often use a top-level Makefile to execute Pugger with the right parameters.

The name Pugger simply comes from the fact that I want to run the NodeJS
pugjs package from the command line. According to
[Merriam-Webster](https://www.merriam-webster.com/dictionary/pugger),
a pugger is "one that pugs clay (as for pottery or brick)" or
"especially: an operator of a pug mill". The
[Urban Dictionary](https://www.urbandictionary.com/define.php?term=pugger)
defines it as "A term used to describe a person who is a total individual.
They don't care what anyone thinks of them and they do what they please.
Just like a pug". Luckily, neither of these definitions are offensive
and I hope the "puggers" don't mind. For those of you who think I picked
the name Pugger as a reference to the dog, I hate to disappoint as I'm not
a dog person due to severe allergies.

## Installation

The index.js file is executable so I simply create a symbolic link
in my local bin directory:

	ln -s <path-to-directory>/index.js ~/bin/pugger

## Usage

    Usage: pugger [options] [dir|file ...]

    Options:
      -V, --version         output the version number
      -a, --assets          synchronize assets
      -l, --lightbox        add lightbox assets
      -m, --media           add media (audio/video) assets
      -o, --out <dir>       output the rendered HTML to <dir> (default: ".")
      -h, --help            display help for command

## Example Usage

Please see the
[Steampunk Desk Lamp](https://github.com/goossens/SteampunkDeskLamp)
project for an example on how to use Pugger.

## Special Thanks

This projects capitalizes on the following Open Source projects:

* NodeJS - https://nodejs.org/
* NPM - https://www.npmjs.com
* jQuery - https://getbootstrap.com
* Bootstrap - https://getbootstrap.com
* Font Awesome - https://fontawesome.com
* Featherlight Lightbox - https://noelboss.github.io/featherlight/
* blueimp Gallery - https://blueimp.github.io/Gallery/
* MediaElement.js - http://www.mediaelementjs.com
* Commander.js - https://github.com/tj/commander.js
* PugJS - https://pugjs.org/
* Markdown parser - https://github.com/markdown-it/markdown-it
* Prettier - https://github.com/prettier/prettier
* mkdirp - https://github.com/isaacs/node-mkdirp

Thanks to these communities, Pugger was written in a few hours.

## License

Copyright (c) 2020-2025 Johan A. Goossens. All rights reserved.

This work is licensed under the terms of the MIT license.
For a copy, see <https://opensource.org/licenses/MIT>.
