import classes from "./Match.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import MemoCloseIcon from "../../components/svg/CloseIcon";
import MemoTelegramIcon from "../../components/svg/TelegramIcon";
import {User} from "../../types/types";
import {useUserData} from "../../common/context/UserProvider";
import {useRelevance} from "../../api/hooks/useRelevance";
import {useEffect} from "react";
import {initInitData} from "@telegram-apps/sdk-react";

type MatchProps = {
    currentItem: { relevance: number; user: User };
    onClose: () => void;
}

function Match({currentItem, onClose}: MatchProps) {
    const initData = initInitData();
    // const navigate = useNavigate();
    const {responseFontSize} = useScreenSize();
    const {userData} = useUserData();

    const {mutate: getRelevance, data: relevance} = useRelevance();

    useEffect(() => {
        getRelevance({
            tg_id: initData?.user?.id.toString() ?? "test",
            user_tg_id: currentItem?.user?.tg_id.toString() ?? ""
        });
    }, []);
    // console.log("Match", currentItem);

    return (
        <div className={classes.container}>
            <div onClick={onClose} className="icon-style" style={{position: "absolute", top: 12, right: 12}}>
                <MemoCloseIcon color={"rgba(255,255,255,0.45)"}/>
            </div>
            <div className={classes.titleContainer}>
                {/*<div style={{color: "#FFFFFF"}}>*/}
                {/*    Icon*/}
                {/*</div>*/}
                <div className={classes.title}
                     style={{fontSize: responseFontSize(38), lineHeight: responseFontSize(40)}}>
                    It’s a match!
                </div>
                <div className={classes.subTitle}
                     style={{fontSize: responseFontSize(16), lineHeight: responseFontSize(22)}}>
                    {`${userData?.name} is ready to chat Feel free to start a conversation`}
                </div>
                <div className={classes.relevance}>
                    {relevance?.data?.toString() ?? "0"}%
                </div>
                <div className={classes.name}
                     style={{fontSize: responseFontSize(24), lineHeight: responseFontSize(32)}}>
                    {`${userData?.name} x ${currentItem.user.name}`}
                </div>
            </div>

            <div className={classes.buttonContainer}>
                <a href={`https://t.me/${currentItem.user.tg_nick}`} target="_blank"
                   rel="noopener noreferrer" className="footerButton"
                   style={{
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                       marginTop: 10,
                       textDecoration: "none",
                       gap: 8
                   }}>Start
                    conversation <MemoTelegramIcon/></a>
                <button className="footerButton" onClick={onClose}
                        style={{backgroundColor: "#272727"}}>Continue exploring
                </button>
            </div>
        </div>

    );
}

export default Match;
