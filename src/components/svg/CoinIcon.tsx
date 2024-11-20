import {SVGProps, memo} from "react";

interface CoinIconProps extends SVGProps<SVGSVGElement> {
    backgroundColor?: string;
}

const CoinIcon = ({backgroundColor, ...props}: CoinIconProps) => (
    <div style={{
        width: 52,
        height: 52,
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        borderRadius: 50
    }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={20}
            fill="none"
            {...props}
        >
            <path
                fill="#EFEFEF"
                d="M12.506.917C19.406.917 25 3.968 25 7.732v4.543c0 3.764-5.594 6.815-12.494 6.815-6.777 0-12.294-2.943-12.49-6.614l-.005-.2V7.731C.011 3.968 5.605.917 12.506.917Zm0 13.63c-4.226 0-7.962-1.144-10.223-2.896v.624c0 2.138 4.41 4.544 10.223 4.544 5.691 0 10.038-2.306 10.217-4.41l.005-.134.002-.625c-2.261 1.752-5.998 2.897-10.224 2.897Zm0-11.358c-5.813 0-10.223 2.405-10.223 4.543 0 2.138 4.41 4.543 10.223 4.543 5.812 0 10.222-2.405 10.222-4.543 0-2.138-4.41-4.543-10.222-4.543Z"
            />
        </svg>
    </div>
);
const MemoCoinIcon = memo(CoinIcon);
export default MemoCoinIcon;
