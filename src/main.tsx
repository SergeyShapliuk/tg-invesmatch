import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {HashRouter} from "react-router-dom";
import {SDKProvider} from "@telegram-apps/sdk-react";
import {ScreenSizeProvider} from "./common/context/ScreenSizeProvider";
import {TonConnectUIProvider} from "@tonconnect/ui-react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HashRouter>
            <SDKProvider>
                <TonConnectUIProvider
                    manifestUrl="https://raw.githubusercontent.com/markokhman/func-course-chapter-5-code/master/public/manifest.json">
                    <ScreenSizeProvider>
                        <App/>
                    </ScreenSizeProvider>
                </TonConnectUIProvider>
            </SDKProvider>
        </HashRouter>
    </StrictMode>
);
