import React, {useState, useEffect} from 'react';
import {Text, render} from 'ink';
import {readFileSync} from 'fs';
import {useInput} from 'ink';
import {exit} from 'process';
import chalk from 'chalk';

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

export default function OfflineGame() {
	let wrongInput = false;
	const [text, setText] = useState('');
	const [quote, setQuote] = useState('');
	useEffect(() => {
		setQuote(getPhrase());
	}, []);

	//Updating the color of the text
	const color = (quote, stringTyped) => {
		let colouredString = '';
		let wrongInput = false;

		const quoteLetters = quote.split('');
		const typedLetters = stringTyped.split('');
		for (let i = 0; i < typedLetters.length; i++) {
			// if a single mistake,
			// the rest of the coloured string will appear red
			if (wrongInput) {
				colouredString += chalk.bgRed(quoteLetters[i]);
				continue;
			}

			if (typedLetters[i] === quoteLetters[i]) {
				wrongInput = false;
				colouredString += chalk.bgGreen(quoteLetters[i]);
				if (quote === stringTyped) {
					this.gameEnd = true;
				}
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
			} else if (key.return) {
				exit();
			} else if (text.length >= quote.length && text !== quote) {
				setText(prevText => prevText);
			} else {
				setText(prevText => prevText + input);
			}
		});

		return updateColor(quote, text);
	};

	return (
		<>
			<Text>{handleInput()}</Text>
		</>
	);
}
