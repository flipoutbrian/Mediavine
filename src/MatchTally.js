"use strict";
exports.__esModule = true;
exports.MatchTally = void 0;
var MatchTally = /** @class */ (function () {
    function MatchTally() {
        // Limit the characters that can be considered valid
        this.regex = new RegExp(/^\s*([\'\*@$A-Za-z0-9 _-]+)\s+(\d+)\s*$/);
        this.matches = []; // store the matches for later reference
        this.teams = new Map();
    }
    MatchTally.prototype.clear = function () {
        this.matches = []; // store the matches for later reference
        this.teams = new Map();
    };
    MatchTally.prototype.subparse = function (part) {
        if (typeof part !== 'string') {
            throw new Error('Invalid input format, expecting a string');
        }
        var fields = this.regex.exec(part);
        if (!fields) {
            throw new Error('Invalid input format, expecting <string> <number>');
        }
        var score = parseInt(fields[2], 10);
        if (score < 0) {
            throw new Error('Invalid input format, scores can not be negative');
        }
        return { name: fields[1].trim(), score: score };
    };
    MatchTally.prototype.parseInput = function (input) {
        if (typeof input !== 'string') {
            throw new Error('Invalid input format, expecting a string');
        }
        var plays = input.split(',');
        if (plays.length <= 1) {
            throw new Error('Invalid input format, expecting a comma separator');
        }
        var team1 = this.subparse(plays[0]);
        var team2 = this.subparse(plays[1]);
        if (team1.name == team2.name) {
            throw new Error('Invalid input format, team can not play itself');
        }
        // to be valid an input string must match the above RegEx
        if (!this.teams.has(team1.name)) {
            this.teams.set(team1.name, { team: team1.name, tally: 0, matches: [] });
        }
        if (!this.teams.has(team2.name)) {
            this.teams.set(team2.name, { team: team2.name, tally: 0, matches: [] });
        }
        this.teams.get(team1.name).matches.push(this.matches.length);
        this.teams.get(team2.name).matches.push(this.matches.length);
        var diff = team1.score - team2.score;
        if (diff == 0) {
            this.teams.get(team1.name).tally += 1;
            this.teams.get(team2.name).tally += 1;
        }
        else {
            if (diff > 0) {
                this.teams.get(team1.name).tally += 3;
            }
            else {
                this.teams.get(team2.name).tally += 3;
            }
        }
        this.matches.push([team1, team2]);
    };
    MatchTally.prototype.results = function () {
        // results are to be sorted, primary sort is by tally score, secondary
        // sort is alphabetically
        var values = Array.from(this.teams.values());
        values.sort(function (a, b) {
            if (a.tally < b.tally) {
                return 1;
            }
            else if (a.tally > b.tally) {
                return -1;
            }
            else { // tally results are equal, sort by name
                if (a.team > b.team) {
                    return 1;
                }
                if (a.team < b.team) {
                    return -1;
                }
                else
                    throw new Error('Team can not play itself');
            }
        });
        var ranking = 1;
        var response = [];
        values.forEach(function (obj, idx, container) {
            response.push(ranking + ". " + obj.team + " " + obj.tally);
            if (idx < container.length - 1 &&
                obj.tally != container[idx + 1].tally) {
                ranking = idx + 2;
            }
        });
        return response;
    };
    return MatchTally;
}());
exports.MatchTally = MatchTally;
