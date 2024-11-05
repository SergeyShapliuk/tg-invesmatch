import HashButton from "./ui/button/HashButton";
import {useScreenSize} from "../common/context/ScreenSizeProvider";

interface HashTagsComponentProps {
    label: string;
    hashTags: { id: number, value: string }[];
    value: string[]; // Для react-hook-form
    onChange: (value: string[]) => void; // Для react-hook-form
}

function HashTagsComponent({label, hashTags, value, onChange}: HashTagsComponentProps) {
    const {responseFontSize} = useScreenSize();

    const handleTagClick = (tag: string) => {
        if (value && value.includes(tag)) {
            onChange(value.filter(item => item !== tag)); // Убираем тег, если он уже выбран
        } else {
            onChange([...value, tag]); // Добавляем тег
        }
    };
    // console.log('hashhhhhh',hashTags);
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <label style={{
                color: "#FFFFFF",
                fontSize: responseFontSize(24),
                fontWeight: "600",
                lineHeight: responseFontSize(31),
                letterSpacing: -0.04
            }}>{label}</label>
            <div style={{display: "flex", flexWrap: "wrap", gap: 5}}>
                {hashTags.map((hashTag, index) => (
                    <HashButton key={index} label={hashTag.value} isSelected={value.includes(hashTag.value)}
                                onClick={() => handleTagClick(hashTag.value)}/>
                ))}
            </div>
        </div>
    );
}

export default HashTagsComponent;
