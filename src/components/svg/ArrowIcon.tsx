import {SVGProps, memo} from "react";

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={12}
        height={14}
        fill="none"
        {...props}
    >
        <path
            stroke="currentFill"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m7.8 13-6-6 6-6"
        />
    </svg>
);
const MemoArrowIcon = memo(ArrowIcon);
export default MemoArrowIcon;
