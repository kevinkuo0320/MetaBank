import React, { useEffect, useState } from "react";
import Stake from "./StakeApp";
import Landing from "./Landing";
import Home from "./Home";
import { HashRouter } from "react-router-dom";
import { loadTokenPrices } from "../helpers";
import Loading from "../components/Loader";
import { Route, withRouter, BrowserRouter } from "react-router-dom";
import Media from "./Media";

function Root() {
    const isStake = (): boolean => {
        console.log(window.location.host);
        return window.location.pathname.includes("stake");
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTokenPrices().then(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/stake" component={Stake} />
            <Route path="/media" component={Media} />
        </BrowserRouter>
    );
}

export default Root;
