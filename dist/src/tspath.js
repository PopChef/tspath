#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let chalk = require("chalk");
const log = console.log;
const parser_engine_1 = require("./parser-engine");
const parent_file_finder_1 = require("./parent-file-finder");
const type_definitions_1 = require("./type-definitions");
const pkg = require('../package.json');
class TSPath {
    constructor() {
        this.engine = new parser_engine_1.ParserEngine();
        log(chalk.yellow("TSPath " + pkg.version));
        let args = process.argv.slice(2);
        let projectPath = process.cwd();
        let findResult = parent_file_finder_1.ParentFileFinder.findFile(projectPath, type_definitions_1.TS_CONFIG);
        let scope = this;
        if (findResult.fileFound) {
            scope.processPath(findResult.path);
        }
        else {
            log(chalk.bold("No project root found!"));
        }
    }
    processPath(projectPath) {
        if (this.engine.setProjectPath(projectPath)) {
            this.engine.execute();
        }
    }
}
exports.TSPath = TSPath;
let tspath = new TSPath();
