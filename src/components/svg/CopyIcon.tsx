import {SVGProps, memo} from "react";

const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={24}
        fill="none"
        {...props}
    >
        <path
            stroke="#EFEFEF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M1.833 5v16.333A1.167 1.167 0 0 0 3 22.5h10.5m-7-5.833v-14A1.167 1.167 0 0 1 7.667 1.5H17a1.167 1.167 0 0 1 1.167 1.167v14A1.167 1.167 0 0 1 17 17.833H7.667A1.167 1.167 0 0 1 6.5 16.667Z"
        />
    </svg>
);
const MemoCopyIcon = memo(CopyIcon);
export default MemoCopyIcon;
