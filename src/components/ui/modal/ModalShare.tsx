import {Sheet} from "react-modal-sheet";
import ItemProfile from "../../main/ItemProfile";
import Tooltip from "../tooltip/Tooltip";
import MainButtons from "../../MainButtons";
import {useEffect, useState} from "react";
import {User} from "../../../types/types";
import {useSetLike} from "../../../api/hooks/useSetLike";
import {useSetDislike} from "../../../api/hooks/useSetDislike";
import {initInitData} from "@telegram-apps/sdk-react";
import MemoCloseIcon from "../../svg/CloseIcon";
import {FadeLoader} from "react-spinners";
import {override} from "../../../App";


function ModalShare({
                        isOpen,
                        onClose,
                        user

                    }: {
    isOpen: boolean, onClose: () => void, user: User | undefined
}) {
    const initData = initInitData();
    // const {userData} = useUserData();
    const {mutate: setLike, status: statusLike} = useSetLike();
    const {mutate: setDislike, status: statusDislike} = useSetDislike();

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
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if ((statusLike !== "idle" && statusLike !== "pending") || (statusDislike !== "idle" && statusDislike !== "pending")) {
            setLoading(false);
        }
        if (statusLike === "success" || statusDislike === "success") {
            onClose();
        }
    }, [statusLike, statusDislike]);

    const handleSetDislike = () => {
        setLoading(true);
        setDislike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: user?.tg_id ?? "test"
        });
        setButtonName("dislike");
    };

    const handleSetLike = () => {
        setLoading(true);
        setLike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: user?.tg_id ?? "test"
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


    console.log("ModalShare", user);
    return (

        <Sheet isOpen={isOpen} onClose={onClose} disableDrag style={{}}>
            <FadeLoader color={"rgb(49,125,148)"} cssOverride={override}
                        loading={loading}/>
            <Sheet.Container style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
                backgroundColor: "#090909"
            }}>
                <Sheet.Scroller
                    style={{display: "flex", flexDirection: "column", paddingBottom: 25}}>
                    <div style={{
                        position: "absolute",
                        display: "flex",
                        top: 12,
                        right: 12,
                        zIndex: 3
                    }}>
                        <button onClick={onClose}
                                className="icon-style">
                            <MemoCloseIcon/>
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
                    <ItemProfile item={user}
                                 blur={open.isActive}
                                 onCloseToolTip={onCloseTooltip}/>
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        maxWidth: 500,
                        left: "50%",
                        bottom: 0,
                        transform: "translate(-50%, 0)",
                        zIndex: 3
                    }}
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
                                     logoPercent={"1000%"}
                                     onCoin={() => setOpen({
                                         title: "Wallet:",
                                         text: user?.wallet ?? "No wallet",
                                         percent: "72%",
                                         width: "89%",
                                         bottom: "110px",
                                         color: "#FFFFFF",
                                         isActive: true
                                     })}

                                     onSetLike={handleSetLike}
                                     userType={!!user?.user_types?.some(tag => tag.toLowerCase() === "founder")}
                                     buttonName={buttonName}/>
                    </div>
                </Sheet.Scroller>
            </Sheet.Container>
            <Sheet.Backdrop style={{backgroundColor: "#1A1A1B"}}/>
        </Sheet>

    );
}

export default ModalShare;

