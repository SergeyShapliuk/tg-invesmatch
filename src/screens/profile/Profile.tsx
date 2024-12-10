import classes from "./Profile.module.css";
import {useUserData} from "../../common/context/UserProvider";
import ItemProfile from "../../components/main/ItemProfile";
import {useNavigate} from "react-router-dom";


// const entities: { companyName: string, description: string, hashTags?: string[] } = {
//     companyName: "Company name",
//     description: "Industries jlkdfh ldfkhldfkhldkfhlkhlkhlkh  lkhdflkghldfkhglk lkdfhg ldkfh lkd",
//     hashTags: ["FoodTech", "EdTech", "Crypto", "TravelTech", "Blockchain", "AI", "Gaming", "SocialMedia", "Mobility", "FashionTech", "E-commerce"]
// };


function Profile() {
    const navigate = useNavigate();
    // const {responseFontSize} = useScreenSize();
    const {userData} = useUserData();



    // console.log("userData", userData);

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
                {userData && <div className={classes.scrollContainer}>
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
                    <ItemProfile item={userData}/>
                </div>}
                <div className={classes.buttonContainer}>
                    <button type={"submit"} name={"submit"} onClick={()=>navigate('/profile/update')}
                            className="footerButton" style={{backgroundColor: "#FFFFFF1F"}}>Edit profile
                    </button>
                </div>
            </div>
            {/*<UpdateProfile isOpen={openUpdate} onClose={() => setOpenUpdate(false)} form={form?.data}/>*/}
        </>
    );
}

export default Profile;
