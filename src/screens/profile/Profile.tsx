import classes from "./Profile.module.css";
import {useScreenSize} from "../../common/context/ScreenSizeProvider";
import MemoLogoIcon from "../../components/svg/LogoIcon";
import {useUserData} from "../../common/context/UserProvider";
import {useState} from "react";
import UpdateProfile from "./update/UpdateProfile";
import {useFetchForms} from "../../api/hooks/useFetchForms";


// const entities: { companyName: string, description: string, hashTags?: string[] } = {
//     companyName: "Company name",
//     description: "Industries jlkdfh ldfkhldfkhldkfhlkhlkhlkh  lkhdflkghldfkhglk lkdfhg ldkfh lkd",
//     hashTags: ["FoodTech", "EdTech", "Crypto", "TravelTech", "Blockchain", "AI", "Gaming", "SocialMedia", "Mobility", "FashionTech", "E-commerce"]
// };


function Profile() {
    // const navigation = useNavigate();
    const {responseFontSize} = useScreenSize();
    const {userData} = useUserData();

    const {data: form} = useFetchForms();

    const [openUpdate, setOpenUpdate] = useState<boolean>(false);


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


    return (
        <>
            <div className={classes.container}>
                <div className="iconContainer">
                    <MemoLogoIcon fill={"#FFFFFF"} stroke={"#FFFFFF"}/>
                </div>
                {userData && <div className={classes.scrollContainer}>
                    <div className={classes.name}
                         style={{fontSize: responseFontSize(48), lineHeight: responseFontSize(45)}}>
                        {userData?.name}
                    </div>
                    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3}}>
                        {Object.values(userData.hashtags ?? {}).flat().map((item, index) => (
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
                                    width: `${Number(userData?.donuts.current_amount) / Number(userData?.donuts.purpose_amount) * 100}%`,
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    borderRadius: "7px",
                                    backgroundColor: "#286EF2",
                                    zIndex: 0
                                }}/>
                            <div
                                className={classes.donatsText}>Collect {Number(userData?.donuts.current_amount).toString()}$
                                of {Number(userData?.donuts.purpose_amount).toString()}$
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
                        <div>{userData?.description}</div>
                    </div>
                </div>}
                <div className={classes.buttonContainer}>
                    <button type={"submit"} name={"submit"} onClick={() => setOpenUpdate(true)}
                            className="footerButton">Change
                        profile
                    </button>
                </div>
            </div>
            <UpdateProfile isOpen={openUpdate} onClose={() => setOpenUpdate(false)} form={form?.data}/>
        </>
    );
}

export default Profile;
