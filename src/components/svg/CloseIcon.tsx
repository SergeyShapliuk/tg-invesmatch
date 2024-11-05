import {SVGProps, memo} from "react";

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
    <div style={{
        width: "52px",
        height: "52px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 50
    }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <path
                stroke="#1B1F26"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={0.72}
                strokeWidth={2.328}
                d="m20.366 20.366-8.729-8.728m0 0L2.91 2.909m8.729 8.729 8.728-8.729m-8.729 8.729L2.91 20.366"
            />
        </svg>
    </div>
);
const MemoCloseIcon = memo(CloseIcon);
export default MemoCloseIcon;
