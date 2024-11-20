import classes from "./Main.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import MainButtons from "../../components/MainButtons";
import Tooltip from "../../components/ui/tooltip/Tooltip";
import {useEffect, useState} from "react";
import {useUserData} from "../../common/context/UserProvider";
import MemoFilterIcon from "../../components/svg/FilterIcon";
import {useFetchForms} from "../../api/hooks/useFetchForms";
import {initInitData} from "@telegram-apps/sdk-react";
import {User} from "../../types/types";
// import {useSetLike} from "../../api/hooks/useSetLike";
import {useSetDislike} from "../../api/hooks/useSetDislike";
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {EffectCube, Pagination, Navigation} from "swiper/modules";
import MemoShareIcon from "../../components/svg/ShareIcon";
import Filter from "../filter/Filter";


// const entities: { companyName: string, description: string, hashTags?: string[] } = {
//     companyName: "Company name",
//     description: "Industries jlkdfh ldfkhldfkhldkfhlkhlkhlkh  lkhdflkghldfkhglk lkdfhg ldkfh lkd",
//     hashTags: ["FoodTech", "EdTech", "Crypto", "TravelTech", "Blockchain", "AI", "Gaming", "SocialMedia", "Mobility", "FashionTech", "E-commerce"]
// };


function Main() {
    const initData = initInitData();
    const {responseFontSize} = useScreenSize();
    const {userData, usersRelevance, mutateRelevance, currentIndex, setCurrentIndex} = useUserData();
    // const {mutate: setLike} = useSetLike();
    const {mutate: setDislike} = useSetDislike();

    const [open, setOpen] = useState<{ title: string, text: string, percent: string, color: string, isActive: boolean }>({
        title: "",
        text: "",
        percent: "",
        color: "",
        isActive: false
    });
    const [isOpenFilter, setOpenFilter] = useState<boolean>(false);

    const [direction, setDirection] = useState(1);

    const {data: form} = useFetchForms();

    const currentItem: { relevance: number; user: User } | undefined = usersRelevance?.[currentIndex];

    console.log(direction);
    // useEffect(() => {
    //     mutateRelevance({tg_id: initData?.user?.id.toString() ?? "test"});
    // }, [isSuccessLike, isSuccessDisLike]);

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
        // setLike({
        //     tg_id: initData?.user?.id.toString() ?? "test",
        //     tg_id_what_i_liked: currentItem?.user?.tg_id ?? "test"
        // });
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
    // const variants = {
    //     enter: (direction: number) => {
    //         return {
    //             x: direction > 0 ? 500 : -500,
    //             opacity: 0
    //         };
    //     },
    //     center: {
    //         // zIndex: 1,
    //         x: 0,
    //         opacity: 1
    //     },
    //     exit: (direction: number) => {
    //         return {
    //             // zIndex: 0,
    //             x: direction < 0 ? 500 : -500,
    //             opacity: 0
    //         };
    //     }
    // };
    // const swipeConfidenceThreshold = 10000;
    // const swipePower = (offset: number, velocity: number) => {
    //     return Math.abs(offset) * velocity;
    // };
    return (
        <>
            <div className={classes.container}>
                {!isOpenFilter ? (<>
                    <div className={classes.blurContainer} style={{filter: open.isActive ? "blur(5px)" : undefined}}>
                        {/*<div className="iconContainer">*/}
                        {/*    <MemoLogoIcon fill={"#FFFFFF"} stroke={"#FFFFFF"}/>*/}
                        {/*</div>*/}
                        <Swiper
                            effect={"cube"}
                            grabCursor={true}
                            // pagination={true}
                            // navigation={true}
                            cubeEffect={{
                                shadow: false,
                                slideShadows: true
                                // shadowOffset: 20,
                                // shadowScale: 0.94
                            }}
                            // onSlideChange={handleSlideChange}
                            modules={[EffectCube, Pagination, Navigation]}
                            // className="my-swiper"
                        >

                            {usersRelevance?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className={classes.scrollContainer}>
                                        <div className={classes.name}
                                             style={{fontSize: responseFontSize(38), lineHeight: responseFontSize(40)}}>
                                            {item?.user.name}
                                        </div>
                                        <div className={classes.filterContainer}>
                                            <button onClick={() => {
                                            }}
                                                    className="icon-style">
                                                <MemoShareIcon style={{marginTop: 3}}/>
                                            </button>
                                            <button onClick={() => setOpenFilter(true)}
                                                    className="icon-style">
                                                <MemoFilterIcon style={{marginTop: 3}}/>
                                            </button>
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "start",
                                            flexWrap: "wrap",
                                            gap: 8
                                        }}>
                                            {Object.values(item?.user?.hashtags ?? {}).flat().map((item, index) => (
                                                <div key={index} className="hashButton"
                                                     style={{backgroundColor: "#0062FF"}}>{item}</div>
                                            ))}
                                        </div>
                                        {userData?.user_types.some(tag => tag.toLowerCase() === "founder") &&
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
                                                        width: Number(item?.user.donuts.current_amount) <= Number(item?.user.donuts.purpose_amount) ? `${Number(item?.user.donuts.current_amount) / Number(item?.user.donuts.purpose_amount) * 100}%` : "100%",
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
                                                className={classes.donatsText}>Collected {Number(item?.user.donuts.current_amount).toString()}$
                                                out of {Number(item?.user.donuts.purpose_amount).toString()}$
                                            </div>
                                        </div>}
                                        <div>
                                            <div style={{
                                                color: "#FFFFFF",
                                                fontSize: responseFontSize(24),
                                                fontWeight: "600",
                                                lineHeight: responseFontSize(32)
                                                // letterSpacing: -0.04
                                            }}>About
                                            </div>
                                            <div>{item?.user.description}</div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                        {/*<AnimatePresence initial={false} custom={direction}>*/}
                        {/*    {currentItem && <motion.div key={currentIndex}*/}
                        {/*                                custom={direction}*/}
                        {/*                                variants={variants}*/}
                        {/*                                initial="enter"*/}
                        {/*                                animate="center"*/}
                        {/*                                exit="exit"*/}
                        {/*                                transition={{*/}
                        {/*                                    x: {type: "spring", stiffness: 300, damping: 30},*/}
                        {/*                                    opacity: {duration: 0.2}*/}
                        {/*                                }}*/}
                        {/*                                drag="x"*/}
                        {/*                                dragConstraints={{left: 0, right: 0}}*/}
                        {/*                                dragElastic={1}*/}
                        {/*                                onDragEnd={(_, {offset, velocity}) => {*/}
                        {/*                                    const swipe = swipePower(offset.x, velocity.x);*/}

                        {/*                                    if (swipe < -swipeConfidenceThreshold) {*/}
                        {/*                                        handleSetLike();*/}
                        {/*                                    } else if (swipe > swipeConfidenceThreshold) {*/}
                        {/*                                        setDislike({*/}
                        {/*                                            tg_id: initData?.user?.id.toString() ?? "test",*/}
                        {/*                                            tg_id_what_i_liked: currentItem?.user?.tg_id ?? "test"*/}
                        {/*                                        });*/}
                        {/*                                        mutateRelevance({tg_id: initData?.user?.id.toString() ?? "test"});*/}
                        {/*                                        setDirection(-1);*/}
                        {/*                                        setCurrentIndex((prevIndex) => prevIndex + 1);*/}
                        {/*                                    }*/}
                        {/*                                }}*/}
                        {/*                                className={classes.scrollContainer}>*/}
                        {/*        <div className={classes.name}*/}
                        {/*             style={{fontSize: responseFontSize(48), lineHeight: responseFontSize(45)}}>*/}
                        {/*            {currentItem?.user.name}*/}
                        {/*        </div>*/}
                        {/*        <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3}}>*/}
                        {/*            {Object.values(userData?.hashtags ?? {}).flat().map((item, index) => (*/}
                        {/*                <div key={index} className="hashButton"*/}
                        {/*                     style={{backgroundColor: "#286EF2"}}>#{item}</div>*/}
                        {/*            ))}*/}
                        {/*        </div>*/}
                        {/*        {userData?.user_types.some(tag => tag.toLowerCase() === "founder") && <div>*/}
                        {/*            <div style={{*/}
                        {/*                color: "#FFFFFF",*/}
                        {/*                fontSize: responseFontSize(24),*/}
                        {/*                fontWeight: "600",*/}
                        {/*                lineHeight: responseFontSize(31),*/}
                        {/*                letterSpacing: -0.04*/}
                        {/*            }}>Donats*/}
                        {/*            </div>*/}
                        {/*            <div className={classes.donats}>*/}
                        {/*                <div*/}
                        {/*                    style={{*/}
                        {/*                        position: "absolute",*/}
                        {/*                        width: Number(currentItem?.user.donuts.current_amount) <= Number(currentItem?.user.donuts.purpose_amount) ? `${Number(currentItem?.user.donuts.current_amount) / Number(currentItem?.user.donuts.purpose_amount) * 100}%` : "100%",*/}
                        {/*                        top: 0,*/}
                        {/*                        left: 0,*/}
                        {/*                        bottom: 0,*/}
                        {/*                        borderRadius: "7px",*/}
                        {/*                        backgroundColor: "#286EF2",*/}
                        {/*                        zIndex: 0*/}
                        {/*                    }}/>*/}
                        {/*                <div*/}
                        {/*                    className={classes.donatsText}>Collect {Number(currentItem?.user.donuts.current_amount).toString()}$*/}
                        {/*                    of {Number(currentItem?.user.donuts.purpose_amount).toString()}$*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>}*/}
                        {/*        <div>*/}
                        {/*            <div style={{*/}
                        {/*                color: "#FFFFFF",*/}
                        {/*                fontSize: responseFontSize(24),*/}
                        {/*                fontWeight: "600",*/}
                        {/*                lineHeight: responseFontSize(31),*/}
                        {/*                letterSpacing: -0.04*/}
                        {/*            }}>Description*/}
                        {/*            </div>*/}
                        {/*            <div>{currentItem?.user.description}</div>*/}
                        {/*        </div>*/}
                        {/*    </motion.div>}*/}
                        {/*</AnimatePresence>*/}
                        {/*: <div style={{*/}
                        {/*    width: "100%",*/}
                        {/*    height: "100%",*/}
                        {/*    display: "flex",*/}
                        {/*    justifyContent: "center",*/}
                        {/*    alignItems: "center"*/}
                        {/*}}>Nothing was found</div>}*/}
                    </div>
                    <div style={{position: "absolute", width: "100%", bottom: 0}}>
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

                                     onSetLike={handleSetLike}
                                     userType={userData?.user_types.some(tag => tag.toLowerCase() === "founder")}/>}
                    </div>
                </>) : (
                    <Filter onClose={() => setOpenFilter(false)} form={form?.data}
                            apply={data => {
                                mutateRelevance({tg_id: initData?.user?.id.toString() ?? "test", ...data});
                                setOpenFilter(false);

                            }}/>
                )}
            </div>

        </>

    );
}

export default Main;
