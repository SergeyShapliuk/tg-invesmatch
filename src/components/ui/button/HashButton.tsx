import {useScreenSize} from "../../../common/context/ScreenSizeProvider";

function HashButton({label, isSelected, onClick}: { label: string, isSelected: boolean, onClick: () => void }) {
    const {responseFontSize} = useScreenSize();

    return (
        <button type="button" onClick={onClick} className="hashButton"
                style={{
                    color: "#EFEFEF",
                    fontSize: responseFontSize(18),
                    lineHeight: responseFontSize(24),
                    backgroundColor: isSelected ? "#0062FF" : undefined
                }}>
            {label}
        </button>
    );
}

export default HashButton;
