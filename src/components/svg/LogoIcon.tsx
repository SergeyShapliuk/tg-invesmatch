import {SVGProps, memo} from "react";

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={64}
            height={64}
            fill="none"
            {...props}
        >
            <path
                fill="currentFill"
                fillRule="evenodd"
                stroke="currentFill"
                strokeWidth={12.621}
                d="M54.584 54.583c-4.143 4.142-10.86 4.142-15.002 0l-30.08-30.08c-4.143-4.143-4.143-10.86 0-15.002 4.142-4.143 10.858-4.143 15 0l30.082 30.08c4.142 4.143 4.142 10.86 0 15.002Z"
                clipRule="evenodd"
            />
            <path
                fill="currentFill"
                fillRule="evenodd"
                stroke="currentFill"
                strokeWidth={12.621}
                d="M9.5 54.583c-4.142-4.142-4.142-10.859 0-15.001L39.583 9.5c4.142-4.143 10.858-4.143 15.001 0 4.142 4.142 4.142 10.859 0 15.001l-30.08 30.081c-4.143 4.142-10.86 4.142-15.002 0Z"
                clipRule="evenodd"
            />
        </svg>
);
const MemoLogoIcon = memo(LogoIcon);
export default MemoLogoIcon;
