import {SVGProps, memo} from "react";

const BellIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={37}
        height={36}
        fill="none"
        {...props}
    >
        <path
            stroke="currentFill"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M27.5 12a9 9 0 1 0-18 0C9.5 22.5 5 25.5 5 25.5h27s-4.5-3-4.5-13.5ZM21.095 31.5a3 3 0 0 1-5.19 0"
        />
    </svg>
);
const MemoBellIcon = memo(BellIcon);
export default MemoBellIcon;
