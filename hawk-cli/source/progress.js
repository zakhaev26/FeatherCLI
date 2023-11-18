import React, {useState} from "react";
import { render, Text, useInput } from "ink";

const Progress = () => {
    const [progressText, setProgressText] = useState("");

    const text = "HEllo I am a cli tool hawk."

    useInput((input, key) => {
        if (key.backspace) {
            setProgressText(progressText.slice(0, -1));
        } else {
            setProgressText(progressText + input);
        }
    }
    );



    return (
        <>
        <Text color="blue">{text}</Text>
        <Text color="green">{progressText}</Text>
        </>
    )
}

export default Progress;