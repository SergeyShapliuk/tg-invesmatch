import classes from "./Profile.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import {SubmitHandler, useForm} from "react-hook-form";
import MemoLogoIcon from "../../components/svg/LogoIcon";
import {useUserData} from "../../common/context/UserProvider";
import {useEffect, useState} from "react";
import {UpdateVariables} from "../../types/types";
import {useUpdateUser} from "../../api/hooks/useUpdateUser";
import {initInitData} from "@telegram-apps/sdk-react";

// const entities: { companyName: string, description: string, hashTags?: string[] } = {
//     companyName: "Company name",
//     description: "Industries jlkdfh ldfkhldfkhldkfhlkhlkhlkh  lkhdflkghldfkhglk lkdfhg ldkfh lkd",
//     hashTags: ["FoodTech", "EdTech", "Crypto", "TravelTech", "Blockchain", "AI", "Gaming", "SocialMedia", "Mobility", "FashionTech", "E-commerce"]
// };


function Profile() {
    const initData = initInitData();
    const {responseFontSize} = useScreenSize();
    const {userData} = useUserData();

    const {mutate} = useUpdateUser();

    const [hashTags, setHashTags] = useState<string[]>([]);
    // const [profile, setProfile] = useState<{ type_value: string, values: { id: number, value: string }[] }[]>([]);

    const {
        handleSubmit
    } = useForm();

    console.log("userData", userData);

    // useEffect(() => {
    //     if (userData) {
    //         const initialData = Object.entries(userData)
    //             .filter(([, value]) => Array.isArray(value)) // Отбираем только массивы
    //             .map(([key, value]) => ({
    //                 type_value: key,
    //                 values: value.map((item, index) => ({id: index + 1, value: item}))
    //             }));
    //         setProfile(initialData);
    //     }
    //
    // }, [userData]);
    useEffect(() => {
        if (userData) {
            const hashTagsConcat = [...userData.business_models, ...userData.geography, ...userData.industries, ...userData.project_stages, ...userData.user_types];
            setHashTags(hashTagsConcat);
        }

    }, [userData]);

    const onSubmit: SubmitHandler<{ user_types?: string[]; project_stages?: string[]; geography?: string[]; industries?: string[]; business_models?: string[] }> = (data) => {
        const filteredBody = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value)
        );
        const body: UpdateVariables = {
            tg_id: initData?.user?.id.toString() ?? "", ...filteredBody
        };
        console.log("datas", filteredBody);
        mutate(body);
    };

    // console.log("userData", userData);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
            <div className="iconContainer">
                <MemoLogoIcon fill={"#FFFFFF"} stroke={"#FFFFFF"}/>
            </div>
            <div className={classes.scrollContainer}>
                <div className={classes.name}
                     style={{fontSize: responseFontSize(48), lineHeight: responseFontSize(45)}}>
                    {userData?.name}
                </div>
                <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3}}>
                    {hashTags.map((item, index) => (
                        <div key={index} className="hashButton"
                             style={{backgroundColor: "#286EF2"}}>#{item}</div>
                    ))}
                </div>
                {/*<div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 5}}>*/}
                {/*    {profile.map((item, index) => (*/}
                {/*        <Controller key={index} name={item.type_value} control={control}*/}
                {/*                    render={({field}) => <HashTagsComponent label={""}*/}
                {/*                                                            hashTags={item.values}*/}
                {/*                                                            value={field.value || []} // подключение значений к компоненту*/}
                {/*                                                            onChange={field.onChange}*/}
                {/*                    />}/>*/}
                {/*    ))}*/}
                {/*</div>*/}
                <div>
                    <div style={{
                        color: "#FFFFFF",
                        fontSize: responseFontSize(24),
                        fontWeight: "600",
                        lineHeight: responseFontSize(31),
                        letterSpacing: -0.04
                    }}>Description
                    </div>
                    <div>{userData?.description}</div>
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <button type={"submit"} name={"submit"} className="footerButton">Change
                    profile
                </button>
            </div>

        </form>

    );
}

export default Profile;
