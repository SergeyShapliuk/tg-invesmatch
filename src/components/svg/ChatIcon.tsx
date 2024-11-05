import {SVGProps, memo} from "react";

const ChatIcon = (props: SVGProps<SVGSVGElement>) => (
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
            d="M11.518 30.373a13.74 13.74 0 0 0 6.887 1.838c7.625 0 13.806-6.18 13.806-13.804 0-7.625-6.18-13.805-13.805-13.805-7.624 0-13.805 6.18-13.805 13.805 0 2.508.669 4.86 1.838 6.886l.004.008c.113.195.17.294.195.387a.733.733 0 0 1 .025.257c-.007.097-.04.198-.107.4l-1.179 3.538-.002.005c-.248.746-.373 1.12-.284 1.368a.77.77 0 0 0 .466.466c.248.088.62-.036 1.363-.284l.009-.003 3.538-1.18c.201-.066.303-.1.4-.107.092-.006.17.002.257.026.094.026.192.083.388.196l.006.003Z"
        />
    </svg>
);
const MemoChatIcon = memo(ChatIcon);
export default MemoChatIcon;
