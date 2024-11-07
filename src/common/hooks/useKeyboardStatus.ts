import {useState, useEffect} from "react";

export const useKeyboardStatus = () => {
    const [isKeyboardOpen, setKeyboardOpen] = useState(false);
    const [initialHeight, setInitialHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            // Сравниваем текущую высоту с исходной
            if (window.innerHeight < initialHeight) {
                setKeyboardOpen(true);
            } else {
                setKeyboardOpen(false);
            }
        };

        // Запоминаем исходную высоту при первой загрузке компонента
        setInitialHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [initialHeight]);

    return isKeyboardOpen;
};
