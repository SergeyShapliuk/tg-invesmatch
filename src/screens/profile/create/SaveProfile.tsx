import classes from "./SaveProfile.module.css";
import TextInput from "../../../components/ui/input/TextInput";
import HashTagsComponent from "../../../components/HashTagsComponent";
import {SubmitHandler, Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useFetchForms} from "../../../api/hooks/useFetchForms";
import TextArea from "../../../components/ui/input/TextArea";
import {useRegister} from "../../../api/hooks/useRegister";
import MemoLogoIcon from "../../../components/svg/LogoIcon";
import {initInitData} from "@telegram-apps/sdk-react";
import {FadeLoader} from "react-spinners";
import {override} from "../../../App";
import {RegisterVariables} from "../../../types/types";
import {useUserData} from "../../../common/context/UserProvider";
import Donuts from "../../../components/ui/donuts/Donuts";
import {useFetchCurrency} from "../../../api/hooks/useFetchCurrency";



// const entities: { action: string, label: string, hashTags?: string[] }[] = [
//     {action: "input", label: "Name / Сompany names"},
//     {action: "button", label: "Who are you?", hashTags: ["Founder", "Investor"]},
//     {action: "input", label: "Donats"},
//     {
//         action: "button",
//         label: "Industries",
//         hashTags: ["FoodTech", "EdTech", "Crypto", "TravelTech", "Blockchain", "AI", "Gaming", "SocialMedia", "Mobility", "FashionTech", "E-commerce"]
//     },
//     {action: "button", label: "Business model", hashTags: ["B2B", "B2C"]},
//     {action: "button", label: "Project stage", hashTags: ["idea", "MVP", "FirstSale"]},
//     {action: "button", label: "Geography", hashTags: ["LocalBusiness", "GlobalStartup"]},
//     {action: "input", label: "Description"},
//     {action: "input", label: "Your wallet"}
// ];

function SaveProfile() {
    const initData = initInitData();
    const {refetchUserData} = useUserData();
    const {data: form, isSuccess} = useFetchForms();
    const {data: currency, isSuccess: isSuccessCurrency} = useFetchCurrency();
    const {mutate, data: register} = useRegister();
    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: {errors, isSubmitted}
    } = useForm<any>();
    console.log("initData", initData?.user);
    console.log("isSuccess", isSuccess);
    console.log("isSuccess", form?.data);
    console.log("register", register);
    console.log("currency", watch());
    console.log("errors", errors);
    // const w = watch("user_types" as any);
    // console.log("watch", w.includes("Founder" | "founder"));

    const [fieldsError, setFieldsError] = useState<string[]>([]);

    useEffect(() => {
        if (register && register.success) {
            refetchUserData();
            console.log("registerккккк", register);
        }
    }, [register]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setFieldsError(Object.keys(errors))
        }
    }, [errors]);

    console.log("fieldsError", fieldsError);


    const onSubmit: SubmitHandler<{ wallet: string; user_types: string[]; description: string; project_stages: string[]; geography: string[]; industries: string[]; name: string; business_models: string[]; donuts: { purpose_amount: string; currency_id: string } }> = (data) => {
        const body: RegisterVariables = {
            tg_id: initData?.user?.id.toString() ?? "",
            tg_nick: initData?.user?.username ?? "",
            tg_firstname: initData?.user?.firstName ?? "",
            tg_lastname: initData?.user?.lastName ?? "",
            tg_language: initData?.user?.languageCode ?? "",
            business_models: data.business_models,
            description: data.description,
            geography: data.geography,
            industries: data.industries,
            name: data.name,
            project_stages: data.project_stages,
            user_types: data.user_types,
            wallet: data.wallet,
            donuts: {
                current_amount: 0,
                purpose_amount: data?.donuts?.purpose_amount ?? "",
                currency_id: data?.donuts?.currency_id ?? "2"
            }
        };
        console.log("datas", data);
        mutate(body);
        reset();
    };
    const onClickSubmit = () => setFieldsError(Object.keys(errors));


    // console.log("errors:", Object.keys(errors).length);
    // console.log("errors2:", Object.keys(errors).find(f => f === "Business model"));
    // console.log("isSubmit:", fieldsError);
    // console.log("getforms:", form);
    // if (isSuccess) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={isSuccess}/>;
    return (
        <div className={classes.container}>
            <div className="iconContainer">
                <MemoLogoIcon fill={"#FFFFFF"} stroke={"#FFFFFF"}/>
            </div>
            {!isSuccess && !isSuccessCurrency ?
                <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={!isSuccess}/> :
                <>
                    <div className={classes.nick}>
                        {initData?.user?.username ?? ""}
                    </div>
                    <form id="form" onSubmit={handleSubmit(onSubmit)} className={classes.entitiesContainer}>
                        {form?.data && form?.data?.map((entity, index) => {
                            switch (entity.type) {
                                case "input":
                                    return (
                                        <Controller key={index} name={entity.type_value} control={control}
                                                    defaultValue={""}
                                                    rules={{required: entity.type_value !== "wallet"}}
                                                    render={({field: {name, ...restField}}) => <TextInput
                                                        name={name}
                                                        label={entity.type_title}
                                                        // fieldsError={fieldsError}
                                                        {...restField}/>}/>);
                                case "textarea":
                                    return (
                                        <Controller key={index} name={entity.type_value} control={control}
                                                    defaultValue={""}
                                                    rules={{required: true}}
                                                    render={({field: {name, ...restField}}) => <TextArea
                                                        name={name}
                                                        label={entity.type_title}
                                                        // fieldsError={fieldsError}
                                                        {...restField}/>}/>);
                                case "hashtag":
                                    return (
                                        <Controller key={index} name={entity.type_value} control={control}
                                                    rules={{required: true}}
                                                    render={({field}) => <HashTagsComponent label={entity.type_title}
                                                                                            hashTags={entity.values}
                                                                                            value={field.value || []} // подключение значений к компоненту
                                                                                            onChange={field.onChange}
                                                    />}/>);
                                case "donuts":
                                    return (
                                        <Controller key={index} name={entity.type_value} control={control}
                                                    render={({field: {name, ...restField}}) => <Donuts
                                                        name={name}
                                                        label={entity.type_title}
                                                        currency={currency?.data}
                                                        {...restField}/>}/>);
                                default:
                                    return null;
                            }
                        })
                        }

                        <div className={classes.buttonContainer}>
                            {isSubmitted && fieldsError.length > 0 &&
                            <div style={{color: "#E12E2E", textAlign: "center"}}>You have to fill in all the
                                fields</div>}
                            <button type={"submit"} name={"submit"} onClick={onClickSubmit}
                                    className="footerButton">Save
                                profile
                            </button>
                        </div>
                    </form>
                </>}
        </div>

    )
        ;
}

export default SaveProfile;
