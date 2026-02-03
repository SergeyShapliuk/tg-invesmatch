import classes from "./SaveProfile.module.css";
import TextInput from "../../../components/ui/input/TextInput";
import HashTagsComponent from "../../../components/HashTagsComponent";
import {SubmitHandler, Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useFetchForms} from "../../../api/hooks/useFetchForms";
import TextArea from "../../../components/ui/input/TextArea";
import {useRegister} from "../../../api/hooks/useRegister";
import {initInitData} from "@telegram-apps/sdk-react";
import {FadeLoader} from "react-spinners";
import {override} from "../../../App";
import {RegisterVariables} from "../../../types/types";
import {useUserData} from "../../../common/context/UserProvider";
import Donuts from "../../../components/ui/donuts/Donuts";
import {useFetchCurrency} from "../../../api/hooks/useFetchCurrency";
import {useScreenSize} from "../../../common/context/ScreenSizeProvider";


const baseEntities: string[] = ["user_types", "name", "industries", "business_models", "description", "geography"];


function SaveProfile() {
    const initData = initInitData();

    const {refetchUserData} = useUserData();
    const {responseFontSize} = useScreenSize();

    const {data: form, isSuccess} = useFetchForms();
    const {data: currency, isSuccess: isSuccessCurrency} = useFetchCurrency();
    const {mutate, data: register} = useRegister();
    const {
        handleSubmit,
        control,
        reset,
        watch
        // formState: {errors}
    } = useForm<any>();
    // console.log("initData", initData?.user);
    // console.log("isSuccess", isSuccess);
    // console.log("isSuccess", form?.data);
    // console.log("register", register);
    console.log("watch()", watch());
    // console.log("errors", errors);
    // console.log("form", form);
    // console.log("currency", currency);
    // console.log("watch(\"user_types\")", watch());
    // const w = watch("user_types" as any);
    // console.log("watch", w.includes("Founder" | "founder"));

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    // const [fieldsError, setFieldsError] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (register && register.success) {
            refetchUserData();
            // console.log("registerккккк", register);
        }
    }, [register]);

    // useEffect(() => {
    //     if (Object.keys(errors).length > 0) {
    //         setFieldsError(Object.keys(errors));
    //     }
    // }, [errors]);

    // console.log("fieldsError", fieldsError);
    // console.log("entitiesCurrent", entities[currentIndex]);

    // Добавляем donuts ТОЛЬКО для founder
    const entities = Object.keys(watch())?.length && watch()?.user_types && watch().user_types[0].toLowerCase() === "founder"
        ? [...baseEntities, "donuts"]
        : baseEntities;
    // Проверка, заполнено ли текущее поле
    const currentFieldValue = watch(entities[currentIndex] as any);
    // console.log("watch().user_types[0]", Object.keys(watch()).length);
    // console.log("entities", entities);
    // console.log("fsdfsdfsdfsdf", currentFieldValue);
    const checkCurrentField = (() => {
        if (!currentFieldValue) return false; // null или undefined
        if (typeof currentFieldValue === "string") return currentFieldValue.trim() !== "";
        // if (Array.isArray(currentFieldValue)) return currentFieldValue.length > 0;
        if (entities[currentIndex] === "business_models") {

            return watch()?.business_models?.length && watch()?.project_stages?.length;
        }
        if (entities[currentIndex] === "donuts") {
            return currentFieldValue?.purpose_amount && currentFieldValue.purpose_amount.trim() !== "";
        }
        if (typeof currentFieldValue === "object") return Object.keys(currentFieldValue).length > 0;
        // Спец-проверка для donuts
        return true;
    })();

// Проверка всех полей
    const checkAllFields = entities.every(key => key in watch());
    console.log("checkAllFields", checkAllFields);

// Проверка всех полей кроме wallet
    const checkWithoutWallet = entities
        .filter(key => key !== "wallet")
        .every(key => {
            const value = watch(key as any);
            if (value == null) return false;
            if (typeof value === "string") return (value as string).trim() !== "";
            if (Array.isArray(value)) return value.length > 0;
            if (typeof value === "object") return Object.keys(value).length > 0;
            return true;
        });

// Проверка Founder
    const checkFounder = watch("user_types" as any)?.some(
        (tag: string) => tag.toLowerCase() === "founder"
    );


    const placeholder = () => {
        if (entities[currentIndex] === "name") {
            if (checkFounder) {
                return "Name of your company";
            } else {
                return "Your name";
            }
        }
    };
    // console.log("isSuccessRegister", isSuccessRegister);
    // console.log("checkAllFields", checkAllFields);
    // console.log("checkWithoutWallet", checkWithoutWallet);
    // console.log("checkCurrentField", checkCurrentField);
    // console.log("currentFieldValue", currentFieldValue);
    const onSubmit: SubmitHandler<{ user_types: string[]; description: string; project_stages: string[]; geography: string[]; industries: string[]; name: string; business_models: string[]; donuts?: { purpose_amount: string; currency: string }; wallet?: string; }> = (data) => {
        if (checkFounder && !checkAllFields && checkCurrentField || !checkWithoutWallet && checkCurrentField) {
            return;
        }

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
            ...(data?.donuts?.purpose_amount && {
                donuts: {
                    current_amount: 0,
                    purpose_amount: data.donuts.purpose_amount,
                    currency: data.donuts.currency ?? "USD"
                }
            }),
            ...(data?.wallet && {
                wallet: data.wallet
            })
        };
        // console.log("datas", data);
        setLoading(true);
        mutate(body);
        reset();
    };
    // const onClickSubmit = () => setFieldsError(Object.keys(errors));


    // console.log("errors:", Object.keys(errors).length);
    // console.log("errors2:", Object.keys(errors).find(f => f === "Business model"));
    // console.log("isSubmit:", fieldsError);
    // console.log("getforms:", form);
    // if (isSuccess) return <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={isSuccess}/>;
    return (
        <div className={classes.container}>
            {/*<div className="iconContainer">*/}
            {/*    <MemoLogoIcon fill={"#FFFFFF"} stroke={"#FFFFFF"}/>*/}
            {/*</div>*/}
            {(!isSuccess && !isSuccessCurrency) ?
                <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading/> :
                <>
                    <FadeLoader color={"rgb(49,125,148)"} cssOverride={override} loading={loading}/>
                    {/*<div className={classes.nick}>*/}
                    {/*    {initData?.user?.username ?? ""}*/}
                    {/*</div>*/}
                    <div className={classes.title} style={{
                        fontSize: responseFontSize(38),
                        lineHeight: responseFontSize(40)
                    }}>Create account
                    </div>
                    <form id="form" onSubmit={handleSubmit(onSubmit)} className={classes.entitiesContainer}>
                        {form?.data && form?.data?.map((entity, index) => {
                            switch (entity.type) {
                                case "input":
                                    return (
                                        entity.type_value === entities[currentIndex] ? (
                                            <Controller key={index} name={entity.type_value} control={control}
                                                        defaultValue={""}
                                                        rules={{required: entity.type_value !== "wallet"}}
                                                        render={({field: {name, ...restField}}) => <TextInput
                                                            name={name}
                                                            label={entity.type_title}
                                                            placeholder={placeholder()}
                                                            // fieldsError={fieldsError}
                                                            {...restField}/>}/>) : null);
                                case "textarea" :
                                    return (
                                        entity.type_value === entities[currentIndex] ? (
                                            <Controller key={index} name={entity.type_value} control={control}
                                                        defaultValue={""}
                                                        rules={{required: true}}
                                                        render={({field: {name, ...restField}}) => <TextArea
                                                            name={name}
                                                            label={entity.type_title}
                                                            // fieldsError={fieldsError}
                                                            {...restField}/>}/>) : null);
                                case "hashtag":
                                    return (
                                        (entity.type_value === entities[currentIndex] || currentIndex === 3 && entity.type_value === "project_stages") ? (
                                            <Controller key={index} name={entity.type_value} control={control}
                                                        rules={{required: true}}
                                                        render={({field}) => <HashTagsComponent
                                                            label={entity.type_title}
                                                            hashTags={entity.values}
                                                            value={field.value || []} // подключение значений к компоненту
                                                            onChange={field.onChange}
                                                        />}/>) : null
                                    );
                                case "donuts":
                                    return (
                                        checkFounder && entities[currentIndex] === "donuts" ?
                                            <Controller key={index} name={entity.type_value} control={control}
                                                        render={({field: {name, ...restField}}) => <Donuts
                                                            name={name}
                                                            label={entity.type_title}
                                                            currency={currency?.data}
                                                            {...restField}/>}/> : null
                                    );
                                default:
                                    return null;
                            }
                        })
                        }

                        <div className={classes.buttonContainer}>
                            {/* Кнопка "Continue" */}
                            {checkCurrentField && (
                                ((!checkFounder && !checkWithoutWallet) || (checkFounder && !checkAllFields)) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCurrentIndex(prev => prev + 1);
                                        }}
                                        className="footerButton"
                                    >
                                        Continue
                                    </button>
                                )
                            )}

                            {/* Кнопка "Create account" */}
                            {checkCurrentField && (
                                (checkFounder ? checkAllFields : checkWithoutWallet) && (
                                    <button type="submit" name="submit" className="footerButton">
                                        Create account
                                    </button>
                                )
                            )}
                        </div>

                    </form>
                </>}
        </div>

    )
        ;
}

export default SaveProfile;
