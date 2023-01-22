import * as React from "react"
import type {HeadFC, PageProps} from "gatsby"
import Globe from 'react-globe.gl';
import InputForm from "../components/InputForm";
import HopList from "../components/traceroute/HopList";

const pageStyles = {
    color: "#232129",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
    marginTop: 0,
    marginBottom: 20,
    maxWidth: 320,
}

const IndexPage: React.FC<PageProps> = () => {

    const [arcsData, setArcsData] = React.useState<any>([]);
    const [hops, setHops] = React.useState<any>([]);

    React.useEffect(() => {
        // Gen random data
        const N = 20;
        setArcsData([...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: [['red', 'orange', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'orange', 'blue', 'green'][Math.round(Math.random() * 3)]]
        })));
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
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                    arcsData={arcsData}
                    arcColor={'color'}
                    arcDashLength={() => Math.random()}
                    arcDashGap={() => Math.random()}
                    arcDashAnimateTime={() => Math.random() * 4000 + 500}
                    backgroundColor={'#FFF'}
                />
            </div>
        </main>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Traceroute</title>
