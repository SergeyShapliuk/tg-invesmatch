import {createContext, useState, useContext, ReactNode, useEffect} from "react";
import {useFetchUser} from "../../api/hooks/useFetchUser";
import {initInitData} from "@telegram-apps/sdk-react";
import {UpdateVariables, User} from "../../types/types";
import {useNavigate} from "react-router-dom";
import {useFetchUserRelevance} from "../../api/hooks/useFetchUserRelevance";


interface UserProviderProps {
    isInitialized: boolean;
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
    const [userData, setUserData] = useState<User | undefined>();
    const [usersRelevance, setUsersRelevance] = useState<{ relevance: number, user: User }[]>([]);

    const {data: user, refetch: refetchUserData, isSuccess} = useFetchUser(initData?.user?.id.toString() ?? "test");
    const {mutate: mutateRelevance, data: userRelevance} = useFetchUserRelevance();
    console.log("isFetching", userData);
    console.log("isSuccess", isSuccess);

    useEffect(() => {
        if (isSuccess) {
            if (user?.success && user?.user) {
                setUserData(user?.user);
            }
            setInitialized(true);
        } else {
            setInitialized(true);
        }
        navigate("/");

    }, [isSuccess]);

    useEffect(() => {
        if (userData) {
            mutateRelevance({tg_id: initData?.user?.id.toString() ?? "test"});
        }
    }, [userData]);

    useEffect(() => {
        if (userRelevance) {
            setUsersRelevance(userRelevance.feed);
        }
    }, [userRelevance]);

    return (
        <UserContext.Provider value={{
            isInitialized,
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
