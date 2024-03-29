import React from "react";
import "./home.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Background from "./components/Background";

function Landing() {
    return (
        <div className="landing-root">
            <Header />
            <Main />
            {/*<Background />*/}
        </div>
    );
}

export default Landing;
