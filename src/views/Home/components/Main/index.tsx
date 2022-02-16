import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";
import IDO from "../../../IDO/index";

function Main() {
    return (
        <div className="landing-wrapper">
            <div className="landing-main">
                <div className="landing-main-title-wrap">
                    <p>The Decentralized</p>
                    <p>MetaBank</p>
                </div>
                <div className="landing-main-help-text-wrap">
                    <p>The world’s first gamified high yield protocol</p>
                    <p>rewarding it’s holders with #Bitcoin and #Ethereum</p>
                </div>
                <IDO />
            </div>
        </div>
    );
}

export default Main;
