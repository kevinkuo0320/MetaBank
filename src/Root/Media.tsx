import { useEffect, useState, useCallback } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddress, useWeb3Context } from "../hooks";
import { calcBondDetails } from "../store/slices/bond-slice";
import { loadAppDetails } from "../store/slices/app-slice";
import { loadAccountDetails, calculateUserBondDetails } from "../store/slices/account-slice";
import { IReduxState } from "../store/slices/state.interface";
import Loading from "../components/Loader";
import useBonds from "../hooks/bonds";
import ViewBase from "../components/ViewBase";
/*import { Media, ChooseBond, Bond, Dashboard, NotFound } from "../views";*/
import "./style.scss";

function MediaApp() {
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);

    if (isAppLoading) return <Loading />;

    return (
        <ViewBase>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/media" />
                </Route>

                <Route path="/media">{/*<Media />*/}</Route>

                {/*<Route component={NotFound} />*/}
            </Switch>
        </ViewBase>
    );
}

export default MediaApp;
