import classes from "./MenuMatches.module.css";
import {NavLink} from "react-router-dom";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import MemoArrowIcon from "../../components/svg/ArrowIcon";
import {useFetchMatches} from "../../api/hooks/useFetchMatchs";
// import {useFetchLikes} from "../../api/hooks/useFetchLikes";
import {initInitData} from "@telegram-apps/sdk-react";


// const list = [
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"}
// ];

function MenuMatches() {
    const initData = initInitData();
    const {responseFontSize} = useScreenSize();

    const {data: matches} = useFetchMatches(initData?.user?.id.toString() ?? "test");
    // const {data: likes} = useFetchLikes(initData?.user?.id.toString() ?? "test");

    // console.log("matches", matches);
    // console.log("likes", likes);
    return (
        <div className={classes.container}>
            <NavLink to={"/chat/likes"} className={classes.likesContainer}>
                <div className={classes.likesTitle}
                     style={{fontSize: responseFontSize(49), lineHeight: responseFontSize(62)}}>
                    Likes
                </div>
                <div style={{
                    width: 29,
                    height: 29,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#4c4c4c",
                    borderRadius: 50
                }}>
                    <MemoArrowIcon stroke={"#FFFFFF73"} style={{transform: "rotate(180deg)"}}/>
                </div>

            </NavLink>
            <div className={classes.matchesContainer}>
                <div className={classes.title}
                     style={{fontSize: responseFontSize(49), lineHeight: responseFontSize(49)}}>
                    Matches
                </div>
                <div className={classes.listMatches}>
                    {matches?.users.map((item, index) => (
                        <a href={`https://t.me/${item.tg_nick}`} key={index} target="_blank" rel="noopener noreferrer"
                           style={{
                               display: "flex",
                               justifyContent: "space-between",
                               alignItems: "center",
                               borderBottomColor: "rgba(255,255,255,0.4)",
                               borderBottomWidth: "1px",
                               borderBottomStyle: "solid",
                               paddingTop: "17px",
                               paddingBottom: "17px",
                               textDecoration: "none"
                           }}>
                            <div>
                                <div className={classes.companyName}>{item.name}</div>
                                <div className={classes.nick}>{item.tg_nick}</div>
                            </div>
                            <div style={{
                                width: 29,
                                height: 29,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#286EF2",
                                borderRadius: 50
                            }}>
                                <MemoArrowIcon stroke={"#FFFFFF"} style={{transform: "rotate(180deg)"}}/>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default MenuMatches;
