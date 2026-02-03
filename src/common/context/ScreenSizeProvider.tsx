import {createContext, useState, useContext, ReactNode, useEffect} from "react";

interface ScreenSizeContextProps {
    screenSize: { width: number, height: number };
    responseFontSize: (value: number) => string;
}

const ScreenSizeContext = createContext<ScreenSizeContextProps | undefined>(undefined);

export const ScreenSizeProvider = ({children}: { children: ReactNode }) => {

    const [screenSize, setScreenSize] = useState<{ width: number, height: number }>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {

        const updateScreenSize = () => {
            // Используем window.visualViewport для мобильных устройств, если оно доступно
            const width = window.visualViewport ? window.visualViewport.width : window.innerWidth;
            const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;

            setScreenSize({width, height});
        };

        updateScreenSize();

        window.addEventListener("resize", updateScreenSize);

        window.visualViewport?.addEventListener("resize", updateScreenSize);

        return () => {
            window.removeEventListener("resize", updateScreenSize);
            window.visualViewport?.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    const responseFontSize = (size: number) => {
        const { width } = screenSize;
        const baseWidth = 390;

        // Для мобильных устройств - пропорционально
        if (width <= 768) {
            return `${(width / baseWidth) * size}px`;
        }

        // Для планшетов и десктопов - ограниченное увеличение
        // Используем формулу: размер + (ширина экрана - базовая ширина) * коэффициент
        const scaleFactor = 0.02; // Коэффициент увеличения
        const scaledSize = size + (width - baseWidth) * scaleFactor;

        // Ограничиваем максимальный размер
        const maxSize = size * 1.5;
        const finalSize = Math.min(scaledSize, maxSize);

        return `${finalSize}px`;
    };

    return (
        <ScreenSizeContext.Provider value={{screenSize, responseFontSize}}>
            {children}
        </ScreenSizeContext.Provider>
    );
};

export const useScreenSize = () => {
    const context = useContext(ScreenSizeContext);
    if (!context) {
        throw new Error("useScreenSize must be used within a ScreenSizeProvider");
    }
    return context;
};
