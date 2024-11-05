import classes from "./LikeCard.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import MemoLogoIcon from "../../components/svg/LogoIcon";
import {useEffect, useState} from "react";
import {User} from "../../types/types";
import {Sheet} from "react-modal-sheet";


function LikeCard({cardData, onClose}: { cardData: User | null, onClose: () => void }) {
    const {responseFontSize} = useScreenSize();


    const [hashTags, setHashTags] = useState<string[]>([]);

    console.log("cardData", cardData);

    useEffect(() => {
        if (cardData) {
            const hashTagsConcat = [...cardData.business_models, ...cardData.geography, ...cardData.industries, ...cardData.project_stages, ...cardData.user_types];
            setHashTags(hashTagsConcat);
        }

    }, [cardData]);
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
        <Sheet isOpen onClose={onClose} disableDrag style={{}}>
            <Sheet.Container style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                // alignItems: "flex-start",
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
                backgroundColor: "black",
                padding: "73px 25px 19px 25px"

            }}>
                <div className="iconContainer">
                    <MemoLogoIcon fill={"#FFFFFF"} stroke={"#FFFFFF"}/>
                </div>
                <Sheet.Scroller style={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    paddingBottom: 25,
                    gap: 24
                }}>
                    <div onClick={onClose} style={{
                        position: "absolute",
                        width: 29,
                        height: 29,
                        top: 20,
                        right: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50,
                        backgroundColor: "rgba(255,255,255,0.3)"
                        // padding: 7
                    }}>
                        <CloseIcon color={"rgba(255,255,255,0.45)"}/>
                    </div>
                    <div className={classes.name}
                         style={{fontSize: responseFontSize(48), lineHeight: responseFontSize(45)}}>
                        {cardData?.name}
                    </div>
                    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3}}>
                        {hashTags.map((item, index) => (
                            <div key={index} className="hashButton"
                                 style={{backgroundColor: "#286EF2"}}>#{item}</div>
                        ))}
                    </div>
                    <div>
                        <div style={{
                            color: "#FFFFFF",
                            fontSize: responseFontSize(24),
                            fontWeight: "600",
                            lineHeight: responseFontSize(31),
                            letterSpacing: -0.04
                        }}>Description
                        </div>
                        <div>{cardData?.description}</div>
                    </div>
                </Sheet.Scroller>
            </Sheet.Container>
            <Sheet.Backdrop style={{backgroundColor: "#FFFFFF"}}/>
        </Sheet>
    );
}

export default LikeCard;

function CloseIcon({color}: { color: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            // height={24}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.328}
                d="m20.366 20.366-8.729-8.728m0 0L2.91 2.909m8.729 8.729 8.728-8.729m-8.729 8.729L2.91 20.366"
            />
        </svg>
    );
}
