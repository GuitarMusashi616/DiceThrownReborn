// @ts-check

const Console = require("./Console.js")
const game = new Console();
const readline = require('readline');

var rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

function waitForUserInput() {
  rl.question("Command: ", function(answer) {
    if (answer === "exit" || answer === "q" || answer === "quit" || answer === ""){
        rl.close();
    } else {
        game.handle(answer);
        console.log();
        waitForUserInput();
    }
  });
}

waitForUserInput();

