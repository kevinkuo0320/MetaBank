import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./loader.scss";
import LOGO from "../../assets/metabank_logo.jpg";

function Loader() {
    return (
        <div className="loader-wrap">
            <p style={{ fontFamily: "Montserrat" }}> Entering MetaBank </p>
            <CircularProgress size={60} style={{ color: "grey" }} />
        </div>
    );
}

export default Loader;
