import React from "react";
import { render, Text } from "ink";

export const Hello = () => {
	const text = "Hello World"
	return <Text color="green">{text}</Text>;
};