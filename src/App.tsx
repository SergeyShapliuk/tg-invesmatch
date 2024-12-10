import {CSSProperties, useEffect, useState} from "react";
import "./App.module.css";
import Navigation from "./navigation/Navigation";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {UserProvider} from "./common/context/UserProvider";
// import {setupMockTelegramEnv} from "../telegramEnvConfig";
import {initMiniApp, initSwipeBehavior, initViewport} from "@telegram-apps/sdk-react";
import useNetworkStatus from "./common/hooks/useNetworkStatus";
// import ModalError from "./components/ui/modal/ModalError";
import ReactModal from "react-modal";
import MemoAlertIcon from "./components/svg/AlertIcon";


// setupMockTelegramEnv();


export const override: CSSProperties = {
    position: "absolute",
    height: "100%",
    top: "45%",
    left: "49%",
    // right:'50%',
    // transform:"translate(-50%, -50%)",
    display: "block",
    margin: "0 auto",
    zIndex: 999
};

function App() {
    const [miniApp] = initMiniApp();
    const [viewport] = initViewport();
    const [swipeBehavior] = initSwipeBehavior();
    const network = useNetworkStatus();


    const [error, setError] = useState<{ isOpen: boolean, message: string }>({isOpen: false, message: ""});

    // console.log("errorApp", error);
    // console.log("network", network);
    // console.log("miniApp", miniApp);


    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        refetchOnMount: false,
                        refetchOnReconnect: true,
                        retry: false,
                        staleTime: 5 * 60 * 1000
                    }
                },
                queryCache: new QueryCache({
                    onError: (error) =>
                        setError({isOpen: true, message: error.message}),

                    onSuccess: () => {
                        setError((prevError) => {
                            if (prevError.isOpen) {
                                return {isOpen: false, message: ""};
                            }
                            return prevError;
                        });
                    }
                }),
                mutationCache: new MutationCache({
                    onError: (error) =>
                        setError({isOpen: true, message: error.message}),
                    onSuccess: () => {
                        setError((prevError) => {
                            if (prevError.isOpen) {
                                return {isOpen: false, message: ""};
                            }
                            return prevError;
                        });
                    }
                })
            })
    );

    useEffect(() => {
        miniApp.ready();
        const expand = async () => {
            const vp = await viewport;
            if (!vp.isExpanded) {
                vp.expand();
            }
            miniApp.setHeaderColor("#1A1A1B");
            await swipeBehavior.disableVerticalSwipe();
        };
        // const localVersion = localStorage.getItem("appVersion");
        // if (localVersion && localVersion !== appVersion) {
        //     localStorage.setItem("appVersion", appVersion);
        //     window.location.reload();
        // }
        expand().then();
    }, []);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <Navigation/>
                </UserProvider>
            </QueryClientProvider>

            <ReactModal isOpen={network.isOnline ? error.isOpen : true} onRequestClose={close} style={{
                overlay: {background: "rgba(0,0,0,0.7)", zIndex: 999}, content: {
                    width: "95%",
                    top: 0,
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, 10px)",
                    border: "none",
                    borderRadius: 12,
                    background: "#272727"
                }
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <div>
                        <MemoAlertIcon/>
                    </div>
                    <div
                        style={{marginLeft: 12}}>{network.isOnline ? error.message : "Connection problem. Check your internet and refresh the mini-app"}</div>
                </div>
            </ReactModal>
            {/*<ModalError error={network.isOnline ? error : {*/}
            {/*    isOpen: true,*/}
            {/*    message: "Connection problem. Check your internet and refresh the mini-app"*/}
            {/*}}*/}
            {/*            close={() => setError({isOpen: false, message: ""})}/>*/}
        </>
    );
}

export default App;
