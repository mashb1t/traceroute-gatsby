interface TracerouteHop {
    hop: number,
    ip: string,
    rtt1: string,
    geolocations?: TracerouteGeolocation
}

interface TracerouteGeolocation {
    range: Array<number>,
    country: string,
    region: string,
    eu: string,
    timezone: string,
    city: string,
    ll: Array<number>
    metro: boolean,
    area: number
}

export default TracerouteHop;