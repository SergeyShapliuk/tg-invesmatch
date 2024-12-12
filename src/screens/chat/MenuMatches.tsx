import classes from "./MenuMatches.module.css";
import {NavLink} from "react-router-dom";
import {useFetchMatches} from "../../api/hooks/useFetchMatchs";
import {useFetchLikes} from "../../api/hooks/useFetchLikes";
import {initInitData} from "@telegram-apps/sdk-react";
import MemoArrowSecondaryIcon from "../../components/svg/ArrowSecondaryIcon";
import MemoHeartIcon from "../../components/svg/HeartIcon";
import MemoTelegramIcon from "../../components/svg/TelegramIcon";
import ProfileCard from "./ProfileCard";
import {useState} from "react";
import {User} from "../../types/types";
import {motion} from "framer-motion";
import {FadeLoader} from "react-spinners";
import {override} from "../../App";


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
    // const {responseFontSize} = useScreenSize();

    const {
        data: likes,
        refetch: refetchLikes,
        isFetching: isFetchingLikes,
        isFetched: isFetchedLikes
    } = useFetchLikes(initData?.user?.id.toString() ?? "test", "always");

    const {
        data: matches,
        refetch: refetchMatches,
        isFetching: isFetchingMatches,
        isFetched: isFetchedMatches
    } = useFetchMatches(initData?.user?.id.toString() ?? "test", "always");

    const [cardData, setCardData] = useState<User & { disabled?: boolean } | undefined>();
    // console.log("matches", matches);
    console.log("likes", likes);

    if (!isFetchedMatches || !isFetchedLikes) {
        return (
            <div className={classes.container}>
                <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading/>
            </div>
        );
    }

    return (
        <>
            {!cardData ? (<div className={classes.container}>
                <FadeLoader color={"rgb(49,125,148)"} cssOverride={override}
                            loading={isFetchingLikes || isFetchingMatches}/>
                <div className={classes.likesContainer}>
                    {likes && likes?.users?.length > 0 ? (<NavLink to={"/chat/likes"} className={classes.likesLink}>
                        <div className={classes.title}>
                            Liked you
                        </div>
                        <MemoArrowSecondaryIcon/>
                    </NavLink>) : (
                        <div className={classes.likesLink}>
                            <div className={classes.title}>
                                Liked you
                            </div>
                        </div>)}
                    {likes && likes?.users?.length > 0 ? (<div className={classes.likeCardsContainer}>
                        {likes?.users?.map((card, index) => (
                            <motion.div key={index} whileTap={{scale: 0.95}} onTap={() => setCardData(card)}
                                        className={classes.likeCard}>
                                <div className={classes.name}>{card.name}</div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end"
                                }}>
                                    <div style={{
                                        height: "auto",
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, auto)",
                                        justifyContent: "start",
                                        paddingRight: 16,
                                        flexWrap: "wrap",
                                        gap: 8
                                    }}>
                                        {card?.hashtags && ["user_types", "business_models", "industries"].map(field => Object.values(card?.hashtags?.[field] || {})).flat().slice(0, 3).map((item, index) => (
                                            <div key={index} className="hashButton"
                                                 style={{backgroundColor: "#FFFFFF1F"}}>{item}</div>
                                        ))}
                                    </div>
                                    <div className={classes.heart}>
                                        <MemoHeartIcon fill={"#FFFFFF"}/>
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </div>) : (
                        <div style={{paddingLeft: 24, paddingRight: 24}}>
                            When your profile gets liked, it will appear here
                        </div>
                    )}
                </div>

                <div className={classes.matchesContainer}>
                    <div className={classes.title}>
                        Your matches
                    </div>
                    {matches && matches?.users?.length > 0 ? (<div className={classes.listMatches}>
                        {matches?.users?.map((item, index) => (
                            <motion.div key={index}
                                        whileTap={{scale: 0.95}}
                                        onTap={() => {
                                            setCardData({...item, disabled: true});
                                        }}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            backgroundColor: "#FFFFFF1F",
                                            borderRadius: "24px",
                                            padding: "12px 16px 16px 16px",
                                            textDecoration: "none",
                                            gap: 10
                                        }}>
                                <div>
                                    <div className={classes.name}>{item.name}</div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "start",
                                    flexWrap: "wrap",
                                    gap: 8
                                }}>
                                    {item?.hashtags && ["user_types", "business_models", "industries"].map(field => Object.values(item?.hashtags?.[field] || {})).flat().slice(0, 3).map((item, index) => (
                                        <div key={index} className="hashButton"
                                             style={{backgroundColor: "#FFFFFF1F"}}>{item}</div>
                                    ))}
                                </div>
                                <button onClick={e => {
                                    e.stopPropagation();
                                    window.open(`https://t.me/${item.tg_nick}`, "_blank", "noopener,noreferrer");
                                }}
                                        className="footerButton"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 10,
                                            textDecoration: "none",
                                            gap: 8
                                        }}>Start
                                    conversation <MemoTelegramIcon/></button>
                            </motion.div>
                        ))}
                    </div>) : (
                        <div style={{paddingTop: 12}}>
                            When you get matches, it will appear here
                        </div>
                    )}
                </div>
            </div>) : (
                <ProfileCard onClose={() => setCardData(undefined)} cardData={cardData} disabled={cardData.disabled}
                             refetchLikes={refetchLikes} refetchMatches={refetchMatches}/>)}
        </>
    );
}

export default MenuMatches;
