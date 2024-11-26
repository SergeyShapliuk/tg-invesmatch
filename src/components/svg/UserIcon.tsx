import {SVGProps, memo} from "react";

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
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
            d="M18.5 16.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM30.5 31.5v-3a6 6 0 0 0-6-6h-12a6 6 0 0 0-6 6v3"
        />
    </svg>
);
const MemoUserIcon = memo(UserIcon);
export default MemoUserIcon;
