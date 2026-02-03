import {createContext, useState, useContext, ReactNode, useEffect} from "react";
import {useFetchUser} from "../../api/hooks/useFetchUser";
import {initInitData} from "@telegram-apps/sdk-react";
import {UpdateVariables, User} from "../../types/types";
import {useNavigate} from "react-router-dom";
import {useFetchUserRelevance} from "../../api/hooks/useFetchUserRelevance";
import {useFetchUserShare} from "../../api/hooks/useFetchUserShare";
import {useHealthCheck} from "../../api/hooks/useHealthCheck";


interface UserProviderProps {
    isInitialized: boolean;
    isLoggedIn: boolean;
    // setInitialized: (value: boolean) => void;
    userData: User | undefined;
    userShareData: User | undefined;
    usersRelevance: { relevance: number, user: User }[];
    mutateRelevance: (variables: UpdateVariables) => void;
    refetchUserData: () => void;
    currentIndex: number;
    setCurrentIndex: (value: (prevIndex: number) => number) => void;
}


export const UserContext = createContext<UserProviderProps | undefined>(undefined);


export const UserProvider = ({children}: { children: ReactNode }) => {
    const initData = initInitData();
    const navigate = useNavigate();


    const [isInitialized, setInitialized] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<User>();
    const [userShareData, setUserShareData] = useState<User>();
    const [usersRelevance, setUsersRelevance] = useState<{ relevance: number, user: User }[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const {
        data: user,
        refetch: refetchUserData,
        isFetched,
        isFetching
    } = useFetchUser(initData?.user?.id.toString() ?? "test");
    const {
        refetch: refetchUserDataShare
    } = useFetchUserShare(initData?.startParam?.toString() ?? "test");
    const {mutate: mutateRelevance, data: userRelevance} = useFetchUserRelevance();
    const {refetch: healthCheck} = useHealthCheck();
    // console.log("isSuccess", isSuccess);
    // console.log("isError", isError);
    // console.log("isInitialized", isInitialized);
    // console.log("isLoggedIn", isLoggedIn);
    // console.log("isFetched", isFetched);
    // // console.log("user", user);
    // console.log("isFetching", isFetching);
    // console.log("userShareData", userShareData);

    useEffect(() => {
        healthCheck();
        refetchUserData().then(res => {
            if (res.data?.success && res.data.user) {
                setUserData(res.data.user);
                mutateRelevance({tg_id: initData?.user?.id.toString() ?? "test"});
            } else {
                setInitialized(true);
            }
        }).catch(() => setInitialized(true));
        console.log("navi");
        navigate("/");
    }, []);

    useEffect(() => {
        const share = sessionStorage.getItem("share");
        const shareId = initData?.startParam ? decodeURIComponent(initData.startParam) : null;
        // const shareId = undefined
        if (shareId && !share) {
            refetchUserDataShare().then(res => {
                if (res.data?.success && res.data.user) {
                    setUserShareData(res.data.user);
                    sessionStorage.setItem("share", "true");
                }
            }).catch(() => console.log("Error share data"));
        }
    }, []);


    useEffect(() => {
        if (!isFetching && isFetched) {
            if (user?.success && user?.user) {
                setUserData(user.user);
                mutateRelevance({tg_id: initData?.user?.id.toString() ?? "test"});
            }
        }
        // console.log("navi");
    }, [isFetching, isFetched]);

    // useEffect(() => {
    //     if (!isFetched) {
    //         if (user?.success && user?.user) {
    //             setUserData(user?.user);
    //         }
    //     }
    // }, [isFetched]);


    useEffect(() => {
        if (!isInitialized && userRelevance) {
            setUsersRelevance(userRelevance.feed);
            setIsLoggedIn(true);
            console.log("user");
            setInitialized(true);
            navigate("/");
        }
    }, [userRelevance]);

    useEffect(() => {
        if (isInitialized && !isLoggedIn && userRelevance) {
            setUsersRelevance(userRelevance.feed);
            setIsLoggedIn(true);
            navigate("/");
        }
    }, [userRelevance]);

    return (
        <UserContext.Provider value={{
            isInitialized,
            isLoggedIn,
            userData,
            userShareData,
            usersRelevance,
            mutateRelevance,
            refetchUserData,
            currentIndex,
            setCurrentIndex
        }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the context
export const useUserData = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useCountdown must be used within a CountdownProvider");
    }
    return context;
};
