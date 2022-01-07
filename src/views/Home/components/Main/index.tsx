import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";
import Stake from "../../../Stake/index";

function Main() {
    return (
        <div className="landing-wrapper">
            <div className="landing-main">
                <div className="landing-main-title-wrap">
                    <p>The Decentralized</p>
                    <p>MetaBank</p>
                </div>
                <div className="landing-main-help-text-wrap">
                    <p>Financial tools to grow your wealth - stake</p>
                    <p>and earncompounding interest</p>
                </div>
                {/* <div className="landing-main-btns-wrap">
                    <Link href="https://app.wonderland.money" target="_blank" rel="noreferrer">
                        <div className="landing-main-btn">
                            <p>Enter App</p>
                        </div>
                    </Link>
                    <Link href="https://wonderland.gitbook.io/wonderland/" target="_blank" rel="noreferrer">
                        <div className="landing-main-btn">
                            <p>Documentation</p>
                        </div>
                    </Link>
                </div> */}
            </div>

            <Stake />
        </div>
    );
}

export default Main;
