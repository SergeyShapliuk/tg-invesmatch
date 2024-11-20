import {SVGProps, memo} from "react";

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        fill="none"
        {...props}
    >
        <path
            fill="#EFEFEF"
            d="M18.5 15a3.501 3.501 0 0 1 3.355 2.5H24a1 1 0 1 1 0 2h-2.145a3.501 3.501 0 0 1-6.71 0H4a1 1 0 1 1 0-2h11.145A3.501 3.501 0 0 1 18.5 15Zm0 1.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM10.5 6a3.501 3.501 0 0 1 3.355 2.5H24a1 1 0 1 1 0 2H13.855a3.501 3.501 0 0 1-6.71 0H4a1 1 0 1 1 0-2h3.145A3.502 3.502 0 0 1 10.5 6Zm0 1.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z"
        />
    </svg>
);
const MemoFilterIcon = memo(FilterIcon);
export default MemoFilterIcon;
