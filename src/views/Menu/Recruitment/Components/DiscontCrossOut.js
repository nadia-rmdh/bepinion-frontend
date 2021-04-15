import React from "react"

function DiscontCrossOut({ width = 45, height = 2, color = "#ff0200", left = "calc(50% - 22px)", rotate = -15 }) {
    return (
        <div style={{ position: "absolute", top: "50%", width: width, height: height, background: color, left: left, transform: `rotate(${rotate}deg)` }}></div>
    )
}

export default DiscontCrossOut;