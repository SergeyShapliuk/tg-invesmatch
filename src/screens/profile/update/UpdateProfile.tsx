import classes from "./UpdateProfile.module.css";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {UpdateVariables, User} from "../../../types/types";
import {useScreenSize} from "../../../common/context/ScreenSizeProvider";
import TextInput from "../../../components/ui/input/TextInput";
import TextArea from "../../../components/ui/input/TextArea";
import HashTagsComponent from "../../../components/HashTagsComponent";
import {useUpdateUser} from "../../../api/hooks/useUpdateUser";
import {initInitData} from "@telegram-apps/sdk-react";
import {useUserData} from "../../../common/context/UserProvider";
import {useEffect, useState} from "react";
import {useFetchCurrency} from "../../../api/hooks/useFetchCurrency";
import Donuts from "../../../components/ui/donuts/Donuts";
import {useFetchForms} from "../../../api/hooks/useFetchForms";
import MemoCloseIcon from "../../../components/svg/CloseIcon";
import {useNavigate} from "react-router-dom";
import MemoArrowIcon from "../../../components/svg/ArrowIcon";
import {motion} from "framer-motion";


const entities: { title: string, type: string }[] = [{title: "Name", type: "name"}, {
    title: "Industries",
    type: "industries"
}, {title: "Business and project model", type: "business_models"}, {
    title: "Description",
    type: "description"
}, {title: "Donation and wallet", type: "wallet"}, {title: "Geography", type: "geography"}];

function UpdateProfile(
//     {
//                            // isOpen,
//                            // onClose
//                            // form
//                        }: {
//     isOpen: boolean, onClose: () => void, form: Form[] | undefined
// }
) {
    const initData = initInitData();
    const navigate = useNavigate();
    const {responseFontSize} = useScreenSize();
    const {userData, refetchUserData} = useUserData();

    const {data: form} = useFetchForms();
    const {mutate, isSuccess} = useUpdateUser();
    const {data: currency} = useFetchCurrency();

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        reset,
        watch
    } = useForm<any>();
    console.log("watch", watch());

    useEffect(() => {
        if (isSuccess) {
            console.log("useEffect");
            refetchUserData();
            setOpenUpdate(false);
            reset();
        }
    }, [isSuccess]);

    const checkFounder = userData && userData?.user_types?.length > 0 && userData?.user_types?.some(tag => tag.toLowerCase() === "founder");
    console.log("checkFounder", checkFounder);
    const onSubmit: SubmitHandler<{
        user_types?: string[]; project_stages?: string[]; geography?: string[]; industries?: string[]; business_models?: string[]; donuts?: {
            current_amount: string;
            purpose_amount: string;
            currency: string;
        }
    }> = (data) => {
        const filteredBody = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value)
        );
        // const hasFounder = data.user_types?.some(type => type.toLowerCase() === "founder");
        // console.log("hasFounder", hasFounder);
        // console.log("data.user_types", data.user_types);
        // console.log("filteredBody", filteredBody);
        const body: UpdateVariables = {
            tg_id: initData?.user?.id.toString() ?? "", ...filteredBody
        };
        console.log("datas", filteredBody);
        mutate(body);
    };
    // console.log("form", form.data);
    return (
        <div className={classes.container}>
            <div className={classes.title} style={{
                fontSize: responseFontSize(38),
                lineHeight: responseFontSize(40)
            }}>Edit profile
            </div>
            <div onClick={() => {
                if (openUpdate) {
                    setOpenUpdate(false);
                } else {
                    navigate(-1);
                }
            }} className="icon-style" style={{position: "absolute", top: 12, right: 12}}>
                <MemoCloseIcon color={"rgba(255,255,255,0.45)"}/>
            </div>
            <div className={classes.scrollContainer}>
                {!openUpdate ? (entities.map((item, index) => (
                    <motion.button key={index} onClick={() => {
                        setCurrentIndex(index);
                        setOpenUpdate(true);
                    }} className={classes.item}
                                   whileTap={{scale: 0.95}}>
                        <span className={classes.textItem}>{item.title}</span>
                        <MemoArrowIcon stroke={"#6F6F72"} style={{transform: "rotate(180deg)", marginRight: 6}}/>
                    </motion.button>
                ))) : (
                    <form id="update" onSubmit={handleSubmit(onSubmit)} className={classes.entitiesContainer}>
                        {form?.data && form?.data?.map((entity, index) => {
                            switch (entity.type) {
                                case "input":
                                    return (
                                        entity.type_value === entities[currentIndex].type ? (
                                            <Controller key={index} name={entity.type_value} control={control}
                                                        defaultValue={(userData && userData[entity.type_value as keyof User]) || ""}
                                                        rules={{required: entity.type_value !== "wallet"}}
                                                        render={({field: {name, ...restField}}) => <TextInput
                                                            name={name}
                                                            label={entity.type_title}
                                                            placeholder={""}
                                                            // fieldsError={fieldsError}
                                                            {...restField}/>}/>) : null);
                                case "textarea" :
                                    return (
                                        entity.type_value === entities[currentIndex].type ? (
                                            <Controller key={index} name={entity.type_value} control={control}
                                                        defaultValue={(userData && userData[entity.type_value as keyof User]) || ""}
                                                        rules={{required: true}}
                                                        render={({field: {name, ...restField}}) => <TextArea
                                                            name={name}
                                                            label={entity.type_title}
                                                            // fieldsError={fieldsError}
                                                            {...restField}/>}/>) : null);
                                case "hashtag":
                                    return (
                                        (entity.type_value === entities[currentIndex].type || currentIndex === 2 && entity.type_value === "project_stages") ? (
                                            <Controller key={index} name={entity.type_value} control={control}
                                                        rules={{required: true}}
                                                        render={({field}) => <HashTagsComponent
                                                            label={entity.type_title}
                                                            hashTags={entity.values}
                                                            value={field.value || (userData && userData[entity.type_value as keyof User]) || []} // подключение значений к компоненту
                                                            onChange={field.onChange}
                                                        />}/>) : null
                                    );
                                case "donuts":
                                    return (
                                        checkFounder && entities[currentIndex].type === "wallet" ?
                                            <Controller key={index} name={entity.type_value} control={control}
                                                        render={({field: {name, ...restField}}) => <Donuts
                                                            name={name}
                                                            label={entity.type_title}
                                                            currency={currency?.data}
                                                            purposeValue={(userData && parseInt(userData.donuts["purpose_amount"]).toString())}
                                                            currencyValue={(userData && userData.donuts["currency"])}
                                                            {...restField}/>}/> : null
                                    );
                                default:
                                    return null;
                            }
                        })
                        }

                        <div className={classes.buttonContainer}>
                            <button type={"submit"}
                                    name={"submit"}
                                    className="footerButton">Save change
                            </button>

                            <button type={"button"} onClick={() => setOpenUpdate(false)}
                                    className="footerButton" style={{backgroundColor: "#FFFFFF1F"}}>Cancel
                            </button>
                        </div>
                    </form>
                )}

            </div>
        </div>
        // <Sheet isOpen={isOpen} onClose={onClose} disableDrag style={{}}>
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <Sheet.Container style={{
        //             display: "flex",
        //             justifyContent: "center",
        //             alignItems: "flex-start",
        //             borderTopLeftRadius: "7px",
        //             borderTopRightRadius: "7px",
        //             backgroundColor: "black",
        //             padding: 25
        //
        //         }}>
        //             {/*<Sheet.Header disableDrag/>*/}
        //             <div style={{
        //                 fontSize: responseFontSize(48),
        //                 fontWeight: "600",
        //                 lineHeight: responseFontSize(45)
        //             }}>Edit
        //             </div>
        //             <div onClick={() => {
        //                 onClose();
        //             }}>
        //                 <div style={{
        //                     position: "absolute",
        //                     width: 29,
        //                     height: 29,
        //                     top: 20,
        //                     right: 20,
        //                     display: "flex",
        //                     justifyContent: "center",
        //                     alignItems: "center",
        //                     borderRadius: 50,
        //                     backgroundColor: "rgba(255,255,255,0.3)"
        //                     // padding: 7
        //                 }}>
        //                     <CloseIcon color={"rgba(255,255,255,0.45)"}/>
        //                 </div>
        //
        //             </div>
        //             <div className={classes.scrollContainer}>
        //                 {form && form?.map((entity, index) => {
        //                     switch (entity.type) {
        //                         case "input":
        //                             return (
        //                                 <Controller key={index} name={entity.type_value} control={control}
        //                                             defaultValue={(userData && userData[entity.type_value as keyof User]) || ""}
        //                                             render={({field: {name, ...restField}}) => <TextInput
        //                                                 name={name}
        //                                                 label={entity.type_title}
        //                                                 {...restField}/>}/>);
        //                         case "textarea":
        //                             return (
        //                                 <Controller key={index} name={entity.type_value} control={control}
        //                                             defaultValue={(userData && userData[entity.type_value as keyof User]) || ""}
        //                                             render={({field: {name, ...restField}}) => <TextArea
        //                                                 name={name}
        //                                                 label={entity.type_title}
        //                                                 {...restField}/>}/>);
        //                         case "hashtag":
        //                             return (
        //                                 <Controller key={index} name={entity.type_value} control={control}
        //                                             render={({field}) => <HashTagsComponent
        //                                                 label={entity.type_title}
        //                                                 hashTags={entity.values}
        //                                                 value={field.value || (userData && userData[entity.type_value as keyof User]) || []} // подключение значений к компоненту
        //                                                 onChange={field.onChange}
        //                                             />}/>);
        //                         case "donuts":
        //                             return (
        //                                 isUserDataFounder || isWatchUserTypesFounder ?
        //                                     <Controller key={index} name={entity.type_value} control={control}
        //                                                 render={({field: {name, ...restField}}) => <Donuts
        //                                                     name={name}
        //                                                     label={entity.type_title}
        //                                                     currency={currency?.data}
        //                                                     purposeValue={(userData && parseInt(userData.donuts["purpose_amount"]).toString())}
        //                                                     currencyValue={(userData && userData.donuts["currency"])}
        //                                                     {...restField}/>}/> : null);
        //                         default:
        //                             return null;
        //                     }
        //                 })
        //                 }
        //
        //                 {/*<div className={classes.buttonContainer}>*/}
        //                 {/*    <button type={"submit"} name={"submit"} className="footerButton">Update profile</button>*/}
        //                 {/*</div>*/}
        //             </div>
        //             <div className={classes.buttonContainer}>
        //                 <button type={"submit"} name={"submit"}
        //                         className="footerButton">Update profile
        //                 </button>
        //             </div>
        //
        //         </Sheet.Container>
        //     </form>
        //     <Sheet.Backdrop style={{backgroundColor: "#FFFFFF"}}/>
        // </Sheet>

    );
}

export default UpdateProfile;
