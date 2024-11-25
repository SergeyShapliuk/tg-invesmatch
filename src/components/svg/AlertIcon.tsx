import {SVGProps, memo} from "react";

const AlertIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        fill="none"
        {...props}
    >
        <path
            stroke="#EE4040"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M14 25.666c6.443 0 11.667-5.223 11.667-11.666 0-6.444-5.224-11.667-11.667-11.667S2.333 7.556 2.333 14c0 6.443 5.224 11.666 11.667 11.666ZM14 9.333V14M14 18.667h.012"
        />
    </svg>
);
const MemoAlertIcon = memo(AlertIcon);
export default MemoAlertIcon;
