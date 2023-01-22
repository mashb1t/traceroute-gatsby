import React from "react";
import TracerouteHop from "./interface";

const HopList: React.FC<{ hops: Array<TracerouteHop> | undefined }> = ({hops}) => {
    return (
        <div className="hoplist">
            <ol>
                {
                    hops?.map(function (hop: TracerouteHop) {
                        return <li className="list-group-item list-group-item-info" key={hop.hop}>{hop.ip} {hop?.geolocations?.city ? `(${hop?.geolocations?.city})` : ''}</li>
                    })
                }
            </ol>
        </div>
    );
}

export default HopList;