import {useState} from "react";
import {InputFormState} from "./InputForm";

export const useInputForm = (callback: any, inputFormState: InputFormState = {}) => {
    const [values, setValues] = useState(inputFormState);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await callback(); // triggering the callback
    };

    return {
        onChange,
        onSubmit,
        values,
    };
}

