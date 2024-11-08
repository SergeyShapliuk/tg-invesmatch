import {createContext, useState, useContext, ReactNode, useEffect} from "react";
import {useFetchUser} from "../../api/hooks/useFetchUser";
import {initInitData} from "@telegram-apps/sdk-react";
import {UpdateVariables, User} from "../../types/types";
import {useNavigate} from "react-router-dom";
import {useFetchUserRelevance} from "../../api/hooks/useFetchUserRelevance";


interface UserProviderProps {
    isInitialized: boolean;
    isLoggedIn: boolean;
    // setInitialized: (value: boolean) => void;
    userData: User | undefined;
    usersRelevance: { relevance: number, user: User }[];
    mutateRelevance: (variables: UpdateVariables) => void;
    refetchUserData: () => void;
}


export const UserContext = createContext<UserProviderProps | undefined>(undefined);


export const UserProvider = ({children}: { children: ReactNode }) => {
    const initData = initInitData();
    const navigate = useNavigate();


    const [isInitialized, setInitialized] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<User>();
    const [usersRelevance, setUsersRelevance] = useState<{ relevance: number, user: User }[]>([]);

    const {
        data: user,
        refetch: refetchUserData,
        isFetched,
        isFetching
    } = useFetchUser(initData?.user?.id.toString() ?? "test");
    const {mutate: mutateRelevance, data: userRelevance} = useFetchUserRelevance();
    // console.log("isSuccess", isSuccess);
    // console.log("isError", isError);
    // console.log("isInitialized", isInitialized);
    // console.log("isLoggedIn", isLoggedIn);
    console.log("isFetched", isFetched);
    // console.log("user", user);
    console.log("isFetching", isFetching);

    useEffect(() => {
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

    // useEffect(() => {
    //     if (userData) {
    //
    //     }
    // }, [userData]);

    useEffect(() => {
        if (userRelevance) {
            setUsersRelevance(userRelevance.feed);
            setIsLoggedIn(true);
            console.log("user");
            setInitialized(true);
            navigate("/");
        }
    }, [userRelevance]);

    return (
        <UserContext.Provider value={{
            isInitialized,
            isLoggedIn,
            userData,
            usersRelevance,
            mutateRelevance,
            refetchUserData
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
