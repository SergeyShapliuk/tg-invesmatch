import classes from "./MainButtons.module.css";
import MemoReturnIcon from "./svg/ReturnIcon";
import MemoCloseIcon from "./svg/CloseIcon";
import MemoCoinIcon from "./svg/CoinIcon";
import MemoHeartIcon from "./svg/HeartIcon";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
// import {useScreenSize} from "../common/context/ScreenSizeProvider";

type MainButtonsProps = {
    onPrevious: () => void;
    onLogo: () => void;
    logoPercent: string;
    onCoin: () => void;
    onSetDislike: () => void;
    onSetLike: () => void;
    userType: boolean;
    buttonName: "heart" | "dislike" | undefined;
    disabled?: boolean;
}
type ButtonNames = "coin" | "heart" | "previous" | "dislike";

function MainButtons({
                         onPrevious,
                         onLogo,
                         logoPercent,
                         onCoin,
                         onSetDislike,
                         onSetLike,
                         userType,
                         buttonName,
                         disabled
                     }: MainButtonsProps) {
    // const {responseFontSize} = useScreenSize();

    const [isClicked, setIsClicked] = useState<Partial<Record<ButtonNames, boolean>>>({});
    // console.log("currentIndex", currentIndex);
    // useEffect(() => {
    //         let timeout: any;
    //         if (currentIndex > 0) {
    //             timeout = setTimeout(() => {
    //                 if (direction < 0) {
    //                     handleClick("heart");
    //                 } else if (direction > 0) {
    //                     handleClick("dislike");
    //                 }
    //             }, 100);
    //         }
    //         return () => clearTimeout(timeout);
    //     }, [currentIndex, direction]
    // );
    useEffect(() => {
            let timeout: any;
            if (buttonName) {
                timeout = setTimeout(() => {
                    handleClick(buttonName);
                }, 100);
            }
            return () => clearTimeout(timeout);
        }, [buttonName]
    );

    const handleClick = (buttonName: ButtonNames) => {
        console.log("MainButtons", isClicked);
        setIsClicked((prev) => ({...prev, [buttonName]: true}));
        // Добавляем небольшую задержку, чтобы анимация могла запуститься заново
        setTimeout(() => setIsClicked((prev) => ({...prev, [buttonName]: false})), 300);
    };
    return (
        <div style={{
            // position: "relative",
            width: "100%",
            // height:'100%',
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // flexWrap:'wrap',
            // backgroundColor:'red',
            // padding: "150px 14px 24px 14px",
            padding: "0 14px 24px 14px",
            // pointerEvents: "none",
            gap: 10
            // zIndex: 10
        }}>
            <motion.button initial={{opacity: 1, scale: 1}}
                           animate={isClicked["previous"] ? {opacity: .5, scale: .5} : {
                               opacity: 1,
                               scale: 1
                           }}
                           transition={{duration: 0.5}} onClick={() => {
                handleClick("previous");
                onPrevious();
            }} className={classes.buttonContainer}>
                <div className={classes.button} style={{
                    backgroundColor: isClicked["previous"] ? "#0062FF" : "#272727"
                }}>
                    <MemoReturnIcon/>
                </div>
            </motion.button>

            <motion.button disabled={disabled} initial={{opacity: 1, scale: 1}}
                           animate={isClicked["dislike"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                           transition={{duration: 0.5}} onClick={() => {
                handleClick("dislike");
                onSetDislike();
            }} className={classes.buttonContainer}>
                <div className={classes.button} style={{
                    backgroundColor: isClicked["dislike"] ? "#0062FF" : "#272727"
                }}>
                    <MemoCloseIcon/>
                </div>
            </motion.button>
            <div className={classes.buttonContainer}>
                <div onClick={() => {
                    onLogo();
                }} style={{
                    minWidth: 68,
                    height: 68,
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: 21,
                    fontWeight: "600",
                    // lineHeight: 41,
                    borderRadius: "50%",
                    backgroundColor: "#0062FF"
                    // padding:responseFontSize(20)
                }}>{parseInt(logoPercent)}%
                </div>
            </div>

            {userType && <motion.button initial={{opacity: 1, scale: 1}}
                                        animate={isClicked["coin"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                                        transition={{duration: 0.5}} onClick={() => {
                handleClick("coin");
                onCoin();
            }} className={classes.buttonContainer}>
                {/*<Tooltip anchorRef={iconRef} />*/}
                {/*{true && <div style={{*/}
                {/*    position: "absolute",*/}
                {/*    width: "100%",*/}
                {/*    height: "60px",*/}
                {/*    top: "-65px",*/}
                {/*    left:0,*/}
                {/*    display: "flex",*/}
                {/*    justifyContent: "center",*/}
                {/*    alignItems: "center",*/}
                {/*    backgroundColor: "#286EF2",*/}
                {/*    borderRadius: "7px"*/}
                {/*}}>*/}
                {/*    fsd*/}
                {/*    <div style={{*/}
                {/*        position: "absolute",*/}
                {/*        width: 0,*/}
                {/*        height: 0,*/}
                {/*        bottom: "-8px",*/}
                {/*        left: "50%",*/}
                {/*        transform: "translateX(-50%)",*/}
                {/*        borderLeft: "10px solid transparent",*/}
                {/*        borderRight: "10px solid transparent",*/}
                {/*        borderTop: "10px solid #286EF2"*/}
                {/*    }}/>*/}
                {/*</div>}*/}
                <div className={classes.button} style={{
                    backgroundColor: isClicked["coin"] ? "#0062FF" : "#272727"
                }}>
                    <MemoCoinIcon/>
                </div>
            </motion.button>}
            <motion.button disabled={disabled} initial={{opacity: 1, scale: 1}}
                           animate={isClicked["heart"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                           transition={{duration: 0.5}} onClick={() => {
                handleClick("heart");
                onSetLike();
            }} className={classes.buttonContainer} style={{width: !userType ? "42.5%" : "20%"}}>
                <div className={classes.button} style={{
                    flex: !userType ? 1 : undefined,
                    backgroundColor: isClicked["heart"] ? "#0062FF" : "#272727"
                }}>
                    <MemoHeartIcon fill={"#0062FF"}/>
                </div>
            </motion.button>

        </div>
    );
}

export default MainButtons;
