import classes from "./ListLikes.module.css";
import {useFetchLikes} from "../../api/hooks/useFetchLikes";
import {initInitData} from "@telegram-apps/sdk-react";
import {useEffect, useState} from "react";
import {User} from "../../types/types";
import ProfileCard from "./ProfileCard";
import {useNavigate} from "react-router-dom";
import MemoCloseIcon from "../../components/svg/CloseIcon";
import MemoHeartIcon from "../../components/svg/HeartIcon";
import {motion} from "framer-motion";
import {useSetLike} from "../../api/hooks/useSetLike";
import Match from "../match/Match";
import {FadeLoader} from "react-spinners";
import {override} from "../../App";

// const list = [
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"},
//     {title: "Tap-Table", nick: "@kjkljlk"}
// ];

function ListLikes() {
    const initData = initInitData();
    const navigate = useNavigate();

    const {mutate: setLike, data, status: statusSetLike} = useSetLike();

    const {data: likes, refetch: refetchLikes} = useFetchLikes(initData?.user?.id.toString() ?? "test");
    console.log("ListLikes", likes);

    const [cardData, setCardData] = useState<User | undefined>();
    const [matchData, setMatchData] = useState<User | undefined>();
    const [match, setMatch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (data && data.match) {
            refetchLikes();
            setMatch(true);
        }
    }, [data]);

    useEffect(() => {
        if (statusSetLike !== "idle" && statusSetLike !== "pending") {
            setLoading(false);
        }
    }, [statusSetLike]);
    ;

    const handleSetLike = (tg_id: string) => {
        setLoading(true);
        setLike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: tg_id ?? "test"
        });
    };

    const onCloseMatch = () => {
        setMatch(false);
    };

    return (
        match && matchData ? (<Match onClose={onCloseMatch} currentItem={{user: matchData, relevance: 1000}}/>) : (
            <>
                {!cardData ? (<div className={classes.container}>
                    <FadeLoader color={"rgb(49,125,148)"} cssOverride={override}
                                loading={loading}/>
                    <div className={classes.title}>
                        Liked you
                    </div>
                    <div onClick={() => navigate(-1)} className="icon-style"
                         style={{position: "absolute", top: 12, right: 12}}>
                        <MemoCloseIcon color={"rgba(255,255,255,0.45)"}/>
                    </div>
                    <div className={classes.listLikes}>
                        {likes?.users?.map((item, index) => (
                            <motion.div key={index}
                                        whileTap={{scale: 0.95}}
                                        onTap={event => {
                                            const target = event.target as Element;
                                            if (target.closest(".footerButton")) {
                                                // Если клик произошел по кнопке, игнорируем событие
                                                return;
                                            }
                                            setCardData(item);
                                        }}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            backgroundColor: "#FFFFFF1F",
                                            borderRadius: "24px",
                                            padding: "12px 16px 16px 16px",
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
                                <motion.div whileTap={{scale: 0.95}}
                                            onTap={event => {
                                                event.stopPropagation();
                                                handleSetLike(item.tg_id);
                                                setMatchData(item);
                                            }}
                                            className="footerButton"
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginTop: 10,
                                                gap: 8
                                            }}>Like back <MemoHeartIcon width={28} fill={"#FFFFFF"}/></motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>) : (
                    <ProfileCard onClose={() => setCardData(undefined)} cardData={cardData}/>)}
            </>
        ));
}

export default ListLikes;
