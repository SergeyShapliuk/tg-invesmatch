import classes from "./UpdateProfile.module.css";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Sheet} from "react-modal-sheet";
import {Form, UpdateVariables, User} from "../../../types/types";
import {useScreenSize} from "../../../common/context/ScreenSizeProvider";
import TextInput from "../../../components/ui/input/TextInput";
import TextArea from "../../../components/ui/input/TextArea";
import HashTagsComponent from "../../../components/HashTagsComponent";
import {useUpdateUser} from "../../../api/hooks/useUpdateUser";
import {initInitData} from "@telegram-apps/sdk-react";
import {useUserData} from "../../../common/context/UserProvider";
import {useEffect} from "react";
import {useFetchCurrency} from "../../../api/hooks/useFetchCurrency";
import Donuts from "../../../components/ui/donuts/Donuts";


function UpdateProfile({
                           isOpen,
                           onClose,
                           form
                       }: {
    isOpen: boolean, onClose: () => void, form: Form[] | undefined
}) {
    const initData = initInitData();
    const {responseFontSize} = useScreenSize();
    const {refetchUserData} = useUserData();
    const {userData} = useUserData();
    const {mutate, isSuccess} = useUpdateUser();
    const {data: currency} = useFetchCurrency();

    const {
        handleSubmit,
        control,
        reset
    } = useForm<any>();

    useEffect(() => {
        if (isSuccess) {
            console.log("useEffect");
            refetchUserData();
            onClose();
            reset();
        }
    }, [isSuccess]);

    const onSubmit: SubmitHandler<{
        user_types?: string[]; project_stages?: string[]; geography?: string[]; industries?: string[]; business_models?: string[]; donuts?: {
            current_amount: string;
            purpose_amount: string;
            currency_id: string;
        }
    }> = (data) => {
        const filteredBody = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value)
        );
        const body: UpdateVariables = {
            tg_id: initData?.user?.id.toString() ?? "", ...filteredBody
        };
        console.log("datas", filteredBody);
        mutate(body);
    };
    console.log(form);
    return (

        <Sheet isOpen={isOpen} onClose={onClose} disableDrag style={{}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Sheet.Container style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    borderTopLeftRadius: "7px",
                    borderTopRightRadius: "7px",
                    backgroundColor: "black",
                    padding: 25

                }}>
                    {/*<Sheet.Header disableDrag/>*/}
                    <div style={{
                        fontSize: responseFontSize(48),
                        fontWeight: "600",
                        lineHeight: responseFontSize(45)
                    }}>Edit
                    </div>
                    <div onClick={() => {
                        onClose();
                    }}>
                        <div style={{
                            position: "absolute",
                            width: 29,
                            height: 29,
                            top: 20,
                            right: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 50,
                            backgroundColor: "rgba(255,255,255,0.3)"
                            // padding: 7
                        }}>
                            <CloseIcon color={"rgba(255,255,255,0.45)"}/>
                        </div>

                    </div>
                    <div className={classes.scrollContainer}>
                        {form && form?.map((entity, index) => {
                            switch (entity.type) {
                                case "input":
                                    return (
                                        <Controller key={index} name={entity.type_value} control={control}
                                                    defaultValue={(userData && userData[entity.type_value as keyof User]) || ""}
                                                    render={({field: {name, ...restField}}) => <TextInput
                                                        name={name}
                                                        label={entity.type_title}
                                                        {...restField}/>}/>);
                                case "textarea":
                                    return (
                                        <Controller key={index} name={entity.type_value} control={control}
                                                    defaultValue={(userData && userData[entity.type_value as keyof User]) || ""}
                                                    render={({field: {name, ...restField}}) => <TextArea
                                                        name={name}
                                                        label={entity.type_title}
                                                        {...restField}/>}/>);
                                case "hashtag":
                                    return (
                                        <Controller key={index} name={entity.type_value} control={control}
                                                    render={({field}) => <HashTagsComponent
                                                        label={entity.type_title}
                                                        hashTags={entity.values}
                                                        value={field.value || (userData && userData[entity.type_value as keyof User]) || []} // подключение значений к компоненту
                                                        onChange={field.onChange}
                                                    />}/>);
                                case "donuts":
                                    return (
                                        <Controller key={index} name={entity.type_value} control={control}
                                                    render={({field: {name, ...restField}}) => <Donuts
                                                        name={name}
                                                        label={entity.type_title}
                                                        currency={currency?.data}
                                                        purposeValue={(userData && parseInt(userData.donuts["purpose_amount"]).toString())}
                                                        currencyValue={(userData && userData.donuts["currency_id"])}
                                                        {...restField}/>}/>);
                                default:
                                    return null;
                            }
                        })
                        }

                        {/*<div className={classes.buttonContainer}>*/}
                        {/*    <button type={"submit"} name={"submit"} className="footerButton">Update profile</button>*/}
                        {/*</div>*/}
                    </div>
                    <div className={classes.buttonContainer}>
                        <button type={"submit"} name={"submit"}
                                className="footerButton">Update profile
                        </button>
                    </div>

                </Sheet.Container>
            </form>
            <Sheet.Backdrop style={{backgroundColor: "#FFFFFF"}}/>
        </Sheet>

    );
}

export default UpdateProfile;

function CloseIcon({color}: { color: string }) {
    return (
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
    );
}
