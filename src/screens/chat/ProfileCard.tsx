import classes from "./ProfileCard.module.css";
import {useEffect, useState} from "react";
import {User} from "../../types/types";
import MemoShareIcon from "../../components/svg/ShareIcon";
import ItemProfile from "../../components/main/ItemProfile";
import Tooltip from "../../components/ui/tooltip/Tooltip";
import MainButtons from "../../components/MainButtons";
import {useSetLike} from "../../api/hooks/useSetLike";
import {useSetDislike} from "../../api/hooks/useSetDislike";
import {initInitData} from "@telegram-apps/sdk-react";
import MemoCloseIcon from "../../components/svg/CloseIcon";
import Match from "../match/Match";
import {FadeLoader} from "react-spinners";
import {override} from "../../App";
import {useRelevance} from "../../api/hooks/useRelevance";


function ProfileCard({
                         cardData,
                         onClose,
                         refetchLikes,
                         refetchMatches,
                         disabled

                     }: { cardData: User, onClose: () => void, refetchLikes?: () => void, refetchMatches?: () => void, disabled?: boolean }) {
    const initData = initInitData();
    // const {responseFontSize} = useScreenSize();

    const {mutate: setLike, data, status: statusSetLike} = useSetLike();
    const {mutate: setDislike, status: statusSetDisLike} = useSetDislike();
    const {mutate: getRelevance, data: relevance} = useRelevance();

    // const [hashTags, setHashTags] = useState<string[]>([]);
    const [open, setOpen] = useState<{ title: string, text: string, percent: string, width: string | undefined, bottom: string, color: string, isActive: boolean }>({
        title: "",
        text: "",
        percent: "",
        width: "",
        bottom: "",
        color: "",
        isActive: false
    });
    const [buttonName, setButtonName] = useState<"heart" | "dislike">();
    const [match, setMatch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // console.log("ProfileCardsetLike", relevance);

    useEffect(() => {
        return onCloseTooltip();
    }, []);

    useEffect(() => {
        getRelevance({tg_id: initData?.user?.id.toString() ?? "test", user_tg_id: cardData?.tg_id.toString() ?? ""});
    }, []);

    useEffect(() => {
        if (data && data.match) {
            setMatch(true);
        }
    }, [data]);

    useEffect(() => {
        if (statusSetLike !== "idle" && statusSetLike !== "pending") {
            setLoading(false);
        } else if (statusSetDisLike !== "idle" && statusSetDisLike !== "pending") {
            refetchLikes && refetchLikes();
            setLoading(false);
            onClose();
        }
    }, [statusSetLike, statusSetDisLike]);

    const handleSetLike = () => {
        setLoading(true);
        setLike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: cardData?.tg_id ?? "test"
        });
        setButtonName("heart");
    };

    const handleSetDislike = () => {
        setLoading(true);
        setDislike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: cardData?.tg_id ?? "test"
        });
        setButtonName("dislike");
    };

    const onCloseTooltip = () => {
        setOpen({
            title: "",
            text: "",
            percent: "",
            width: "",
            bottom: "",
            color: "",
            isActive: false
        });
    };

    const onCloseMatch = () => {
        refetchLikes && refetchLikes();
        refetchMatches && refetchMatches();
        onClose();
    };

    // useEffect(() => {
    //     if (cardData) {
    //         const hashTagsConcat = [...cardData.business_models, ...cardData.geography, ...cardData.industries, ...cardData.project_stages, ...cardData.user_types];
    //         setHashTags(hashTagsConcat);
    //     }
    //
    // }, [cardData]);
    // useEffect(() => {
    //     if (userData) {
    //         const initialData = Object.entries(userData)
    //             .filter(([, value]) => Array.isArray(value)) // Отбираем только массивы
    //             .map(([key, value]) => ({
    //                 type_value: key,
    //                 values: value.map((item, index) => ({id: index + 1, value: item}))
    //             }));
    //         setProfile(initialData);
    //     }
    //
    // }, [userData]););

    // console.log("userData", userData);

    return (

        match ? (<Match onClose={onCloseMatch} currentItem={{user: cardData, relevance: 1000}}/>) : (
            <div className={classes.container}>
                <FadeLoader color={"rgb(49,125,148)"} cssOverride={override}
                            loading={loading}/>
                <div className={classes.scrollContainer}>
                    <div className={classes.filterContainer}>
                        <button onClick={() => {
                        }}
                                className="icon-style">
                            <MemoShareIcon/>
                        </button>
                        <button onClick={onClose}
                                className="icon-style">
                            <MemoCloseIcon color={"rgba(255,255,255,0.45)"}/>
                        </button>
                    </div>
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "50%",
                        background: "linear-gradient(to bottom, rgba(9, 9, 9, 0), rgba(9, 9, 9, 0.8), rgba(9, 9, 9, 1) 100%)",
                        bottom: 0,
                        borderBottomLeftRadius: "32px",
                        borderBottomRightRadius: "32px",
                        zIndex: 3,
                        pointerEvents: "none"
                    }}/>
                    <ItemProfile item={cardData}
                                 blur={open.isActive}
                                 onCloseToolTip={onCloseTooltip}/>
                    <div className={classes.buttonsContainer}
                        // style={{pointerEvents:  "none"}}
                    >
                        {open.isActive && <Tooltip title={open.title} text={open.text}
                                                   close={onCloseTooltip}
                                                   percent={open.percent}
                                                   width={open.width}
                                                   bottom={open.bottom}
                                                   color={open.color}/>}
                        <MainButtons onPrevious={onClose} onSetDislike={handleSetDislike}
                                     onLogo={() => setOpen({
                                         title: "Your compatibility",
                                         text: "",
                                         percent: "50%",
                                         width: undefined,
                                         bottom: "120px",
                                         color: "#286EF2",
                                         isActive: true
                                     })}
                                     logoPercent={relevance?.data?.toString() ?? "0"}
                                     onCoin={() => setOpen({
                                         title: "Wallet:",
                                         text: cardData?.wallet ?? "No wallet",
                                         percent: "72%",
                                         width: "89%",
                                         bottom: "110px",
                                         color: "#FFFFFF",
                                         isActive: true
                                     })}

                                     onSetLike={handleSetLike}
                                     userType={cardData?.user_types?.some(tag => tag.toLowerCase() === "founder")}
                                     buttonName={buttonName}
                                     disabled={disabled}/>

                    </div>
                </div>
            </div>

        ));
}

export default ProfileCard;

