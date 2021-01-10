#!/usr/bin/env node
'use strict';

const fs = require('fs');
const {promisify} = require('util');
const readline = require('readline');

import {MatchTally} from '../src/MatchTally';

if (process.argv.length > 2) {
    // read and parse 1 (or more) file(s)
    const readFileP = promisify(fs.readFile);
    const promises:Array<typeof Promise> = [];
    for (let offset:number = 2; offset < process.argv.length; offset++) {
        promises.push(readFileP(process.argv[offset], 'utf8'));
    }
    Promise.all(promises)
        .then((allData):void => {
            allData.forEach((data) => {
                const mt:MatchTally = new MatchTally();
                const input:string[] = String(data).split('\n');
                input.forEach((match:string) => {
                    if (match.length) {  // there may be blank lines
                        mt.parseInput(match);
                    }
                });
                const results:string[] = mt.results();
                results.forEach((standing:string) => {
                    console.log(standing);
                });
                console.log();
            });
        })
        .catch((err:Error) => {
            console.error(err.message);
        });
}
else {
    // no files given.  Read from stdin
    const mt:MatchTally = new MatchTally();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.setPrompt(' > ');
    rl.prompt();
    rl.on('line', (data:string) => {
        if (data.length) {
            try {
                mt.parseInput(data);
            }
            catch (err) {
                console.error(err.message);
            };
        }
        rl.prompt();
    });

    rl.on('close', () => {
        rl.setPrompt('\n');
        rl.prompt();
        
        const results:string[] = mt.results();
        results.forEach((standing) => {
            console.log(standing);
        });
        process.exit(0);  // All done exit
    });
}
