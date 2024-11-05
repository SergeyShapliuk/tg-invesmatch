import {SVGProps, memo} from "react";

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={19}
        fill="none"
        {...props}
    >
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M8 17h15M8 9.5h15M8 2h15M2.003 17v.003H2V17h.003Zm0-7.5v.003H2V9.5h.003Zm0-7.5v.003H2V2h.003Z"
        />
    </svg>
);
const MemoFilterIcon = memo(FilterIcon);
export default MemoFilterIcon;
