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


function ProfileCard({cardData, onClose, disabled}: { cardData: User, onClose: () => void, disabled?: boolean }) {
    const initData = initInitData();
    // const {responseFontSize} = useScreenSize();

    const {mutate: setLike} = useSetLike();
    const {mutate: setDislike} = useSetDislike();

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

    console.log("cardData", cardData);

    useEffect(() => {
        return onCloseTooltip();
    }, []);

    const handleSetDislike = () => {
        setDislike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: cardData?.tg_id ?? "test"
        });
        setButtonName("dislike");
    };

    const handleSetLike = () => {
        setLike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: cardData?.tg_id ?? "test"
        });
        setButtonName("heart");
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
        <div className={classes.container}>
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
                                 logoPercent={"хуй%"}
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
    );
}

export default ProfileCard;

