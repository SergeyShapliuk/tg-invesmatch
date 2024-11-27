import {SVGProps, memo} from "react";

const ArrowSecondaryIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        fill="none"
        {...props}
    >
        <path
            stroke="#6F6F72"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.333}
            d="M5.833 14h16.334M14 5.834 22.167 14 14 22.167"
        />
    </svg>
);
const MemoArrowSecondaryIcon = memo(ArrowSecondaryIcon);
export default MemoArrowSecondaryIcon;
