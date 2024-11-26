import {SVGProps, memo} from "react";

const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        fill="none"
        {...props}
    >
        <path
            fill="#EFEFEF"
            d="M24.161 4.264s2.267-.884 2.078 1.262c-.063.884-.63 3.977-1.07 7.323l-1.511 9.91s-.126 1.452-1.26 1.705c-1.133.252-2.832-.884-3.147-1.136-.252-.19-4.722-3.03-6.296-4.42-.44-.378-.944-1.136.063-2.02l6.61-6.312c.756-.757 1.511-2.525-1.637-.379l-8.813 5.997s-1.008.632-2.896.064l-4.093-1.263s-1.51-.947 1.07-1.894c6.296-2.967 14.04-5.997 20.902-8.837Z"
        />
    </svg>
);
const MemoTelegramIcon = memo(TelegramIcon);
export default MemoTelegramIcon;
