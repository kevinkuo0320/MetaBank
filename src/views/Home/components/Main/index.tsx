import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";
import IDO from "../../../IDO/index";
import Timer from "../../../../components/Timer/Timer";
import { Fade } from "react-reveal";
import Media from "../../../Media/index";

function Main() {
    return (
        <div className="landing-wrapper">
            <div className="landing-main">
                <Fade bottom>
                    <div className="landing-main-title-wrap">
                        <p>Metabank Games </p>
                        <p>Season 1</p>
                    </div>
                </Fade>
                <Fade bottom>
                    <div className="landing-main-help-text-wrap">
                        <p>The world’s first gamified high yield protocol</p>
                        <p>rewarding holders and winners with Bitcoin, Ethereum and AVAX</p>
                    </div>
                </Fade>
                <div className="landing-main-help-text-wrap">
                    <p>Join our discord channal to become whitelisted! </p>
                </div>
                <div className="landing-main-help-text-wrap">
                    <p> IDO begins in: </p>
                </div>

                <Timer />

                <IDO />

                <Media />
            </div>
        </div>
    );
}

export default Main;
