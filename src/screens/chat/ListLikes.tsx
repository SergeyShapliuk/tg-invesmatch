import classes from "./ListLikes.module.css";
import MemoArrowIcon from "../../components/svg/ArrowIcon";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import {useFetchLikes} from "../../api/hooks/useFetchLikes";
import {initInitData} from "@telegram-apps/sdk-react";
import {useState} from "react";
import {User} from "../../types/types";
import LikeCard from "./LikeCard";
import {useNavigate} from "react-router-dom";

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
    const {responseFontSize} = useScreenSize();

    const [cardData, setCardData] = useState<User | null>(null);
    // const [isOpenCard, setOpenCard] = useState<boolean>(false);

    const {data: likes} = useFetchLikes(initData?.user?.id.toString() ?? "test");

    return (
        <>
            <div className={classes.container}>
                <div onClick={() => navigate(-1)} style={{
                    width: 29,
                    height: 29,
                    minHeight: 29,
                    minWidth: 29,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: 50,
                    boxSizing: "border-box"
                }}>
                    <MemoArrowIcon stroke={"#FFFFFF"}/>
                </div>
                <div className={classes.title}
                     style={{fontSize: responseFontSize(49), lineHeight: responseFontSize(49)}}>
                    Likes
                </div>
                <div className={classes.listMatches}>
                    {likes?.users?.map((item, index) => (
                        <div key={index} onClick={() => setCardData(item)} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottomColor: "rgba(255,255,255,0.4)",
                            borderBottomWidth: "1px",
                            borderBottomStyle: "solid",
                            paddingTop: "17px",
                            paddingBottom: "17px",
                            textDecoration: "none"
                        }}>
                            <div>
                                <div className={classes.companyName}>{item.name}</div>
                                {/*<div className={classes.nick}>{item.nick}</div>*/}
                            </div>
                            <div style={{
                                width: 29,
                                height: 29,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#286EF2",
                                borderRadius: 50
                            }}>
                                <MemoArrowIcon stroke={"#FFFFFF"} style={{transform: "rotate(180deg)"}}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {cardData && (<LikeCard onClose={() => setCardData(null)} cardData={cardData}/>)}
        </>
    );
}

export default ListLikes;
