import React from "react";
import TracerouteHop from "./interface";
import {HopData} from "../InputForm";
import {labelColor} from "../../pages";

const HopList: React.FC<{ hops: Array<TracerouteHop> | undefined, setHoverArc: any, arcsData: any }> = ({hops, setHoverArc, arcsData}) => {

    const onMouseOver = function (event: React.MouseEvent<HTMLLIElement>, hop: TracerouteHop) {
        setHoverArc(arcsData.find((element: HopData) => element.hop === hop));
        const element = event.currentTarget as HTMLLIElement;
        element.style.color = labelColor;
    }
    const onMouseLeave = function (event: React.MouseEvent<HTMLLIElement>) {
        setHoverArc(null);
        const element = event.currentTarget as HTMLLIElement;
        element.style.color = 'unset';
    }

    return (
        <div className="hoplist">
            <ol>
                {
                    hops?.map(function (hop: TracerouteHop) {
                        return <li className="list-group-item list-group-item-info"
                                   key={hop.hop}
                                   onMouseOver={(event) => onMouseOver(event, hop)}
                                   onMouseLeave={(event) => onMouseLeave(event)}
                        >
                            {hop.ip} {hop?.geolocations?.city ? `(${hop?.geolocations?.city})` : ''}
                        </li>
                    })
                }
            </ol>
        </div>
    );
}

export default HopList;