const {MatchTally} = require('../src/MatchTally.js');

describe('MatchTally Tests', () => {
    test('Can Construct', () => {
        const mt = new MatchTally();
    });
    
    test('parseInput invalid types', () => {
        const mt = new MatchTally();
        expect(() => mt.parseInput()).toThrow();
        expect(() => mt.parseInput(null)).toThrow();
        expect(() => mt.parseInput(undefined)).toThrow();
        expect(() => mt.parseInput({})).toThrow();
        expect(() => mt.parseInput([])).toThrow();
        expect(() => mt.parseInput(1)).toThrow();
    });

    test('parseInput string values', () => {
        const mt = new MatchTally();
        expect(() => mt.parseInput('')).toThrow();  // No comma separator
        expect(() => mt.parseInput('apple, pie')).toThrow();  // no scores
        expect(() => mt.parseInput('apple 1, pie')).toThrow();  // no scores
        expect(() => mt.parseInput('apple, pie 2')).toThrow();  // no scores
        expect(() => mt.parseInput('apple 1 , pie -1')).toThrow();  // negative scores
        expect(() => mt.parseInput('apple -1 , pie 1')).toThrow();  // negative scores
        expect(() => mt.parseInput('1,2')).toThrow();  // no team names
        expect(() => mt.parseInput('apple 1,2')).toThrow();  // no team names
        expect(() => mt.parseInput('1, pie 2')).toThrow();  // no team names
        expect(() => mt.parseInput('pie 1, pie 2')).toThrow();  // can't play self
    });
   
    test('subparse invalid types', () => {
        const mt = new MatchTally();
        expect(() => mt.subparse()).toThrow();
        expect(() => mt.subparse(null)).toThrow();
        expect(() => mt.subparse(undefined)).toThrow();
        expect(() => mt.subparse({})).toThrow();
        expect(() => mt.subparse([])).toThrow();
        expect(() => mt.subparse(1)).toThrow();
        expect(() => mt.subparse(1)).toThrow();
        expect(() => mt.subparse('1 apple')).toThrow();   // incorrect format
        expect(() => mt.subparse('apple -1')).toThrow();  // Score must be positive
    });
    
    test('subparse valid types', () => {
        const mt = new MatchTally();
        expect(mt.subparse('apple pie 3')).toEqual({name: 'apple pie', score: 3});
        expect(mt.subparse('         apple pie   3')).toEqual({name: 'apple pie', score: 3});
        expect(mt.subparse('0sp 3')).toEqual({name: '0sp', score: 3});
        expect(mt.subparse('1 sp 3')).toEqual({name: '1 sp', score: 3});
        expect(mt.subparse('2  sp 3')).toEqual({name: '2  sp', score: 3});
        expect(mt.subparse('3   sp 3')).toEqual({name: '3   sp', score: 3});
    });
    
    test('parseInput valid input strings', () => {
        const mt = new MatchTally();
        mt.parseInput('apple pie 3, french fries      3');
        mt.parseInput('french fries 2    , dog 3           ');
        mt.parseInput('dog 3, apple pie 1');
        mt.parseInput('frog 2, apple pie 3');
        mt.parseInput('            frog 2,              french fries 3');
        mt.parseInput('frog 2, dog 0');
        expect(mt.teams.size).toBe(4);
        expect(mt.teams.get('french fries')).toBeDefined();
        expect(mt.teams.get('apple pie')).toBeDefined();
        expect(mt.teams.get('frog')).toBeDefined();
        expect(mt.teams.get('dog')).toBeDefined();
        const results = mt.results();
        ['1. dog 6',
         '2. apple pie 4',
         '2. french fries 4',
         '4. frog 3'].forEach((standing, idx) => {
             expect(results[idx]).toBe(standing);
         });
    });
    
    test('calculate results (all ties)', () => {
        const mt = new MatchTally();
        mt.parseInput('one 0, two 0');
        mt.parseInput('one 2, three 2');
        mt.parseInput('two 3, three 3');
        const results = mt.results();
        ['1. one 2', '1. three 2', '1. two 2'].forEach((standing, idx) => {
            expect(results[idx]).toBe(standing);
        });
    });
});
