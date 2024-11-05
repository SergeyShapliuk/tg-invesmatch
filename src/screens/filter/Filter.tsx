import classes from "./Filter.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Sheet} from "react-modal-sheet";
import {GetForm} from "../../types/types";
import HashTagsComponent from "../../components/HashTagsComponent";


function Filter({
                    isOpen,
                    onClose,
                    form,
                    apply
                }: {
    isOpen: boolean, onClose: () => void, form: GetForm[] | undefined, apply: (data: {
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

    const {
        handleSubmit,
        control
    } = useForm<any>();

    const onSubmit: SubmitHandler<{ user_types: string[]; project_stages: string[]; geography: string[]; industries: string[]; business_models: string[] }> = (data) => apply(data);

    // console.log(form);
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
                    }}>Filters
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
                    <Sheet.Scroller
                        style={{display: "flex", flexDirection: "column", paddingTop: 25, paddingBottom: 25, gap: 21}}>
                        {form && form?.map((entity, index) => {
                            switch (entity.type) {
                                case "hashtag":
                                    return (
                                        <Controller key={index} name={entity.type_value} control={control}
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
                        {/*<button onClick={() => setOpen(false)}*/}
                        {/*        style={{*/}
                        {/*            height: 50,*/}
                        {/*            color: "#fff",*/}
                        {/*            fontSize: 19,*/}
                        {/*            marginTop: 25,*/}
                        {/*            backgroundColor: "transparent"*/}
                        {/*        }}>Close*/}
                        {/*</button>*/}
                    </Sheet.Scroller>
                    <div className={classes.buttonContainer}>
                        <button type={"submit"} name={"submit"}
                                className="footerButton">Apply
                        </button>
                    </div>
                </Sheet.Container>
            </form>
            <Sheet.Backdrop style={{backgroundColor: "#FFFFFF"}}/>
        </Sheet>

    );
}

export default Filter;

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
