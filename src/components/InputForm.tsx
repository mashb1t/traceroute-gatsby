import React from "react";
import axios, {AxiosError} from 'axios';
import {useInputForm} from "./hook";
import TracerouteHop from "./traceroute/interface";

export interface InputFormState {
    server?: string;
    target?: string;
}

export interface HopData {
    hop: TracerouteHop,
    lastHop?: TracerouteHop,
    startLat?: number,
    startLng?: number,
    endLat?: number,
    endLng?: number,
}

const errorStyles = {
    color: '#ff0000'
}

const InputForm: React.FC<{ setArcsData: Function, setHops: Function }> = ({setArcsData, setHops}) => {
    const [error, setError] = React.useState<string>('');
    const defaultServer = 'http://localhost:3000';

    const inputFormState: InputFormState = {
        server: defaultServer,
        target: '',
    };

    const {onChange, onSubmit, values} = useInputForm(
        submitCallback,
        inputFormState
    );

    async function submitCallback() {
        try {
            setError('');
            setArcsData([]);
            setHops([]);
            axios.post(`${values.server}/traceroute`, {
                target: values.target,
                withGeoLocations: true
            })
                .then(res => {
                    if (res.data?.exception) {
                        throw new Error(res.data?.exception);
                    }

                    let lastLat: number | undefined = res.data.currentGeoLocation?.ll[0];
                    let lastLng: number | undefined = res.data.currentGeoLocation?.ll[1];
                    let lastHop: TracerouteHop = {
                        geolocations: res.data.currentGeoLocation,
                        rtt1: "",
                        hop: 0,
                        ip: res.data.currentGeoLocation.ip
                    };

                    setHops(res.data.data);
                    let filtered = res.data.data.filter((hop: TracerouteHop) => hop.ip !== "*" && hop.geolocations !== null);
                    let mapped = filtered.map(function (hop: TracerouteHop) {

                        let hopdata: HopData = {
                            hop: hop,
                            lastHop: lastHop,
                            startLat: lastLat,
                            startLng: lastLng,
                            endLat: hop.geolocations?.ll[0],
                            endLng: hop.geolocations?.ll[1],
                        }

                        lastLat = hop.geolocations?.ll[0] ?? lastLat;
                        lastLng = hop.geolocations?.ll[1] ?? lastLng;
                        lastHop = hop;

                        return hopdata;
                    });
                    setArcsData(mapped);
                })
                .catch(error => {
                    setError(`${error.response?.data?.exception ?? error.message}`);
                });
        } catch (error: any) {
            setError(`${error.response?.data?.exception ?? error.message}`);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    name='server'
                    id='server'
                    placeholder='traceroute server ip address'
                    onChange={onChange}
                    defaultValue={defaultServer}
                    required
                />
                <input
                    name='target'
                    id='target'
                    placeholder='domain / ip address'
                    onChange={onChange}
                    required
                />
                <button type='submit'>Trace</button>
                {error && <div style={errorStyles}>{error}</div>}
            </div>
        </form>
    );
}

export default InputForm;