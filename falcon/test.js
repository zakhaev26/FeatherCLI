const  inquirer =  ('inquirer');
const keypress = require('keypress');

// Mock data for directory names
const directories = ['codes', 'Desktop', 'Documents', 'Downloads', 'Pictures'];

// Enable reading arrow keys
keypress(process.stdin);

// Initialize the list of directories
const directoryList = directories.map((dir) => ({ name: dir }));

// Configure the prompt
const prompt = inquirer.createPromptModule();
const questions = [
  {
    type: 'list',
    name: 'directory',
    message: 'Select a directory:',
    choices: directoryList,
  },
];

// Run the prompt
const runPrompt = async () => {
  const answers = await prompt(questions);

  // Handle the selected directory
  console.log(`You selected: ${answers.directory}`);

  // Run the prompt again for continuous navigation
  runPrompt();
};

// Start the prompt
console.log('Use arrow keys to navigate. Press Enter to select.');
runPrompt();

// Handle arrow key events
process.stdin.on('keypress', (_, key) => {
  if (key) {
    switch (key.name) {
      case 'up':
        inquirer.ui.bottomArrow();
        break;
      case 'down':
        inquirer.ui.upArrow();
        break;
      case 'return':
        inquirer.ui.close();
        break;
    }
  }
});

// Close the program when Ctrl+C is pressed
process.on('SIGINT', () => {
  process.exit();
});

// Start listening for keypress events
process.stdin.setRawMode(true);
process.stdin.resume();
