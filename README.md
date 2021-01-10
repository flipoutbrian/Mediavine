# Mediavine coding challenge
This repo represents a coding challenge issued by mediavine.com.
The challenge is described in [description.txt](https://www.notion.so/Soccer-Rank-Calculator-851109ed5c7f489792617b8fe9498c40)

## Setup
This application has been developed and tested on version *v12.16.3*.  
Setup is rather minimal but still there are a couple of steps:  
 1. **`npm install`**  
 2. **`npm run gen`**  
 
 You can also run **`npm run clean`** to remove the generated files.

At this point the typescript files should have generated javascript files and tally-er.js should have execute priviledges.  Verify with **`ls -l src`** which should produce output similar to:

    total 16
    -rw-rw-r--. 1 brian brian 3709 Jan 10 07:06 MatchTally.js
    -rw-r--r--. 1 brian brian 3617 Jan 10 06:57 MatchTally.ts
    -rwxrwxr-x. 1 brian brian 1803 Jan 10 07:06 tally-er.js
    -rw-r--r--. 1 brian brian 1892 Jan 10 07:00 tally-er.ts

There should be 2 .ts files and 2 .js files. `tally-er.js` should have execution privileges.

## Tests
There is a small test suite that can be run from the command line. **`npm test`** will run the unit tests, which consists of 1 suite and 7 tests.  All should complete successfully.  If not there may be a problem with the install.

## Running the Application
The application can be run from **stdin** or from reading a **file**.  
Whether the data is coming from a **file** or from **stdin** each line must be formatted properly, as follows: ***<team-name> < score>, <team-name> < score>***.  Where team name is a **string** and score is a **non negative integer**.

### Reading a file
by simply passing one or more properly formatted files on the command line they will be passed and tallied.  (i.e., **`./src/tally-er.js Examples/input.txt [Examples/input.txt ...]`**)

### Reading from stdin
There are several ways to read from stdin.  
 1. **`cat Examples.input.txt | ./src/tally-er.js`**  
 2. **`./src/tally-er.js < Examples/input.txt`**  
 3. **`./src/tally-er.js`**  
 
For options **1** and **2** the application will ingest the file produce the output and exit.  Option **3** will enter into interactive mode and will continue accepting properly formatted lines until **`Ctrl-D`** is entered, at which point the results are calculated and displayed and the application is terminated.
