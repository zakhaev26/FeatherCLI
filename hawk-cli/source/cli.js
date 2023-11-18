#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
		Usage
		  $ my-ink-cli <options> <name>

		Options
			--name  Your name

		Examples
		  $ my-ink-cli --name=Jane
		  Hello, Jane
	`,
	{
		importMeta: import.meta,
	},
);
render(<App />);
