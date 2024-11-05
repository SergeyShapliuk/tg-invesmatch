import classes from "./CreateProfile.module.css";
import {useScreenSize} from "../../../common/context/ScreenSizeProvider";
import {useNavigate} from "react-router-dom";

function CreateProfile({title}: { title: string }) {
    const navigate = useNavigate();
    const {responseFontSize} = useScreenSize();
    return (
        <div className={classes.container}>
            <div className={classes.title} style={{fontSize: responseFontSize(49), lineHeight: responseFontSize(49)}}>
                {title}
            </div>
            <div className={classes.subTitle}
                 style={{fontSize: responseFontSize(24), lineHeight: responseFontSize(24)}}>
                fill it out to get started
            </div>
            <div className={classes.buttonContainer}>
                <button className="footerButton" onClick={() => navigate("/profile/save")}>Create profile</button>
            </div>
        </div>

    );
}

export default CreateProfile;
