import React from "react";
import axios, {AxiosError} from 'axios';
import {useInputForm} from "./hook";
import TracerouteHop from "./traceroute/interface";

export interface InputFormState {
    target?: string;
}

const InputForm: React.FC<{ setArcsData: Function, setHops: Function }> = ({setArcsData, setHops}) => {

    const [error, setError] = React.useState<string>('');

    const inputFormState: InputFormState = {
        target: '',
    };

    const {onChange, onSubmit, values} = useInputForm(
        submitCallback,
        inputFormState
    );

    async function submitCallback() {
        try {
            setError('');
            setHops(null);
            axios.post(`http://localhost:3000/traceroute`, {
                target: values.target,
                withGeoLocations: true
            })
                .then(res => {
                    console.log(res.data);
                    let lastLat: number | undefined = res.data.currentGeoLocation?.ll[0];
                    let lastLng: number | undefined = res.data.currentGeoLocation?.ll[1];
                    setHops(res.data.data);
                    let filtered = res.data.data.filter((hop: TracerouteHop) => hop.ip !== "*" && hop.geolocations !== null);
                    let mapped = filtered.map(function (hop: TracerouteHop) {
                        let hopdata = {
                            hop: hop,
                            startLat: lastLat,
                            startLng: lastLng,
                            endLat: hop.geolocations?.ll[0],
                            endLng: hop.geolocations?.ll[1],
                            color: [['red', 'orange', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'orange', 'blue', 'green'][Math.round(Math.random() * 3)]]
                        }

                        lastLat = hop.geolocations?.ll[0] ?? lastLat;
                        lastLng = hop.geolocations?.ll[1] ?? lastLng;

                        return hopdata;
                    });
                    setArcsData(mapped);
                    console.log(mapped);
                })
                .catch(error => {
                    console.log(`${error.response?.data?.exception ?? error.message}`);
                    setError(`${error.response?.data?.exception ?? error.message}`);
                });
        } catch (error: any) {
            console.log(error);
            // setError(error.message);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    name='target'
                    id='target'
                    placeholder='domain / ip address'
                    onChange={onChange}
                    required
                />
                <button type='submit'>Trace</button>
                {error && <div>{error}</div>}
            </div>
        </form>
    );
}

export default InputForm;