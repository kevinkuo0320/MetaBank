import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useWeb3Context } from "../hooks";
import { loadAppDetails } from "../store/slices/app-slice";
import Home from "../views/Home";
import "./style.scss";

function App() {
    const dispatch = useDispatch();

    const { provider, chainID, connected } = useWeb3Context();

    const loadApp = useCallback(
        loadProvider => {
            dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
        },
        [connected],
    );

    useEffect(() => {
        loadApp(provider);
    }, []);

    return <Home />;
}

export default App;
