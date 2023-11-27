#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
		Usage
		  $ hawk-cli
	`,
	{
		importMeta: import.meta,
	},
);

render(<App />);
