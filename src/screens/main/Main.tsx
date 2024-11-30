import {useEffect, useState} from "react";
import classes from "./Main.module.css";
// import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import MainButtons from "../../components/MainButtons";
import Tooltip from "../../components/ui/tooltip/Tooltip";
import {useUserData} from "../../common/context/UserProvider";
import {useFetchForms} from "../../api/hooks/useFetchForms";
import {initInitData, initUtils} from "@telegram-apps/sdk-react";
import {User} from "../../types/types";
import {useSetLike} from "../../api/hooks/useSetLike";
import {useSetDislike} from "../../api/hooks/useSetDislike";
// import {EffectCards, Navigation, Pagination} from "swiper/modules";
// import {Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
// import "swiper/css";
// import "swiper/css";
// import "swiper/css/effect-cards";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
import {motion, AnimatePresence} from "framer-motion";
import ItemProfile from "../../components/main/ItemProfile";
import Filter from "../filter/Filter";
import ProfilesAreOver from "./ProfilesAreOver";
import MemoShareIcon from "../../components/svg/ShareIcon";
import MemoFilterIcon from "../../components/svg/FilterIcon";
import Match from "../match/Match";
import ModalShare from "../../components/ui/modal/ModalShare";

// const entities: { companyName: string, description: string, hashTags?: string[] } = {
//     companyName: "Company name",
//     description: "Industries jlkdfh ldfkhldfkhldkfhlkhlkhlkh  lkhdflkghldfkhglk lkdfhg ldkfh lkd",
//     hashTags: ["FoodTech", "EdTech", "Crypto", "TravelTech", "Blockchain", "AI", "Gaming", "SocialMedia", "Mobility", "FashionTech", "E-commerce"]
// };


function Main() {
    const initData = initInitData();
    const utils = initUtils();
    // const {responseFontSize} = useScreenSize();
    const {usersRelevance, mutateRelevance, currentIndex, setCurrentIndex, userShareData} = useUserData();
    // const pointerEventsRef = useRef<boolean>(false);


    const {mutate: setLike, data} = useSetLike();
    const {mutate: setDislike} = useSetDislike();


    const [open, setOpen] = useState<{ title: string, text: string, percent: string, width: string | undefined, bottom: string, color: string, isActive: boolean }>({
        title: "",
        text: "",
        percent: "",
        width: "",
        bottom: "",
        color: "",
        isActive: false
    });
    const [isOpenFilter, setOpenFilter] = useState<boolean>(false);
    // const [isOpenText, setIsOpenText] = useState<boolean>(false);
    const [direction, setDirection] = useState(1);
    const [buttonName, setButtonName] = useState<"heart" | "dislike">();
    const [match, setMatch] = useState<boolean>(false);
    const [openShare, setOpenShare] = useState<boolean>(false);

    const {data: form} = useFetchForms();

    const currentItem: { relevance: number; user: User } | undefined = usersRelevance?.[currentIndex];

    console.log("setLike", data);
    // useEffect(() => {
    //     mutateRelevance({tg_id: initData?.user?.id.toString() ?? "test"});
    // }, [isSuccessLike, isSuccessDisLike]);

    useEffect(() => {
        if (userShareData) {
            setOpenShare(true);
        }
        return onCloseTooltip();
    }, []);

    useEffect(() => {
        if (data && data.match) {
            setMatch(true);
        }
    }, [data]);


    // const handleNext = () => {
    //     if (currentIndex < usersRelevance.length - 1) {
    //         setDirection(-1);
    //         setCurrentIndex((prevIndex) => prevIndex + 1);
    //     }
    // };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex((prevIndex) => prevIndex - 1);
            setButtonName(undefined);
        }
    };

    const handleSetDislike = () => {
        setDislike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: currentItem?.user?.tg_id ?? "test"
        });
        if (currentIndex <= usersRelevance.length - 1) {
            setDirection(1);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
        // handleNext();
        setButtonName("dislike");
    };

    const handleSetLike = () => {
        setLike({
            tg_id: initData?.user?.id.toString() ?? "test",
            tg_id_what_i_liked: currentItem?.user?.tg_id ?? "test"
        });
        if (currentIndex <= usersRelevance.length - 1) {
            setDirection(-1);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
        // handleNext();
        setButtonName("heart");
    };

    const handleOpenFilter = () => {
        setOpenFilter(true);
        setButtonName(undefined);
    };

    const onCloseTooltip = () => {
        setOpen({
            title: "",
            text: "",
            percent: "",
            width: "",
            bottom: "",
            color: "",
            isActive: false
        });
    };

    // const handleToggle = () => {
    //     setIsOpenText(!isOpenText);
    // };

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };
    // const itemIndex = wrap(0, usersRelevance.length, Number(currentItem?.user?.id));
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };
    return (
        <>
            {match ? (<Match onClose={() => setMatch(false)} currentItem={usersRelevance?.[currentIndex - 1]}/>) : (
                <div className={classes.container}>
                    {!isOpenFilter ? (<>
                        {/*<div className={classes.blurContainer} style={{filter: open.isActive ? "blur(5px)" : undefined}}>*/}

                        {/*<Swiper*/}
                        {/*    effect={"cards"}*/}
                        {/*    grabCursor={true}*/}
                        {/*    // direction={'vertical'}*/}
                        {/*    // pagination={true}*/}
                        {/*    // navigation={true}*/}
                        {/*    spaceBetween={0}*/}
                        {/*    slidesPerView={1}*/}
                        {/*    // cubeEffect={{*/}
                        {/*    //     shadow: true,*/}
                        {/*    //     slideShadows: true*/}
                        {/*    //     // shadowOffset: 20,*/}
                        {/*    //     // shadowScale: 0.94,*/}
                        {/*    // }}*/}
                        {/*    // onRealIndexChange={(swiper) => {*/}
                        {/*    //     swiper.allowTouchMove = false;*/}
                        {/*    //     swiper.unsetGrabCursor();*/}
                        {/*    // }}*/}
                        {/*    // onTouchEnd={(swiper) => {*/}
                        {/*    //     swiper.allowTouchMove = true;*/}
                        {/*    // }}*/}
                        {/*    // onSlideChange={handleSlideChange}*/}
                        {/*    modules={[EffectCards, Pagination, Navigation]}*/}
                        {/*    className="my-swiper"*/}
                        {/*>*/}

                        {/*{usersRelevance?.map((item, index) => (*/}
                        {/*    // <SwiperSlide key={index}>*/}
                        {/*    <TinderCard ref={childRefs[index]} key={item.user.id}  onSwipe={(dir) => swiped(dir, item.user.id, index)}*/}
                        {/*                swipeRequirementType={"position"}*/}
                        {/*        // onSwipeRequirementFulfilled={onSwipeRequirementFulfilled}*/}
                        {/*        // onCardLeftScreen={() => onCardLeftScreen("fooBar")}*/}
                        {/*        //         swipeThreshold={1000}*/}
                        {/*                onCardLeftScreen={() => outOfFrame(item.user.id, index)}*/}
                        {/*                preventSwipe={["up", "down"]} className="swipe">*/}
                        {/*        <div className={classes.scrollContainer}>*/}
                        {/*            <div className={classes.name}*/}
                        {/*                 style={{fontSize: responseFontSize(38), lineHeight: responseFontSize(40)}}>*/}
                        {/*                {item?.user.name}*/}
                        {/*            </div>*/}
                        {/*            <div className={classes.filterContainer}>*/}
                        {/*                <button onClick={() => {*/}
                        {/*                }}*/}
                        {/*                        className="icon-style">*/}
                        {/*                    <MemoShareIcon style={{marginTop: 3}}/>*/}
                        {/*                </button>*/}
                        {/*                <button onClick={() => setOpenFilter(true)}*/}
                        {/*                        className="icon-style">*/}
                        {/*                    <MemoFilterIcon style={{marginTop: 3}}/>*/}
                        {/*                </button>*/}
                        {/*            </div>*/}

                        {/*            <div style={{*/}
                        {/*                display: "flex",*/}
                        {/*                justifyContent: "start",*/}
                        {/*                flexWrap: "wrap",*/}
                        {/*                gap: 8*/}
                        {/*            }}>*/}
                        {/*                {Object.values(item?.user?.hashtags ?? {}).flat().map((item, index) => (*/}
                        {/*                    <div key={index} className="hashButton"*/}
                        {/*                         style={{backgroundColor: "#0062FF"}}>{item}</div>*/}
                        {/*                ))}*/}
                        {/*            </div>*/}
                        {/*            {userData?.user_types.some(tag => tag.toLowerCase() === "founder") &&*/}
                        {/*            <div style={{display: "flex", flexDirection: "column", gap: 8}}>*/}

                        {/*                <div style={{*/}
                        {/*                    color: "#FFFFFF",*/}
                        {/*                    fontSize: responseFontSize(24),*/}
                        {/*                    fontWeight: "600",*/}
                        {/*                    lineHeight: responseFontSize(32)*/}
                        {/*                    // letterSpacing: -0.04*/}
                        {/*                }}>Donats*/}
                        {/*                </div>*/}
                        {/*                <div className={classes.donats}>*/}
                        {/*                    <div*/}
                        {/*                        style={{*/}
                        {/*                            position: "absolute",*/}
                        {/*                            width: Number(item?.user.donuts.current_amount) <= Number(item?.user.donuts.purpose_amount) ? `${Number(item?.user.donuts.current_amount) / Number(item?.user.donuts.purpose_amount) * 100}%` : "100%",*/}
                        {/*                            // width: "50%",*/}
                        {/*                            top: 0,*/}
                        {/*                            left: 0,*/}
                        {/*                            bottom: 0,*/}
                        {/*                            borderRadius: "100px",*/}
                        {/*                            border: "#0062FF 1.2px solid",*/}
                        {/*                            backgroundColor: "transparent",*/}
                        {/*                            zIndex: 0*/}
                        {/*                        }}/>*/}

                        {/*                </div>*/}
                        {/*                <div*/}
                        {/*                    className={classes.donatsText}>Collected {Number(item?.user.donuts.current_amount).toString()}$*/}
                        {/*                    out of {Number(item?.user.donuts.purpose_amount).toString()}$*/}
                        {/*                </div>*/}
                        {/*            </div>}*/}
                        {/*            <div>*/}
                        {/*                <Collapsible trigger={*/}
                        {/*                    <div style={{*/}
                        {/*                        display: "flex",*/}
                        {/*                        justifyContent: "space-between",*/}
                        {/*                        alignItems: "center"*/}
                        {/*                        // cursor: "pointer"*/}
                        {/*                    }}>*/}

                        {/*                                        <span style={{*/}
                        {/*                                            color: "#FFFFFF",*/}
                        {/*                                            fontSize: responseFontSize(24),*/}
                        {/*                                            fontWeight: "600",*/}
                        {/*                                            lineHeight: responseFontSize(32)*/}
                        {/*                                        }}>About</span>*/}
                        {/*                        <span style={{marginRight: "10px"}}>*/}
                        {/*                                            <span>{isOpenText ? "▲" : "▼"} </span>*/}
                        {/*</span>*/}
                        {/*                    </div>*/}
                        {/*                }*/}
                        {/*                             onOpening={handleToggle}*/}
                        {/*                             onClosing={handleToggle}>*/}
                        {/*                    <div style={{marginTop: 6}}>*/}
                        {/*                        {item?.user.description}*/}
                        {/*                    </div>*/}
                        {/*                </Collapsible>*/}
                        {/*                /!*<div style={{*!/*/}
                        {/*                /!*    color: "#FFFFFF",*!/*/}
                        {/*                /!*    fontSize: responseFontSize(24),*!/*/}
                        {/*                /!*    fontWeight: "600",*!/*/}
                        {/*                /!*    lineHeight: responseFontSize(32)*!/*/}
                        {/*                /!*    // letterSpacing: -0.04*!/*/}
                        {/*                /!*}}>About*!/*/}
                        {/*                /!*</div>*!/*/}
                        {/*                /!*<div>{item?.user.description}</div>*!/*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </TinderCard>*/}
                        {/*    // </SwiperSlide>*/}
                        {/*))}*/}

                        {/*</Swiper>*/}

                        <AnimatePresence initial={false} custom={direction}>
                            {currentItem ? (<motion.div key={currentItem.user.id}
                                                        custom={direction}
                                                        variants={variants}
                                                        initial="enter"
                                                        animate="center"
                                                        exit="exit"
                                                        transition={{
                                                            x: {type: "spring", stiffness: 300, damping: 30},
                                                            opacity: {duration: 0.5}
                                                        }}
                                                        drag="x"
                                                        dragConstraints={{left: 0, right: 0}}
                                                        dragElastic={1}
                                // onDrag={(event, {offset, velocity}) => {
                                //     const swipe = swipePower(offset.y, velocity.y);
                                //     console.log("Vertical swipe detected, ignoring.",swipe);
                                //     // if (Math.abs(velocity.y) > verticalSwipeThreshold) {
                                //     //     console.log("Vertical swipe detected, ignoring.");
                                //     //    event.preventDefault();
                                //     // }
                                //     // pointerEventsRef.current = true;
                                //     // sePointerEvents(true)
                                //     // console.log("sdsdsd",  pointerEventsRef.current);
                                //     // if (swipe !== 0) {
                                //     //     console.log("event", swipe);
                                //     //     pointerEventsRef.current = true;
                                //     // }
                                // }}
                                                        onDragEnd={(_, {offset, velocity}) => {
                                                            const swipe = swipePower(offset.x, velocity.x);
                                                            console.log("sdsdsd", swipe);
                                                            // pointerEventsRef.current = false;
                                                            // sePointerEvents(false)
                                                            // pointerEventsRef.current?.style.pointerEvents = 'none';
                                                            if (swipe < -swipeConfidenceThreshold) {
                                                                handleSetDislike();

                                                                // console.log("handleSetDislike");
                                                            } else if (swipe > swipeConfidenceThreshold) {
                                                                // setDislike({
                                                                //     tg_id: initData?.user?.id.toString() ?? "test",
                                                                //     tg_id_what_i_liked: currentItem?.user?.tg_id ?? "test"
                                                                // });
                                                                // console.log("handleSetDislike");

                                                                handleSetLike();

                                                                // setDirection(-1);
                                                                // setCurrentIndex((prevIndex) => prevIndex + 1);
                                                            }
                                                        }}
                                                        className={classes.scrollContainer}>
                                <div className={classes.filterContainer}>
                                    {/*<a  className="icon-style"*/}
                                    {/*   href={`https://t.me/share/url?url=${encodeURIComponent(JSON.stringify(currentItem?.user?.tg_id))}`}*/}
                                    {/*   target="_blank"*/}
                                    {/*   rel="noopener noreferrer">Send QR Code</a>*/}
                                    <button onClick={() => {
                                        const shareId = encodeURIComponent(currentItem?.user?.tg_id ?? "");
                                        utils.shareURL(`https://t.me/InvestmatchBot?startapp=${shareId}`);
                                    }}
                                            className="icon-style">
                                        <MemoShareIcon style={{marginTop: 3}}/>
                                    </button>
                                    <button onClick={handleOpenFilter}
                                            className="icon-style">
                                        <MemoFilterIcon style={{marginTop: 3}}/>
                                    </button>
                                </div>
                                <div style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "50%",
                                    background: "linear-gradient(to bottom, rgba(9, 9, 9, 0), rgba(9, 9, 9, 0.8), rgba(9, 9, 9, 1) 100%)",
                                    bottom: 0,
                                    borderBottomLeftRadius: "32px",
                                    borderBottomRightRadius: "32px",
                                    zIndex: 3,
                                    pointerEvents: "none"
                                }}/>
                                <ItemProfile item={currentItem.user}
                                             blur={open.isActive}
                                             onCloseToolTip={onCloseTooltip}/>
                                <div className={classes.buttonsContainer}
                                    // style={{pointerEvents:  "none"}}
                                >
                                    {open.isActive && <Tooltip title={open.title} text={open.text}
                                                               close={onCloseTooltip}
                                                               percent={open.percent}
                                                               width={open.width}
                                                               bottom={open.bottom}
                                                               color={open.color}/>}
                                    {usersRelevance.length > 0 &&
                                    <MainButtons onPrevious={handlePrevious} onSetDislike={handleSetDislike}
                                                 onLogo={() => setOpen({
                                                     title: "Your compatibility",
                                                     text: "",
                                                     percent: "50%",
                                                     width: undefined,
                                                     bottom: "120px",
                                                     color: "#286EF2",
                                                     isActive: true
                                                 })}
                                                 logoPercent={currentItem?.relevance?.toString()}
                                                 onCoin={() => setOpen({
                                                     title: "Wallet:",
                                                     text: currentItem?.user.wallet ?? "No wallet",
                                                     percent: "72%",
                                                     width: "89%",
                                                     bottom: "110px",
                                                     color: "#FFFFFF",
                                                     isActive: true
                                                 })}

                                                 onSetLike={handleSetLike}
                                                 userType={currentItem?.user?.user_types?.some(tag => tag.toLowerCase() === "founder")}
                                                 buttonName={buttonName}/>}

                                </div>
                            </motion.div>) : (<ProfilesAreOver/>)}

                        </AnimatePresence>
                        {/*: <div style={{*/}
                        {/*    width: "100%",*/}
                        {/*    height: "100%",*/}
                        {/*    display: "flex",*/}
                        {/*    justifyContent: "center",*/}
                        {/*    alignItems: "center"*/}
                        {/*}}>Nothing was found</div>}*/}
                        {/*</div>*/}

                    </>) : (
                        <Filter onClose={() => setOpenFilter(false)} form={form?.data}
                                apply={data => {
                                    mutateRelevance({tg_id: initData?.user?.id.toString() ?? "test", ...data});
                                    setOpenFilter(false);

                                }}/>
                    )}
                </div>
            )}
            <ModalShare isOpen={openShare} onClose={() => setOpenShare(false)} user={userShareData}/>
        </>

    );
}

export default Main;
