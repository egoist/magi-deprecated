<!-- @magi
github: egoist/magi
-->

# magi

[![NPM version](https://img.shields.io/npm/v/magi.svg?style=flat-square)](https://npmjs.com/package/magi) [![NPM downloads](https://img.shields.io/npm/dm/magi.svg?style=flat-square)](https://npmjs.com/package/magi) [![Build Status](https://img.shields.io/circleci/project/egoist/magi/master.svg?style=flat-square)](https://circleci.com/gh/egoist/magi) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat-square)](https://github.com/egoist/donate)

> The simplest way to build website for your OSS project.

## Install

```bash
yarn global add magi
# or npm 
npm i -g magi
```

## Usage

Given `README.md`:

```md
# site name

> site description

## section title

> section description

section body content, **looks not bad huh**.
```

Run `magi` in your terminal, open browser and you'll see:

![p](https://ooo.0o0.ooo/2017/03/03/58b98b9aae6fb.png)

## How does it work?

`# h1` is used as site name, `blockquote` after that will be used as site description, and all other stuffs between `h1` and `h2` will be put in the banner.

Here's another using [developit/unfetch](https://github.com/developit/unfetch) as example:

![p](https://ooo.0o0.ooo/2017/03/03/58b98d446a40d.png)

## Recipes

### Add a GitHub corner ribbon

You can use [html-matter](https://github.com/egoist/html-matter) to set it anywhere in your markdown file, for example, at the top of it:

```markdown
<!-- @magi
github: owner/repo
-->
```

Notice that it should start with `@magi` so that we know we need to parse it, the rest part of it is simple [front-matter syntax used in Jekyll](https://jekyllrb.com/docs/frontmatter/).

## CLI

```bash
# defaults to README.md
# run server to preview
magi [file]

# build html file
magi build [file]
# defaults to output to index.html
# but you can change it
magi build [file] --out docs/index.html
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**magi** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/magi/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
