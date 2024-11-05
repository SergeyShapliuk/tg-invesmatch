import {SVGProps, memo} from "react";

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={37}
        height={37}
        fill="none"
        {...props}
    >
        <path
            stroke="currentFill"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3.068}
            d="M30.677 32.211c0-4.235-5.494-7.669-12.27-7.669-6.778 0-12.272 3.434-12.272 7.67M18.406 19.94a7.67 7.67 0 1 1 0-15.338 7.67 7.67 0 0 1 0 15.338Z"
        />
    </svg>
);
const MemoUserIcon = memo(UserIcon);
export default MemoUserIcon;
