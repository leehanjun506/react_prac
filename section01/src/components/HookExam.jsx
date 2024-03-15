import {useState} from "react";
import useInput from "../hooks/useInput.jsx";

const HookExam = () => {
    const [input, onChange] = useInput();

    return (
        <div>
            <input value={input} onChange={onChange}/>
        </div>
    );
};

export default HookExam;