<h2 align="center">md-generator</h2>
<p align="center">
<a href="https://codeclimate.com/github/Oluwasegun-AA/md-generator/maintainability"><img src="https://api.codeclimate.com/v1/badges/2b739eec6ec45004c4cd/maintainability" /></a>
<a href="#contributors"><img src="https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square" alt="Version"></a>
<a href="https://www.npmjs.com/package/md-generator" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/md-generator.svg">
  </a>
</p>
NPM Package which bootstraps Development by creating `ALL` required .md files to meet `community standards`.

## Table of Contents

- [Project Overview](#Project-Overview)
- [Features](#Features)
- [Built With](#Built-With)
- [Demo](#Installation)
- [Known Issues](#Usage)
- [Installation](#Demo)
- [Installation](#Known-Issues)
- [Contributing](#contributing)
- [Contributors](#Contributors)
- [License](#License)

## Project Overview

md-generator was created to reduce the time spent creating .md files while trying to set up projects. Hence, bootstrapping development with `ALL` desired md files in line with proven community standards.
This npm package was inspired by [readme-md-generator](https://www.npmjs.com/package/readme-md-generator) by @kefranabg

## Features

- [x] provides interactive file creation
- [x] provides default templates in all created files (which could be further customized)
- [x] checks if the minimum community standard is met and recommends the minimum required .md files
- [x] provides bulk removal of specified .md files
- [x] provides bulk creation of .md files
- [x] optional `--empty` argument to make created files empty if preferred so
- [x] optional `--required` to `create`/`check`/`list` only all files needed to meet the minimum community standard

## Built With

- [Commander.js](https://github.com/tj/commander.js)
- [EJS](https://ejs.co/)
- [Inquirer](https://www.npmjs.com/package/inquirer)

## Installation

`npm install md-generator` or globally using `npm install -g md-generator`

- you can interact with the package from the npm registry without installing
  using `npx md-generator [command] [options]`

## Usage

install globally using

- npm : npm i -g md-generator
- yarn : yarn add -g md-generator

#### Trigger md-generator using

- md-generator `[parent-options]`
- md-generator `[commands]` `[command-options] [file names]`

#### Parent Options:

|    Option     |         Function          |
| :-----------: | :-----------------------: |
| -V, --version | Output the version number |
|  -h, --help   | Output usage information  |

#### Commands:

|              Command              |                            Function                            |
| :-------------------------------: | :------------------------------------------------------------: |
|  list `[options]` `[File Names]`  |              List All Required/optional .md files              |
| create `[options]` `[File Names]` |                   Create All/specific files                    |
| check `[options]` `[File Names]`  | Checks codebase for the availability of All/Specific .md files |
| remove `[options]` `[File Names]` |                 Remove All/specific .md files                  |

#### Command-Options :

| Command Option |                  Function                  |
| :------------: | :----------------------------------------: |
|   -A, --all    | Operate on all required/optional .md files |
|   -F, --file   |       Operate on specific .md files        |
|  -E, --empty   |           make added files empty           |
| -R --required  |         Operate on required files          |
| -O --optional  |         Operate on optional files          |

> Note:

- `File Names` can be with/without the file extension
- multiples `File Names` should be separated with spaces ie `--file "README.md CONTRIBUTING.md"`.

## Demo

loading . . .

## Known issues

No known [issues](https://github.com/Oluwasegun-AA/md-generator/issues) at the moment. However, [issues](https://github.com/Oluwasegun-AA/md-generator/issues) can be raised when such is noticed

## Contributing

> Feel free to contribute and kindly go through the Pull Request guide, and contributing.md file
> 👯 Clone the repository using https://github.com/Oluwasegun-AA/md-generator.git
> Make Contributions

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/Oluwasegun-AA"><img src="https://avatars0.githubusercontent.com/u/25525765?v=4" width="100px;" alt="Adépòjù Olúwáségun"/><br /><sub><b>Adépòjù Olúwáségun</b></sub></a><br /><a href="https://github.com/Adépòjù Olúwáségun/md-generator/commits?author=Oluwasegun-AA" title="Code">💻</a> <a href="https://github.com/Adépòjù Olúwáségun/md-generator/commits?author=Oluwasegun-AA" title="Documentation">📖</a> <a href="#maintenance-Oluwasegun-AA" title="Maintenance">🚧</a> <a href="https://github.com/Adépòjù Olúwáségun/md-generator/commits?author=Oluwasegun-AA" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

## License

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

- **[MIT license]()**
- With ❤️ from <a href="https://twitter.com/Oluwasegun_AA" target="_blank">Olúwáségun</a>
