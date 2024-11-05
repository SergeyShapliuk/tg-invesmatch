import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {SDKProvider} from "@telegram-apps/sdk-react";
import {ScreenSizeProvider} from "./common/context/ScreenSizeProvider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <SDKProvider>
                <ScreenSizeProvider>
                    <App/>
                </ScreenSizeProvider>
            </SDKProvider>
        </BrowserRouter>
    </StrictMode>
);
