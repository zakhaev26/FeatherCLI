import React, {useState, useEffect} from 'react';
import {Text, render} from 'ink';
import {readFileSync} from 'fs';
import {useInput} from 'ink';
import {exit} from 'process';
import chalk from 'chalk';
import figlet from 'figlet';

var phrases = null;
try {
	const data = readFileSync('../data/para.json', 'utf8');
	const jsonData = JSON.parse(data);
	phrases = jsonData.map(item => item.para);
} catch (error) {
	console.error('Error reading JSON file:', error);
}

const getPhrase = () => {
	return phrases[Math.floor(Math.random() * phrases.length)];
};

const OfflineGame = () => {
	const [text, setText] = useState('');
	const [quote, setQuote] = useState('');
	const [wpm, setWpm] = useState(0);
	const [startTime, setStartTime] = useState(null);
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		figlet('hawk - CLI', function (err, data) {
			if (err) {
				console.log('Something went wrong...');
				console.dir(err);
				return;
			}
			console.log(chalk.red(data));
		});
		setQuote(getPhrase());
		setStartTime(Date.now());
	}, []);

	useEffect(() => {
		// Update elapsed time every second
		const interval = setInterval(() => {
			setElapsedTime((Date.now() - startTime) / 1000);
		}, 1000);

		// Clear interval on component unmount
		return () => clearInterval(interval);
	}, [startTime]);

	const updateWPM = () => {
		if (text === '') {
			setWpm(0);
			return;
		}
		const words = text.split(' ');
		if (words.length === 0) {
			setWpm(0);
			return;
		}
		const minutes = elapsedTime / 60;
		const wpm = (words.length / minutes).toFixed(2);
		setWpm(wpm);
	};

	//Updating the color of the text
	const color = (quote, stringTyped) => {
		let colouredString = '';
		let wrongInput = false;

		const quoteLetters = quote.split('');
		const typedLetters = stringTyped.split('');
		for (let i = 0; i < typedLetters.length; i++) {
			if (wrongInput) {
				colouredString += chalk.bgRed(quoteLetters[i]);
				continue;
			}

			if (typedLetters[i] === quoteLetters[i]) {
				wrongInput = false;
				colouredString += chalk.bgGreen(quoteLetters[i]);
			} else {
				wrongInput = true;
				colouredString += chalk.bgRed(quoteLetters[i]);
			}
		}
		return colouredString;
	};

	//Handling the updated text color
	const updateColor = (quote, text) => {
		let updatedString = color(quote, text);
		updatedString += quote.slice(text.length, quote.length);
		return updatedString;
	};

	const handleInput = () => {
		let colouredString = '';
		const quoteCharacters = quote.split('');
		const textCharacters = text.split('');

		for (let i = 0; i < textCharacters.length; i++) {
			if (textCharacters[i] !== quoteCharacters[i]) {
				colouredString += chalk.red(textCharacters[i]);
			} else {
				colouredString += chalk.green(textCharacters[i]);
			}
		}

		useInput((input, key) => {
			if (key.backspace) {
				setText(prevText => prevText.slice(0, -1));
				updateWPM();
			} else if (key.return) {
				exit();
			} else if (text.length >= quote.length && text !== quote) {
				setText(prevText => prevText);
			} else if (text === quote) {
				exit();
			} else {
				setText(prevText => prevText + input);
				updateWPM();
			}
		});

		return updateColor(quote, text);
	};
	const displayText = handleInput();

	return (
		<>
			<Text>{displayText}</Text>
			<Text color="yellow">WPM: {chalk.blue(wpm)}</Text>
			<Text color="yellow">Time: {chalk.blue(Math.floor(elapsedTime))}s</Text>
		</>
	);
};

export default OfflineGame;
