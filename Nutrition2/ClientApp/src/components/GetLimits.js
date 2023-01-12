import React from "react";
import Limit from "./Limit";

export default function GetLimits({ limits, prods }) {
    return (
      limits.map(limit => { return <Limit key={limit.id} limit={limit} />})
    );
}