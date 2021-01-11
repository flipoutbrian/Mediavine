#!/usr/bin/env node
'use strict';
exports.__esModule = true;
var fs = require('fs');
var promisify = require('util').promisify;
var readline = require('readline');
var MatchTally_1 = require("../src/MatchTally");
if (process.argv.length > 2) {
    // read and parse 1 (or more) file(s)
    var readFileP = promisify(fs.readFile);
    var promises = [];
    for (var offset = 2; offset < process.argv.length; offset++) {
        promises.push(readFileP(process.argv[offset], 'utf8'));
    }
    Promise.all(promises)
        .then(function (allData) {
        allData.forEach(function (data) {
            var mt = new MatchTally_1.MatchTally();
            var input = String(data).split('\n');
            input.forEach(function (match) {
                if (match.length) { // there may be blank lines
                    mt.parseInput(match);
                }
            });
            var results = mt.results();
            results.forEach(function (standing) {
                console.log(standing);
            });
            console.log();
        });
    })["catch"](function (err) {
        console.error(err.message);
    });
}
else {
    // no files given.  Read from stdin
    var mt_1 = new MatchTally_1.MatchTally();
    var rl_1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl_1.setPrompt(' > ');
    rl_1.prompt();
    rl_1.on('line', function (data) {
        if (data.length) {
            try {
                mt_1.parseInput(data);
            }
            catch (err) {
                console.error(err.message);
            }
            ;
        }
        rl_1.prompt();
    });
    rl_1.on('close', function () {
        rl_1.setPrompt('\n');
        rl_1.prompt();
        var results = mt_1.results();
        results.forEach(function (standing) {
            console.log(standing);
        });
        process.exit(0); // All done exit
    });
}
