import MemoReturnIcon from "./svg/ReturnIcon";
import MemoCloseIcon from "./svg/CloseIcon";
import MemoCoinIcon from "./svg/CoinIcon";
import MemoHeartIcon from "./svg/HeartIcon";
import {motion} from "framer-motion";
import {useState} from "react";
// import {useScreenSize} from "../common/context/ScreenSizeProvider";

type ButtonNames = "coin" | "heart" | "previous" | "dislike";

function MainButtons({onPrevious, onLogo, logoPercent, onCoin, onSetDislike, onSetLike, userType}: any) {
    // const {responseFontSize} = useScreenSize();

    const [isClicked, setIsClicked] = useState<Partial<Record<ButtonNames, boolean>>>({});

    const handleClick = (buttonName: ButtonNames) => {
        setIsClicked((prev) => ({...prev, [buttonName]: true}));
        // Добавляем небольшую задержку, чтобы анимация могла запуститься заново
        setTimeout(() => setIsClicked((prev) => ({...prev, [buttonName]: false})), 100);
    };
    return (
        <div style={{
            position: "relative",
            width: "100%",
            // height:'100%',
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // flexWrap:'wrap',
            // backgroundColor:'red',
            borderBottomLeftRadius: "32px",
            borderBottomRightRadius: "32px",
            background: "linear-gradient(to bottom, rgba(9, 9, 9, 0), rgba(9, 9, 9, 0.8), rgba(9, 9, 9, 1) 70%)",
            padding: "150px 14px 24px 14px",
            pointerEvents: "none",
            gap: 10,
            zIndex: 3
        }}>
            <motion.div initial={{opacity: 1, scale: 1}}
                        animate={isClicked["previous"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}} onClick={() => {
                handleClick("previous");
                onPrevious();
            }} style={{width: "20%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <MemoReturnIcon backgroundColor={isClicked["previous"] ? "#286EF2" : "#FFFFFF1F"}/>
            </motion.div>

            <motion.div initial={{opacity: 1, scale: 1}}
                        animate={isClicked["dislike"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}} onClick={() => {
                handleClick("dislike");
                onSetDislike();
            }} style={{width: "20%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <MemoCloseIcon backgroundColor={isClicked["dislike"] ? "#286EF2" : "#FFFFFF1F"}/>
            </motion.div>
            <div style={{width: "20%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div onClick={() => {
                    onLogo();
                }} style={{
                    minWidth: 68,
                    height: 68,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: 21,
                    fontWeight: "600",
                    lineHeight: 41,
                    borderRadius: "50%",
                    backgroundColor: "#0062FF"
                    // padding:responseFontSize(20)
                }}>{parseInt(logoPercent)}%
                </div>
            </div>

            {userType && <motion.div initial={{opacity: 1, scale: 1}}
                                     animate={isClicked["coin"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                                     transition={{duration: 0.5}} onClick={() => {
                handleClick("coin");
                onCoin();
            }} style={{width: "20%",display: "flex", justifyContent: "center", alignItems: "center"}}>
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
                <MemoCoinIcon backgroundColor={isClicked["coin"] ? "#286EF2" : "#FFFFFF1F"}/>
            </motion.div>}
            <motion.div initial={{opacity: 1, scale: 1}}
                        animate={isClicked["heart"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}} onClick={() => {
                handleClick("heart");
                onSetLike();
            }} style={{
                width: !userType ? "42.5%" : "20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <MemoHeartIcon userType={userType} stroke={isClicked["heart"] ? "#286EF2" : "#FFFFFF1F"}/>
            </motion.div>

        </div>
    );
}

export default MainButtons;
