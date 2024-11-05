import classes from "./Tooltip.module.css";
import {useEffect, useRef} from "react";
import {useScreenSize} from "../../../common/context/ScreenSizeProvider";

function Tooltip({title, text, close, percent, color}: any) {
    const {responseFontSize} = useScreenSize();
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (title && tooltipRef.current) {
            // const iconRect = anchorRef.current.getBoundingClientRect();
            // tooltipRef.current.style.top = `${iconRect.top - 50}px`; // Располагаем тултип над иконкой
            // tooltipRef.current.style.left = `${iconRect.left}px`;    // Начинаем тултип с иконки
            tooltipRef.current.style.setProperty("--percent", percent);
            tooltipRef.current.style.setProperty("--color", color);
        }
    }, [percent, color]);
    return (
        <div ref={tooltipRef} className={classes.tooltip} style={{
            color: text ? "#286EF2" : "#FFFFFF",
            fontSize: responseFontSize(24),
            fontWeight: 600,
            lineHeight: responseFontSize(30),
            textAlign: text ? "left" : "center"
        }}>
            {title}
            <div style={{fontSize: responseFontSize(16), lineHeight: responseFontSize(20)}}>{text}</div>
            <CloseIcon close={close} color={text ? "#286EF2" : "#FFFFFF"}/>
        </div>
    );
}

export default Tooltip;

function CloseIcon({close, color}: { close: () => void, color: string }) {
    return (
        <div onClick={close} style={{position: "absolute", top: 5, right: 10, zIndex: 1}}>
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
        </div>
    );
}
