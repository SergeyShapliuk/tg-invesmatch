import {CSSProperties, useEffect, useState} from "react";
import "./App.module.css";
import Navigation from "./navigation/Navigation";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {UserProvider} from "./common/context/UserProvider";
// import {setupMockTelegramEnv} from "../telegramEnvConfig";
import {initMiniApp, initSwipeBehavior, initViewport} from "@telegram-apps/sdk-react";


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


    const [error, setError] = useState<{ isOpen: boolean, message: string }>({isOpen: false, message: ""});

    console.log("errorApp", error);
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
        </>
    );
}

export default App;
