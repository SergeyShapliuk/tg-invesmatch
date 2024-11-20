import {SVGProps, memo} from "react";

const ShareIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        fill="none"
        {...props}
    >
        <path
            stroke="#EFEFEF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 14v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M18 8l-4-4-4 4M14 4v13"
        />
    </svg>
);
const MemoShareIcon = memo(ShareIcon);
export default MemoShareIcon;
