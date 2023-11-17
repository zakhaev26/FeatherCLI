#!/usr/bin/env node

import readline from "readline";
import texts from "./text.json" assert { type: "json" };
import chalk from "chalk";
import figlet from "figlet";

function randomText() {
  const random = 0;
  return texts[random].text;
}

async function typeracer() {
  const displayText = await randomText();
  await figlet("Hawk-CLI", (err, data) => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });

  console.log(chalk.blue(displayText));
  const words = displayText.split(" ").length + 1;

  const start = new Date().getTime();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.red("Type the text above and press enter: \n"), () => {
    const end = new Date().getTime();
    const time = end - start;
    const speed = (words * 60 * 1000) / time;
    const wpm = Math.round(speed);
    console.log(`You typed ${wpm} words per minute!`);
    rl.close();
  });
}

typeracer();
