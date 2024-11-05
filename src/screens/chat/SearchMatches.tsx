import classes from "./SearchMatches.module.css";
import {useNavigate} from "react-router-dom";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import {useFetchMatches} from "../../api/hooks/useFetchMatchs";
import {useFetchLikes} from "../../api/hooks/useFetchLikes";
import {initInitData} from "@telegram-apps/sdk-react";
import {FadeLoader} from "react-spinners";
import {override} from "../../App";
import {useEffect} from "react";


function SearchMatches() {
    const initData = initInitData();
    const navigate = useNavigate();
    const {responseFontSize} = useScreenSize();

    const {data: matches, isFetched: isFetchedMatches} = useFetchMatches(initData?.user?.id.toString() ?? "test", "always");
    const {data: likes, isFetched: isFetchedLikes} = useFetchLikes(initData?.user?.id.toString() ?? "test", "always");

    useEffect(() => {
        if (isFetchedMatches && isFetchedLikes) {
            if (matches && matches?.users?.length > 0 || likes && likes?.users?.length > 0) {
                navigate("/chat/menu");
            }
        }

    }, [isFetchedMatches, isFetchedLikes, matches, likes]);

    return (
        <div className={classes.container}>
            {!isFetchedMatches && !isFetchedLikes &&
            <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading/>}
            {matches?.users?.length === 0 && likes?.users?.length === 0 && <>
                <div className={classes.title}
                     style={{fontSize: responseFontSize(49), lineHeight: responseFontSize(49)}}>
                    You don't have a match
                </div>

                <div className={classes.subTitle}
                     style={{fontSize: responseFontSize(24), lineHeight: responseFontSize(24)}}>
                    fill it out to get started
                </div>
                <div className={classes.buttonContainer}>
                    <button className="footerButton" onClick={() => navigate("/main")}>Search</button>
                </div>
            </>}
        </div>

    );
}

export default SearchMatches;
