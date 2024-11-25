import classes from "./OnBoarding.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import {useNavigate} from "react-router-dom";


function OnBoarding() {
    const navigate = useNavigate();
    const {responseFontSize} = useScreenSize();
    return (
        <div className={classes.container}>
            <div className={classes.titleContainer}>
                {/*<div style={{color: "#FFFFFF"}}>*/}
                {/*    Icon*/}
                {/*</div>*/}
                <div className={classes.title}
                     style={{fontSize: responseFontSize(60), lineHeight: responseFontSize(58)}}>
                    Match
                    Connect
                    Build
                </div>
                <div className={classes.subTitle}
                     style={{fontSize: responseFontSize(16), lineHeight: responseFontSize(22)}}>
                    Swipe to Connect Founders and Investors: Discover the perfect match to bring your vision to life
                </div>
            </div>

            <div className={classes.buttonContainer}>
                <button className="footerButton" onClick={() => navigate("/profile/create")}>Continue</button>
            </div>
        </div>

    );
}

export default OnBoarding;
