import MemoReturnIcon from "./svg/ReturnIcon";
import MemoCloseIcon from "./svg/CloseIcon";
import MemoLogoIcon from "./svg/LogoIcon";
import MemoCoinIcon from "./svg/CoinIcon";
import MemoHeartIcon from "./svg/HeartIcon";


function MainButtons({onPrevious, onLogo, logoPercent, onCoin, onSetDislike, onSetLike}: any) {


    return (
        <div style={{
            width: "100%",
            // height:'200px',
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#000000",
            padding: "15px 14px 0 14px"
        }}>
            <div onClick={onPrevious}>
                <MemoReturnIcon/>
            </div>

            <div onClick={onSetDislike}>
                <MemoCloseIcon/>
            </div>

            <div onClick={() => {
                onLogo();
            }} style={{
                position: "relative",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MemoLogoIcon fill={"#286EF2"} stroke={"#286EF2"}/>
                <div style={{position: "absolute", color: "black"}}>{logoPercent}%</div>

            </div>
            <div onClick={onCoin} style={{
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
                <MemoCoinIcon/>
            </div>
            <div onClick={onSetLike}>
                <MemoHeartIcon/>
            </div>

        </div>
    );
}

export default MainButtons;
