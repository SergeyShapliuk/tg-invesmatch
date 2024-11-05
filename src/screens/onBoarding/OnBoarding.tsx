import classes from "./OnBoarding.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import {useNavigate} from "react-router-dom";


function OnBoarding() {
    const navigate = useNavigate();
    const {responseFontSize} = useScreenSize();
    return (
        <div className={classes.container}>
            <div className={classes.titleContainer}>
                <div style={{color: "#fff"}}>
                    Icon
                </div>
                <div className={classes.title}
                     style={{fontSize: responseFontSize(72), lineHeight: responseFontSize(77)}}>
                    Invest.
                    Founder.
                    Chettam.
                </div>
                <div className={classes.subTitle}
                     style={{fontSize: responseFontSize(16), lineHeight: responseFontSize(19)}}>
                    A platform that connects investors and funders so that everyone can find their ideal project or
                    partner.
                </div>
            </div>

            <div className={classes.buttonContainer}>
                <button className="footerButton" onClick={() => navigate("/profile/create")}>Continue</button>
            </div>
        </div>

    );
}

export default OnBoarding;
