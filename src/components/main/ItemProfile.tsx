import classes from "../../screens/main/Main.module.css";
import Collapsible from "react-collapsible";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import {useState} from "react";
import {User} from "../../types/types";

type ItemMainProps = {
    item: User | undefined;
    blur?: boolean;
    onCloseToolTip?: () => void;
}

function ItemProfile({item, blur, onCloseToolTip}: ItemMainProps) {
    const {responseFontSize} = useScreenSize();

    const [isOpenText, setIsOpenText] = useState<boolean>(false);

    const handleToggle = () => {
        setIsOpenText(!isOpenText);
    };
    return (
        <div onClick={onCloseToolTip} style={{
            // position: "absolute",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "20px 24px 200px 24px",
            touchAction: "pan-y",
            overflowY: "auto",
            filter: blur ? "blur(5px)" : undefined
        }}>
            <div className={classes.name}
                 style={{fontSize: responseFontSize(38), lineHeight: responseFontSize(40)}}>
                {item?.name}
            </div>
            <div style={{
                display: "flex",
                justifyContent: "start",
                flexWrap: "wrap",
                gap: 8
            }}>
                {Object.values(item?.hashtags ?? {}).flat().map((item, index) => (
                    <div key={index} className="hashButton"
                         style={{backgroundColor: "#0062FF"}}>{item}</div>
                ))}
            </div>
            {item?.user_types?.some(tag => tag.toLowerCase() === "founder") &&
            <div style={{display: "flex", flexDirection: "column", gap: 8}}>

                <div style={{
                    color: "#FFFFFF",
                    fontSize: responseFontSize(24),
                    fontWeight: "600",
                    lineHeight: responseFontSize(32)
                    // letterSpacing: -0.04
                }}>Donats
                </div>
                <div className={classes.donats}>
                    <div
                        style={{
                            position: "absolute",
                            width: Number(item?.donuts.current_amount) <= Number(item?.donuts.purpose_amount) ? `${Number(item?.donuts.current_amount) / Number(item?.donuts.purpose_amount) * 100}%` : "100%",
                            // width: "50%",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            borderRadius: "100px",
                            border: "#0062FF 1.2px solid",
                            backgroundColor: "transparent",
                            zIndex: 0
                        }}/>

                </div>
                <div
                    className={classes.donatsText}>Collected {Number(item?.donuts.current_amount).toString()}$
                    out of {Number(item?.donuts.purpose_amount).toString()}$
                </div>
            </div>}
            <div>
                <Collapsible trigger={
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                        // cursor: "pointer"
                    }}>
                                                    <span style={{
                                                        color: "#FFFFFF",
                                                        fontSize: responseFontSize(24),
                                                        fontWeight: "600",
                                                        lineHeight: responseFontSize(32)
                                                    }}>About</span>

                        <span style={{marginRight: "10px"}}>{isOpenText ? "▲" : "▼"} </span>
                    </div>
                }
                             onOpening={handleToggle}
                             onClosing={handleToggle}>
                    <div className={classes.description}>
                        {item?.description}
                    </div>
                </Collapsible>
                {/*<div style={{*/}
                {/*    color: "#FFFFFF",*/}
                {/*    fontSize: responseFontSize(24),*/}
                {/*    fontWeight: "600",*/}
                {/*    lineHeight: responseFontSize(32)*/}
                {/*    // letterSpacing: -0.04*/}
                {/*}}>About*/}
                {/*</div>*/}
                {/*<div>{item?.user.description}</div>*/}
            </div>
        </div>

    );
}

export default ItemProfile;
