import {Routes, Route, NavLink, useLocation, Navigate} from "react-router-dom";
import classes from "./Navigation.module.css";
import OnBoarding from "../screens/onBoarding/OnBoarding";
import CreateProfile from "../screens/profile/create/CreateProfile";
import MemoChatIcon from "../components/svg/ChatIcon";
import MemoMainIcon from "../components/svg/MainIcon";
import MemoUserIcon from "../components/svg/UserIcon";
import SaveProfile from "../screens/profile/create/SaveProfile";
import Profile from "../screens/profile/Profile";
import SearchMatches from "../screens/chat/SearchMatches";
import ListLikes from "../screens/chat/ListLikes";
import MenuMatches from "../screens/chat/MenuMatches";
import Main from "../screens/main/Main";
import {useUserData} from "../common/context/UserProvider";
import {FadeLoader} from "react-spinners";
import {override} from "../App";


function Navigation() {
    const location = useLocation();
    const {isInitialized, isLoggedIn} = useUserData();
    const isShowNavBar = ["/"].includes(location.pathname);

    const includeStyle = ["/chat/menu", "/chat/likes"].includes(location.pathname);
    console.log("isLoggedIn", isLoggedIn);
    console.log("isInitialized", isInitialized);
    if (!isInitialized) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={!isInitialized}/>;
    return (
        <div className={!isShowNavBar ? classes.main : undefined}
             style={includeStyle ? {paddingTop: "1em"} : undefined}>
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
                </Routes>
            ) : (
                <Routes>
                    <Route index element={<Navigate to="/main"/>}/>
                    <Route path="/chat">
                        <Route path="" element={<Navigate to="search"/>}/>
                        <Route path="search" element={<SearchMatches/>}/>
                        <Route path="menu" element={<MenuMatches/>}/>
                        <Route path="likes" element={<ListLikes/>}/>
                    </Route>
                    <Route path="/main" element={<Main/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    {/*<Route path="/tasks" element={<Tasks/>}/>*/}
                    {/*<Route path="/friends" element={<Friends/>}/>*/}
                    {/*<Route path="/game/*" element={<GameComponent/>}>*/}
                    {/*    <Route path="stack" element={<StackApp/>}/>*/}
                    {/*    <Route path="puzzle" element={<PuzzleApp/>}/>*/}
                    {/*</Route>*/}
                    {/*<Route path="/profile" element={<Profile/>}/>*/}
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
                <MemoChatIcon stroke={location.pathname.startsWith("/chat") ? "#000000" : "#00000082"}
                              opacity={location.pathname.startsWith("/chat") ? 1 : 0.51}/>
                {/*{location.pathname === "/" &&*/}
                {/*<span style={textStyle}>Home</span>}*/}
            </NavLink>
            <NavLink to="/main">
                <MemoMainIcon fill={location.pathname.startsWith("/main") ? "#000000" : "#00000082"}
                              opacity={location.pathname.startsWith("/main") ? 1 : 0.51}/>
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
                <MemoUserIcon stroke={location.pathname.startsWith("/profile") ? "#000000" : "#00000082"}
                              opacity={location.pathname.startsWith("/profile") ? 1 : 0.51}/>
                {/*{location.pathname === "/friends" && <span style={textStyle}>Friends</span>}*/}
            </NavLink>
            {/*<NavLink to="game" style={({isActive}) => activeStyle(isActive)}>*/}
            {/*    /!*<MemoGameIcon fill={location.pathname === "/game" ? "#0E1012" : "#434343"}/>*!/*/}
            {/*    {location.pathname === "/game" && <span style={textStyle}>Game</span>}*/}
            {/*</NavLink>*/}
            {/*<NavLink to="profile" style={({isActive}) => activeStyle(isActive)}>*/}
            {/*    /!*<MemoWalletIcon fill={location.pathname === "/friends" ? "#0E1012" : "#434343"}/>*!/*/}
            {/*    {location.pathname === "/profile" && <span style={textStyle}>Wallet</span>}*/}
            {/*</NavLink>*/}
        </nav>
    );
}
