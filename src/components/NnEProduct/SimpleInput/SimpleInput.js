import React from "react";

export default function SimpleInput({ name, value, setValue, unit, optional, promotion }) {
    const isMoney = name === "R$" ? true : false;
    const customPlaceholder = isMoney ? "00.00" : "0";

    function forceMoneyMask(string){
        return string.replace(",", ".");
    }

    function handleInput(event){
        let newString = event.target.value;
        if(isMoney){
            newString = forceMoneyMask(newString);
        }
        setValue(newString);
    }

    return (
        <div className="mb-3">
            <div className={promotion ? "input-group promotionalPrice" : "input-group" }>
                <div className="input-group-prepend">
                    <span
                        className="input-group-text"
                        id="inputGroupPrepend2"
                    >
                        {name}
                    </span>
                </div>
                {/* Versao required e nao required */}
                {optional ?
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInput(e)}
                        className="form-control"
                        id="validationDefaultUsername"
                        placeholder={customPlaceholder}
                        aria-describedby="inputGroupPrepend2"
                    />
                    :
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInput(e)}
                        className="form-control"
                        id="validationDefaultUsername"
                        placeholder={customPlaceholder}
                        aria-describedby="inputGroupPrepend2"
                        required
                    />
                }
                {
                    unit && <div className="input-group-append">
                        <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                        >
                            {unit}
                        </span>
                    </div>
                }
            </div>
        </div>
    );
}