import React from "react";
import {useInputForm} from "./hook";

const InputForm: React.FC<{ setArcsData: Function }> = ({setArcsData}) => {
    const initialState = {
        ip: "",
    };

    const {onChange, onSubmit, values} = useInputForm(
        submitCallback,
        initialState
    );

    async function submitCallback() {
        setArcsData([]);
    }

    return (
        // don't mind this ugly form :P
        <form onSubmit={onSubmit}>
            <div>
                <input
                    name='ip'
                    id='ip'
                    placeholder='IP'
                    onChange={onChange}
                    required
                />
                <button type='submit'>Login</button>
            </div>
        </form>
    );
}

export default InputForm;