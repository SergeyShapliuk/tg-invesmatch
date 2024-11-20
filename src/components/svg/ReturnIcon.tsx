import {SVGProps, memo} from "react";

interface ReturnIconProps extends SVGProps<SVGSVGElement> {
    backgroundColor?: string;
}

const ReturnIcon = ({backgroundColor, ...props}: ReturnIconProps) => (
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
            width={28}
            height={28}
            fill="none"
            {...props}
        >
            <path
                stroke="#EFEFEF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M10.5 16.334 4.667 10.5 10.5 4.667"
            />
            <path
                stroke="#EFEFEF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M23.333 23.333v-8.166a4.667 4.667 0 0 0-4.666-4.667h-14"
            />
        </svg>
    </div>
);
const MemoReturnIcon = memo(ReturnIcon);
export default MemoReturnIcon;
