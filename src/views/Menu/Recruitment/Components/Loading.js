import React from "react"
import Loader from "react-loader-spinner";

function Loading({ type = 'Oval', text }) {
    return (
        <div className="loading">
            <div className="d-block text-center">
                <Loader color="#305574" secondaryColor="#00BFFF" type={type} height={150} width={150} radius={1} />
                {text &&
                    <p className="mt-3 text" style={{ fontSize: "12pt", color: "#305574", fontWeight: "bold" }}>Menyambungkan...</p>
                }
            </div>
        </div>
    )
}

export default Loading;