import {SVGProps, memo} from "react";


const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="55%"
        // height={28}
        viewBox="0 0 29 28"
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
);
const MemoCloseIcon = memo(CloseIcon);
export default MemoCloseIcon;
