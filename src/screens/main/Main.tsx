import classes from "./Main.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import MainButtons from "../../components/MainButtons";
import MemoLogoIcon from "../../components/svg/LogoIcon";
import Tooltip from "../../components/ui/tooltip/Tooltip";
import {useEffect, useState} from "react";
import {useUserData} from "../../common/context/UserProvider";
import MemoFilterIcon from "../../components/svg/FilterIcon";
import Filter from "../filter/Filter";
import {useFetchForms} from "../../api/hooks/useFetchForms";
import {initInitData} from "@telegram-apps/sdk-react";
import {User} from "../../types/types";
import {useSetLike} from "../../api/hooks/useSetLike";
import {useSetDislike} from "../../api/hooks/useSetDislike";
import {motion, AnimatePresence} from "framer-motion";

// const entities: { companyName: string, description: string, hashTags?: string[] } = {
//     companyName: "Company name",
//     description: "Industries jlkdfh ldfkhldfkhldkfhlkhlkhlkh  lkhdflkghldfkhglk lkdfhg ldkfh lkd",
//     hashTags: ["FoodTech", "EdTech", "Crypto", "TravelTech", "Blockchain", "AI", "Gaming", "SocialMedia", "Mobility", "FashionTech", "E-commerce"]
// };


function Main() {
    const initData = initInitData();
    const {responseFontSize} = useScreenSize();
    const {userData, usersRelevance, mutateRelevance} = useUserData();
    const {mutate: setLike} = useSetLike();
    const {mutate: setDislike} = useSetDislike();

    const [open, setOpen] = useState<{ title: string, text: string, percent: string, color: string, isActive: boolean }>({
        title: "",
        text: "",
        percent: "",
        color: "",
        isActive: false
    });
    const [isOpenFilter, setOpenFilter] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [direction, setDirection] = useState(1);

    const {data: form} = useFetchForms();

    const currentItem: { relevance: number; user: User } | undefined = usersRelevance?.[currentIndex];


    useEffect(() => {
        return onCloseTooltip();
    }, []);


    const handleNext = () => {
        if (currentIndex < usersRelevance.length - 1) {
            setDirection(1);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleSetDislike = () => {
        setDislike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: currentItem?.user?.tg_id ?? "test"
        });
        handleNext();
    };

    const handleSetLike = () => {
        setLike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: currentItem?.user?.tg_id ?? "test"
        });
        handleNext();
    };

    const onCloseTooltip = () => {
        setOpen({
            title: "",
            text: "",
            percent: "",
            color: "",
            isActive: false
        });
    };
    console.log("relevance", usersRelevance);
    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            // zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                // zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };
    return (
        <>
            <div className={classes.container}>
                <div className={classes.blurContainer} style={{filter: open.isActive ? "blur(5px)" : undefined}}>
                    <button onClick={() => setOpenFilter(true)}
                            style={{
                                position: "absolute",
                                top: "-52px",
                                right: 0,
                                borderRadius: 7,
                                backgroundColor: "black",
                                padding: 7,
                                textDecoration: "none"
                            }}>
                        <MemoFilterIcon style={{marginTop: 3}}/>
                    </button>
                    <div className="iconContainer">
                        <MemoLogoIcon fill={"#FFFFFF"} stroke={"#FFFFFF"}/>
                    </div>
                    <AnimatePresence initial={false} custom={direction}>
                        {currentItem && <motion.div key={currentIndex}
                                                    custom={direction}
                                                    variants={variants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    transition={{
                                                        x: {type: "spring", stiffness: 300, damping: 30},
                                                        opacity: {duration: 0.2}
                                                    }}
                                                    drag="x"
                                                    dragConstraints={{left: 0, right: 0}}
                                                    dragElastic={1}
                                                    onDragEnd={(_, {offset, velocity}) => {
                                                        const swipe = swipePower(offset.x, velocity.x);

                                                        if (swipe < -swipeConfidenceThreshold) {
                                                            handleSetLike();
                                                        } else if (swipe > swipeConfidenceThreshold) {
                                                            setDislike({
                                                                tg_id: initData?.user?.id.toString() ?? "test",
                                                                tg_id_what_i_liked: currentItem?.user?.tg_id ?? "test"
                                                            });
                                                            setDirection(-1);
                                                            setCurrentIndex((prevIndex) => prevIndex + 1);
                                                        }
                                                    }}
                                                    className={classes.scrollContainer}>
                            <div className={classes.name}
                                 style={{fontSize: responseFontSize(48), lineHeight: responseFontSize(45)}}>
                                {currentItem?.user.name}
                            </div>
                            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3}}>
                                {Object.values(userData?.hashtags ?? {}).flat().map((item, index) => (
                                    <div key={index} className="hashButton"
                                         style={{backgroundColor: "#286EF2"}}>#{item}</div>
                                ))}
                            </div>
                            {userData?.user_types.some(tag => tag.toLowerCase() === "founder") && <div>
                                <div style={{
                                    color: "#FFFFFF",
                                    fontSize: responseFontSize(24),
                                    fontWeight: "600",
                                    lineHeight: responseFontSize(31),
                                    letterSpacing: -0.04
                                }}>Donats
                                </div>
                                <div className={classes.donats}>
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: Number(currentItem?.user.donuts.current_amount) <= Number(currentItem?.user.donuts.purpose_amount) ? `${Number(currentItem?.user.donuts.current_amount) / Number(currentItem?.user.donuts.purpose_amount) * 100}%` : "100%",
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            borderRadius: "7px",
                                            backgroundColor: "#286EF2",
                                            zIndex: 0
                                        }}/>
                                    <div
                                        className={classes.donatsText}>Collect {Number(currentItem?.user.donuts.current_amount).toString()}$
                                        of {Number(currentItem?.user.donuts.purpose_amount).toString()}$
                                    </div>
                                </div>
                            </div>}
                            <div>
                                <div style={{
                                    color: "#FFFFFF",
                                    fontSize: responseFontSize(24),
                                    fontWeight: "600",
                                    lineHeight: responseFontSize(31),
                                    letterSpacing: -0.04
                                }}>Description
                                </div>
                                <div>{currentItem?.user.description}</div>
                            </div>
                        </motion.div>}
                    </AnimatePresence>
                    {/*: <div style={{*/}
                    {/*    width: "100%",*/}
                    {/*    height: "100%",*/}
                    {/*    display: "flex",*/}
                    {/*    justifyContent: "center",*/}
                    {/*    alignItems: "center"*/}
                    {/*}}>Nothing was found</div>}*/}
                </div>
                <div style={{position: "absolute", width: "100%", bottom: 19}}>
                    {open.isActive && <Tooltip title={open.title} text={open.text}
                                               close={onCloseTooltip}
                                               percent={open.percent}
                                               color={open.color}/>}
                    {usersRelevance.length > 0 &&
                    <MainButtons onPrevious={handlePrevious} onSetDislike={handleSetDislike} onLogo={() => setOpen({
                        title: "Your compatibility",
                        text: "",
                        percent: "50%",
                        color: "#286EF2",
                        isActive: true
                    })}
                                 logoPercent={currentItem?.relevance}
                                 onCoin={() => setOpen({
                                     title: "Wallet",
                                     text: currentItem?.user.wallet ?? "No wallet",
                                     percent: "72.5%",
                                     color: "#FFFFFF",
                                     isActive: true
                                 })}

                                 onSetLike={handleSetLike}/>}
                </div>
            </div>
            <Filter isOpen={isOpenFilter} onClose={() => setOpenFilter(false)} form={form?.data}
                    apply={data => {
                        mutateRelevance({tg_id: initData?.user?.id.toString() ?? "test", ...data});
                        setOpenFilter(false);
                    }}/>
        </>

    );
}

export default Main;
