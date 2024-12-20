import * as React from "react";
import {forwardRef} from "react";
import {useScreenSize} from "../../../common/context/ScreenSizeProvider";
import {ControllerRenderProps} from "react-hook-form";


interface TextInputProps extends ControllerRenderProps {
    name: string;
    label: string;
    // fieldsError: string[];
}

const TextArea = forwardRef<HTMLTextAreaElement, TextInputProps>(({
                                                                      // name,
                                                                      label,
                                                                      value,
                                                                      onChange,
                                                                      onBlur
                                                                      // fieldsError
                                                                  }, ref) => {
    const {responseFontSize} = useScreenSize();

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const target = e.target;
        setTimeout(() => {
            target.scrollIntoView({behavior: "smooth", block: "center"});
        }, 500);
    };

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
            <textarea
                ref={ref}
                placeholder="Enter the text"
                value={value}          // Передается через Controller
                onChange={onChange}    // Передается через Controller
                onBlur={onBlur}
                onFocus={handleFocus}
                // autoComplete="off"
                // autoCorrect="off"
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        event.currentTarget.blur();
                    }
                }}
                style={{
                    // width: "100%",
                    minWidth: "100%",
                    maxWidth: "100%",
                    // height: "74px",
                    minHeight: "74px",
                    maxHeight: "74px",
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

TextArea.displayName = "TextArea";

export default TextArea;
