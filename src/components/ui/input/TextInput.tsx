import * as React from "react";
import {forwardRef} from "react";
import {useScreenSize} from "../../../common/context/ScreenSizeProvider";
import {ControllerRenderProps} from "react-hook-form";


interface TextInputProps extends ControllerRenderProps {
    name: string;
    label: string;
    placeholder?: string;
    // fieldsError: string[];
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
                                                                    // name,
                                                                    label,
                                                                    value,
                                                                    onChange,
                                                                    onBlur,
                                                                    placeholder
                                                                    // fieldsError
                                                                }, ref) => {
    const {responseFontSize} = useScreenSize();

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const target = e.target;  // Элемент, на который был произведен клик или фокус
        setTimeout(() => {
            target.scrollIntoView({behavior: "smooth", block: "center"});
        }, 500);
    };
    // console.log("TextInputPropserror", fieldsError);
    // console.log("TextInputPropserror2", label, valid);

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 5}}>
            <label style={{
                color: "#FFFFFF",
                fontSize: responseFontSize(24),
                fontWeight: "600",
                lineHeight: responseFontSize(31),
                letterSpacing: -0.04
            }}>{label}</label>
            {/*{fieldsError.length === 0 || fieldsError.find(f => f === name) ?*/}
            <input
                ref={ref}
                type="text"
                inputMode="text"
                placeholder={placeholder}
                value={value}          // Передается через Controller
                onChange={onChange}    // Передается через Controller
                onBlur={onBlur}
                onFocus={handleFocus}
                style={{
                    width: "100%",
                    color: "#FFFFFF",
                    fontFamily: "Onest",
                    fontSize: "16px",
                    lineHeight: "21px",
                    backgroundColor: "transparent",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255,255,255,0.4)",
                    borderRadius: "7px",
                    padding: "10px",
                    outline: "none"
                }}/>
            {/*:*/}
            {/*    <div style={{*/}
            {/*        width: "100%",*/}
            {/*        color: "#FFFFFF",*/}
            {/*        padding: "10px"*/}
            {/*    }}>{value}</div>}*/}
        </div>
    );
});

export default TextInput;
