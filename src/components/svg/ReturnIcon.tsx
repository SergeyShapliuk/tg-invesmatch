import {SVGProps, memo} from "react";

const ReturnIcon = (props: SVGProps<SVGSVGElement>) => (
    <div style={{
        width: "46px",
        height: "46px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 50
    }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={15}
            fill="none"
            {...props}
        >
            <path
                stroke="#5B5E63"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12.111 8.09 6.556 14m0 0L1 8.09M6.556 14V4.782c0-1.324 0-1.986.242-2.492.213-.444.553-.806.97-1.032C8.245 1 8.868 1 10.113 1H21"
            />
        </svg>
    </div>
);
const MemoReturnIcon = memo(ReturnIcon);
export default MemoReturnIcon;
