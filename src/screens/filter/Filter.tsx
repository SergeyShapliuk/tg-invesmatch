import classes from "./Filter.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Form} from "../../types/types";
import HashTagsComponent from "../../components/HashTagsComponent";
import MemoCloseIcon from "../../components/svg/CloseIcon";
import {useEffect, useState} from "react";


function Filter({
                    onClose,
                    form,
                    apply
                }: {
    onClose: () => void, form: Form[] | undefined, apply: (data: {
        business_models?: string[];
        description?: string;
        geography?: string[];
        industries?: string[];
        name?: string;
        project_stages?: string[];
        user_types?: string[];
        wallet?: string;
    }) => void
}) {
    const {responseFontSize} = useScreenSize();
    // const {userData} = useUserData();

    const [isButton, setIsButton] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        watch
    } = useForm<any>();


    const watchedValues = watch();

    useEffect(() => {
        const hasValues = Object.values(watchedValues).some(
            value => Array.isArray(value) ? value.length > 0 : value !== undefined && value !== ""
        );
        setIsButton(hasValues);
    }, [watchedValues]);

    const onSubmit: SubmitHandler<{ user_types: string[]; project_stages: string[]; geography: string[]; industries: string[]; business_models: string[] }> = (data) => apply(data);

    // console.log("filter", Object.keys(watch()).length > 0);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
            <div className={classes.title} style={{
                fontSize: responseFontSize(38),
                lineHeight: responseFontSize(40)
            }}>Filters
            </div>
            <div onClick={() => {
                onClose();
            }} className="icon-style" style={{position: "absolute", top: 12, right: 12}}>
                <MemoCloseIcon color={"rgba(255,255,255,0.45)"}/>
            </div>

            <div className={classes.scrollContainer}>
                {form && form?.map((entity, index) => {
                    switch (entity.type) {
                        case "hashtag":
                            return (
                                <Controller key={index} name={entity.type_value} control={control} defaultValue=""
                                            render={({field}) => <HashTagsComponent label={entity.type_title}
                                                                                    hashTags={entity.values}
                                                                                    value={field.value || []} // подключение значений к компоненту
                                                                                    onChange={field.onChange}
                                            />}/>);
                        default:
                            return null;
                    }
                })
                }
            </div>
            {isButton && <div className={classes.buttonContainer}>
                <button type={"submit"} name={"submit"}
                        className="footerButton">Apply
                </button>
            </div>}
        </form>

    );
}

export default Filter;

