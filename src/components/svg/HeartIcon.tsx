import {SVGProps, memo} from "react";

const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
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
            width={29}
            height={28}
            fill="none"
            {...props}
        >
            <path fill="#fff" d="M.184 0h27.943v27.943H.184z"/>
            <path
                stroke="#1B1F26"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={0.72}
                strokeWidth={2.329}
                d="M14.156 8.958C11.827 3.493 3.677 4.075 3.677 11.06c0 6.986 10.479 12.808 10.479 12.808s10.478-5.822 10.478-12.807c0-6.986-8.15-7.568-10.478-2.103Z"
            />
        </svg>
    </div>
);
const MemoHeartIcon = memo(HeartIcon);
export default MemoHeartIcon;
