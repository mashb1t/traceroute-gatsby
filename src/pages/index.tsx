import * as React from "react"
import {useState} from "react"
import type {HeadFC, PageProps} from "gatsby"
import Globe from 'react-globe.gl';
import InputForm from "../components/InputForm";
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

const OPACITY = 1;

const IndexPage: React.FC<PageProps> = () => {

    const [arcsData, setArcsData] = useState<any>([]);
    const [hops, setHops] = useState<Array<TracerouteHop>>([]);
    const [hoverArc, setHoverArc] = useState<any>();

    React.useEffect(() => {
        // Gen random data
        const N = 20;
        setArcsData([...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: [['red', 'orange', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'orange', 'blue', 'green'][Math.round(Math.random() * 3)]]
        })))
    }, []);

    return (
        <main style={pageStyles}>
            <div className={'container'}>
                <h1 style={headingStyles}>
                    Traceroute
                </h1>
                <InputForm setArcsData={setArcsData} setHops={setHops}/>
                <HopList hops={hops}/>
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

                    pointsData={hops}
                    pointLabel={hop => hop?.geolocations?.city ? `${hop?.geolocations?.city}` : hop?.ip}
                    pointLat={hop => hop?.geolocations?.ll[0]}
                    pointLng={hop => hop?.geolocations?.ll[1]}
                    pointColor={() => 'orange'}
                    pointAltitude={0}
                    pointRadius={0.1}
                    pointsMerge={false}
                />
            </div>
        </main>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Traceroute</title>
