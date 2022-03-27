import ReactDOM from "react-dom";
import Root from "./Root";
import store from "./store/store";
import { Provider } from "react-redux";
import { Web3ContextProvider } from "./hooks";
import { SnackbarProvider } from "notistack";
import SnackMessage from "./components/Messages/snackbar";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
    <MoralisProvider appId="JWaRkJrTb3mrqqvRDtsjWmZBhHZvnFgor3Vkdc0l" serverUrl="https://ysvg25mq1h8l.usemoralis.com:2053/server">
        <SnackbarProvider
            maxSnack={4}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            content={(key, message: string) => <SnackMessage id={key} message={JSON.parse(message)} />}
            autoHideDuration={3 * 60000}
        >
            <Provider store={store}>
                <Web3ContextProvider>
                    <Root />
                </Web3ContextProvider>
            </Provider>
        </SnackbarProvider>
        ,
    </MoralisProvider>,
    document.getElementById("root"),
);
