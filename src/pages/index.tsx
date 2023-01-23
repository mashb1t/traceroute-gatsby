import * as React from "react"
import {useState} from "react"
import type {HeadFC, PageProps} from "gatsby"
import Globe from 'react-globe.gl';
import InputForm, {HopData} from "../components/InputForm";
import HopList from "../components/traceroute/HopList";
import TracerouteHop from "../components/traceroute/interface";

const pageStyles = {
    color: "#fff",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
    marginTop: 0,
    marginBottom: 20,
    maxWidth: 320,
}

export const labelColor = '#ff8800';

const IndexPage: React.FC<PageProps> = () => {
    const [arcsData, setArcsData] = useState<Array<HopData|Object>>([]);
    const [hops, setHops] = useState<Array<TracerouteHop>>([]);
    const [hoverArc, setHoverArc] = useState<HopData>();

    const OPACITY = 1;

    React.useEffect(() => {
        // Gen random data
        const N = 20;
        setArcsData([...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
        })))
    }, []);

    return (
        <main style={pageStyles}>
            <div className={'container'}>
                <h1 style={headingStyles}>
                    Traceroute
                </h1>
                <InputForm setArcsData={setArcsData} setHops={setHops}/>
                <HopList hops={hops} setHoverArc={setHoverArc} arcsData={arcsData}/>
            </div>
            <div className={'globe'}>
                <Globe
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    backgroundColor={'#000'}
                    arcsData={arcsData}
                    arcColor={hop => {
                        const op = !hoverArc ? OPACITY : hop === hoverArc ? OPACITY : OPACITY / 4;
                        return [`rgba(0, 255, 0, ${op})`, `rgba(255, 0, 0, ${op})`];
                    }}
                    arcLabel={hop => (hop?.hop) ? `${hop?.hop?.hop}: ${hop?.lastHop?.ip} &#8594; ${hop?.hop?.ip}` : ''}

                    onArcHover={setHoverArc}
                    arcDashLength={0.4}
                    arcDashGap={0.1}
                    arcDashAnimateTime={1500}
                    arcsTransitionDuration={0}

                    labelsData={hops}
                    labelLabel={hop => `${hop?.ip}`}
                    labelText={hop => hop?.geolocations?.city ? `${hop?.hop}: ${hop?.geolocations?.city}` : `${hop?.hop}`}
                    labelLat={hop => hop?.geolocations?.ll[0]}
                    labelLng={hop => hop?.geolocations?.ll[1]}
                    labelColor={() => labelColor}
                />
            </div>
        </main>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Traceroute</title>
