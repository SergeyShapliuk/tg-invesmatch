import {Routes, Route, NavLink, useLocation, Navigate} from "react-router-dom";
import classes from "./Navigation.module.css";
import OnBoarding from "../screens/onBoarding/OnBoarding";
import CreateProfile from "../screens/profile/create/CreateProfile";
import MemoMainIcon from "../components/svg/MainIcon";
import MemoUserIcon from "../components/svg/UserIcon";
import SaveProfile from "../screens/profile/create/SaveProfile";
import Profile from "../screens/profile/Profile";
import ListLikes from "../screens/chat/ListLikes";
import MenuMatches from "../screens/chat/MenuMatches";
import Main from "../screens/main/Main";
import {useUserData} from "../common/context/UserProvider";
import {FadeLoader} from "react-spinners";
import {override} from "../App";
import {useKeyboardStatus} from "../common/hooks/useKeyboardStatus";
import Wallet from "../screens/wallet/Wallet";
import MemoBellIcon from "../components/svg/BellIcon";
import MemoWalletIcon from "../components/svg/WalletIcon";
import UpdateProfile from "../screens/profile/update/UpdateProfile";


function Navigation() {
    const location = useLocation();
    const isKeyboardOpen = useKeyboardStatus();
    const {isInitialized, isLoggedIn} = useUserData();
    const isShowNavBar = ["/"].includes(location.pathname);


    const includeStyle = ["/chat/menu", "/chat/likes"].includes(location.pathname);
    console.log("isLoggedIn", isLoggedIn);
    console.log("isInitialized", isInitialized);
    if (!isInitialized) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={!isInitialized}/>;
    return (
        <div className={!isShowNavBar ? classes.main : undefined}
             style={{paddingTop: includeStyle ? "1em" : undefined, paddingBottom: isKeyboardOpen ? 0 : undefined}}>
            {!isLoggedIn ? (
                <Routes>
                    <Route index element={<OnBoarding/>}/>
                    <Route path="/chat">
                        <Route path="" element={<Navigate to="create"/>}/>
                        <Route path="create"
                               element={<CreateProfile title="Sorry, you don't have any matches or likes"/>}/>
                    </Route>
                    <Route path="/main">
                        <Route path="" element={<Navigate to="create"/>}/>
                        <Route path="create" element={<CreateProfile title="To start the search, create an account"/>}/>
                    </Route>
                    <Route path="/profile">
                        <Route path="" element={<Navigate to="create"/>}/>
                        <Route path="create" element={<CreateProfile title="You don't have a profile"/>}/>
                        <Route path="save" element={<SaveProfile/>}/>
                    </Route>
                    <Route path="/wallet" element={<Wallet/>}/>
                </Routes>
            ) : (
                <Routes>
                    <Route index element={<Navigate to="/main"/>}/>
                    <Route path="/chat">
                        <Route path="" element={<Navigate to="menu"/>}/>
                        {/*<Route path="search" element={<SearchMatches/>}/>*/}
                        <Route path="menu" element={<MenuMatches/>}/>
                        <Route path="likes" element={<ListLikes/>}/>
                    </Route>
                    <Route path="/main" element={<Main/>}/>
                    {/*<Route path="/profile" element={<Profile/>}/>*/}
                    <Route path="/profile">
                        <Route path="" element={<Profile/>}/>
                        <Route path="update" element={<UpdateProfile/>}/>
                    </Route>
                    <Route path="/wallet" element={<Wallet/>}/>
                </Routes>
            )}
            {location.pathname !== "/" && <NavBar/>}
        </div>
    );
}

export default Navigation;


function NavBar() {
    const location = useLocation();
    // const {badge} = useTotalPoints();

    // const activeStyle = (isActive: boolean): CSSProperties => {
    //     return isActive ? {
    //         width: 119.33,
    //         height: 40.39,
    //         display: "inline-flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         textAlign: "center",
    //         // color: "#000000",
    //         borderRadius: 20,
    //         // backgroundColor: "#3193F4",
    //         // padding: "0px 20px",
    //         textDecoration: "none",
    //         gap: 8.9
    //     } : {position: "relative", display: "flex", justifyContent: "center", width: "22%", textDecoration: "none"};
    // };
    // const textStyle = {fontSize: 14, fontWeight: 400, letterSpacing: -0.2};

    return (
        <nav className={classes.nav}>
            <NavLink to="/chat">
                <MemoBellIcon stroke={location.pathname.startsWith("/chat") ? "#EFEFEF" : "#6F6F72"}
                              opacity={location.pathname.startsWith("/chat") ? 1 : 0.51}/>
                {/*{location.pathname === "/" &&*/}
                {/*<span style={textStyle}>Home</span>}*/}
            </NavLink>
            <NavLink to="/main">
                <MemoMainIcon opacity={location.pathname.startsWith("/main") ? 1 : 0.51}/>
                {/*{location.pathname === "/tasks" && <span style={textStyle}>Tasks</span>}*/}
                {/*{location.pathname !== "/tasks" &&*/}
                {/*<div style={{*/}
                {/*    // width: "15px",*/}
                {/*    // height: "15px",*/}
                {/*    position: "absolute",*/}
                {/*    // top: 0,*/}
                {/*    right: 15,*/}
                {/*    bottom: 15,*/}
                {/*    color: "#3193F4",*/}
                {/*    fontSize: "14px",*/}
                {/*    fontWeight: "700",*/}
                {/*    borderRadius: "50px"*/}
                {/*    // backgroundColor: "#3193F4"*/}
                {/*}}>{badge !== 0 && badge}</div>}*/}
            </NavLink>
            <NavLink to="/profile">
                <MemoUserIcon stroke={location.pathname.startsWith("/profile") ? "#EFEFEF" : "#6F6F72"}
                              opacity={location.pathname.startsWith("/profile") ? 1 : 0.51}/>
                {/*{location.pathname === "/friends" && <span style={textStyle}>Friends</span>}*/}
            </NavLink>
            <NavLink to="/wallet">
                <MemoWalletIcon stroke={location.pathname.startsWith("/wallet") ? "#000000" : "#00000082"}
                                opacity={location.pathname.startsWith("/wallet") ? 1 : 0.51}/>
                {/*{location.pathname === "/friends" && <span style={textStyle}>Friends</span>}*/}
            </NavLink>
        </nav>
    );
}
