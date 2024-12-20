import {SVGProps, memo} from "react";


const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="55%"
        height={25}
        viewBox="0 0 29 25"
        fill="none"
        {...props}
    >
        <path
            fill="currentFill"
            d="M26.037 2.146a7.333 7.333 0 0 0-10.374 0L14.25 3.56l-1.413-1.413A7.335 7.335 0 0 0 2.463 12.52l1.414 1.413L14.25 24.306l10.373-10.373 1.414-1.413a7.333 7.333 0 0 0 0-10.374Z"
        />
    </svg>
);
const MemoHeartIcon = memo(HeartIcon);
export default MemoHeartIcon;
