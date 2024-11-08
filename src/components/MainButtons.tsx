import MemoReturnIcon from "./svg/ReturnIcon";
import MemoCloseIcon from "./svg/CloseIcon";
import MemoLogoIcon from "./svg/LogoIcon";
import MemoCoinIcon from "./svg/CoinIcon";
import MemoHeartIcon from "./svg/HeartIcon";
import {motion} from "framer-motion";
import {useState} from "react";

type ButtonNames = "coin" | "heart" | "previous" | "dislike";

function MainButtons({onPrevious, onLogo, logoPercent, onCoin, onSetDislike, onSetLike}: any) {

    const [isClicked, setIsClicked] = useState<Partial<Record<ButtonNames, boolean>>>({});

    const handleClick = (buttonName: ButtonNames) => {
        setIsClicked((prev) => ({...prev, [buttonName]: true}));
        // Добавляем небольшую задержку, чтобы анимация могла запуститься заново
        setTimeout(() => setIsClicked((prev) => ({...prev, [buttonName]: false})), 100);
    };
    return (
        <div style={{
            width: "100%",
            // height:'200px',
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            // backgroundColor: "#000000",
            padding: "15px 14px 0 14px"
        }}>
            <motion.div initial={{opacity: 1, scale: 1}}
                        animate={isClicked["previous"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}} onClick={() => {
                handleClick("previous");
                onPrevious();
            }}>
                <MemoReturnIcon backgroundColor={isClicked["previous"] ? "#286EF2" : "#FFFFFF"}/>
            </motion.div>

            <motion.div initial={{opacity: 1, scale: 1}}
                        animate={isClicked["dislike"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}} onClick={() => {
                handleClick("dislike");
                onSetDislike();
            }}>
                <MemoCloseIcon backgroundColor={isClicked["dislike"] ? "#286EF2" : "#FFFFFF"}/>
            </motion.div>

            <div onClick={() => {
                onLogo();
            }} style={{
                position: "relative",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MemoLogoIcon fill={"#286EF2"} stroke={"#286EF2"}/>
                <div style={{position: "absolute", color: "black"}}>{parseInt(logoPercent)}%</div>

            </div>
            <motion.div initial={{opacity: 1, scale: 1}}
                        animate={isClicked["coin"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}} onClick={() => {
                handleClick("coin");
                onCoin();
            }} style={{
                position: "relative",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2
            }}>
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
                <MemoCoinIcon backgroundColor={isClicked["coin"] ? "#286EF2" : "#FFFFFF"}/>
            </motion.div>
            <motion.div initial={{opacity: 1, scale: 1}}
                        animate={isClicked["heart"] ? {opacity: .5, scale: .5} : {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}} onClick={() => {
                handleClick("heart");
                onSetLike();
            }}>
                <MemoHeartIcon stroke={isClicked["heart"] ? "#286EF2" : "#FFFFFF"}/>
            </motion.div>

        </div>
    );
}

export default MainButtons;
