import * as React from "react";
import {forwardRef, useState} from "react";
import {useScreenSize} from "../../../common/context/ScreenSizeProvider";
import {ControllerRenderProps} from "react-hook-form";
import {Currency} from "../../../types/types";


interface CurrencyProps extends ControllerRenderProps {
    name: string;
    label: string;
    currency: Currency[] | undefined;
    purposeValue?: string;
    currencyValue?: string;
}

const Donuts = forwardRef<HTMLInputElement, CurrencyProps>(({
                                                                label,
                                                                currency,
                                                                onChange,
                                                                onBlur,
                                                                purposeValue,
                                                                currencyValue
                                                            }, ref) => {
    const {responseFontSize} = useScreenSize();
    const [amount, setAmount] = useState<string | undefined>(purposeValue);
    const [onCurrency, setOnCurrency] = useState<string | undefined>(currencyValue);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        console.log("eeeeee", e);
        // Проверяем, чтобы количество символов не превышало 7
        if (inputValue.length <= 10) {
            setAmount(e.target.value);
            onChange({purpose_amount: e.target.value, currency_id: onCurrency}); // Обновляем значение только если длина допустима
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const target = e.target;  // Элемент, на который был произведен клик или фокус
        setTimeout(() => {
            target.scrollIntoView({behavior: "smooth", block: "center"});
        }, 500);
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOnCurrency(e.target.value);
        onChange({purpose_amount: amount, currency_id: e.target.value});
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
            <div style={{display: "flex", flexDirection: "row"}}>
                <input
                    ref={ref}
                    type="number"
                    placeholder="Enter donuts"
                    value={amount}          // Передается через Controller
                    onChange={handleInputChange}    // Передается через Controller
                    onBlur={onBlur}
                    onFocus={handleFocus}
                    style={{
                        width: "50%",
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

                <select value={onCurrency} onChange={handleCurrencyChange}>
                    {currency?.map((item, index) => (
                        <option key={index} value={item.id}>{item.currency}</option>
                    ))}
                </select>
            </div>
        </div>
    );
});

export default Donuts;
