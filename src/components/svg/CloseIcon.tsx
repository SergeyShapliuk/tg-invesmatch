import {SVGProps, memo} from "react";

interface CloseIconProps extends SVGProps<SVGSVGElement> {
    backgroundColor?: string;
}

const CloseIcon = ({backgroundColor, ...props}: CloseIconProps) => (
    <div style={{
        width: 52,
        height: 52,
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        borderRadius: 50
    }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={29}
            height={28}
            fill="none"
            {...props}
        >
            <path
                stroke="#EFEFEF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.3}
                d="m21.5 7-14 14M7.5 7l14 14"
            />
        </svg>
    </div>
);
const MemoCloseIcon = memo(CloseIcon);
export default MemoCloseIcon;
