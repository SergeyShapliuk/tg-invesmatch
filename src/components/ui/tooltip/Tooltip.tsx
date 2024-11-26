import classes from "./Tooltip.module.css";
import {useEffect, useRef} from "react";
import {useScreenSize} from "../../../common/context/ScreenSizeProvider";
import MemoCopyIcon from "../../svg/CopyIcon";
import {motion} from "framer-motion";
import {initHapticFeedback} from "@telegram-apps/sdk-react";

function Tooltip({title, text, close, percent, width, bottom, color}: any) {
    const hapticFeedback = initHapticFeedback();
    const {responseFontSize} = useScreenSize();
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (title && tooltipRef.current) {
            // const buttonRect = anchorRef.current.getBoundingClientRect();
            // const tooltipRect = tooltipRef.current.getBoundingClientRect();
            // tooltipRef.current.style.top = `${iconRect.top - 50}px`; // Располагаем тултип над иконкой
            // tooltipRef.current.style.left = `${iconRect.left}px`;    // Начинаем тултип с иконки
            tooltipRef.current.style.setProperty("--percent", percent);
            tooltipRef.current.style.setProperty("--width", width);
            tooltipRef.current.style.setProperty("--bottom", bottom);
            // tooltipRef.current.style.setProperty("--color", color);
        }
    }, [percent, color]);

    const copyClicked = async () => {
        try {
            await navigator.clipboard.writeText(`${text} \n Send donation. 🚀`);
            // setState("success");
            // setOpen(false);
            hapticFeedback.notificationOccurred("success");
            close();
        } catch (err) {
            // onError && onError(err);
            console.log("copyError", err);
            // setState("error");
        }
    };

    return (
        <div ref={tooltipRef} className={classes.tooltip}>
            <div>
                <div style={{
                    color: "#EFEFEF",
                    fontSize: responseFontSize(16),
                    fontWeight: 500,
                    lineHeight: responseFontSize(22),
                    textAlign: text ? "left" : "center"
                }}>{title}</div>
                <div style={{fontSize: responseFontSize(16), lineHeight: responseFontSize(22)}}>{text}</div>
            </div>
            {title === "Wallet:" && <motion.div onClick={copyClicked} whileTap={{scale: 0.95}} className={classes.copy}>
                <MemoCopyIcon/>
            </motion.div>}
        </div>
    );
}

export default Tooltip;

// function CloseIcon({close, color}: {close: () => void, color: string}) {

//     return (
//         <div onClick={close} style={{position: "absolute", top: 5, right: 10, zIndex: 1, pointerEvents: "auto"}}>
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width={14}
//                 // height={24}
//                 viewBox="0 0 24 24"
//                 fill="none"
//             >
//                 <path
//                     stroke={color}
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2.328}
//                     d="m20.366 20.366-8.729-8.728m0 0L2.91 2.909m8.729 8.729 8.728-8.729m-8.729 8.729L2.91 20.366"
//                 />
//             </svg>
//         </div>
//     );
// }
