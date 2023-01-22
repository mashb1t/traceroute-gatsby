import * as React from "react"
import type {HeadFC, PageProps} from "gatsby"
import Globe from 'react-globe.gl';

const pageStyles = {
    color: "#232129",
    padding: 20,
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
    marginTop: 0,
    marginBottom: 20,
    maxWidth: 320,
}

const IndexPage: React.FC<PageProps> = () => {
    // Gen random data
    const N = 20;
    const arcsData = ([...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
    })));

    return (
        <main style={pageStyles}>
            <h1 style={headingStyles}>
                Traceroute
            </h1>
            <Globe
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                arcsData={arcsData}
                arcColor={'color'}
                arcDashLength={() => Math.random()}
                arcDashGap={() => Math.random()}
                arcDashAnimateTime={() => Math.random() * 4000 + 500}
                backgroundColor={'white'}
            />
        </main>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Traceroute</title>
