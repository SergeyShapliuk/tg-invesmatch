import classes from "./Match.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import {useNavigate} from "react-router-dom";
import MemoCloseIcon from "../../components/svg/CloseIcon";
import MemoTelegramIcon from "../../components/svg/TelegramIcon";


function Match() {
    const navigate = useNavigate();
    const {responseFontSize} = useScreenSize();
    return (
        <div className={classes.container}>
            <div className="icon-style" style={{position: "absolute", top: 12, right: 12}}>
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
                    TapTable is ready to chat Feel free to start a conversation
                </div>
                <div className={classes.relevance}>
                    70%
                </div>
                <div className={classes.name}
                     style={{fontSize: responseFontSize(24), lineHeight: responseFontSize(32)}}>
                    TapTable x Yandex
                </div>
            </div>

            <div className={classes.buttonContainer}>
                <button className="footerButton" onClick={() => navigate("/profile/create")}
                        style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 8}}>Start
                    conversation <MemoTelegramIcon/></button>
                <button className="footerButton" onClick={() => navigate("/profile/create")}
                        style={{backgroundColor: "#272727"}}>Continue exploring
                </button>
            </div>
        </div>

    );
}

export default Match;
