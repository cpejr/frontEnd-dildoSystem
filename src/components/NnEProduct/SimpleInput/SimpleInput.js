import React from "react";

export default function SimpleInput({ name, value, setValue, unit, optional, promotion }) {
    const customPlaceholder = name === "R$" ? "00.00" : "0";
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
                        onChange={(e) => setValue(e.target.value)}
                        className="form-control"
                        id="validationDefaultUsername"
                        placeholder={customPlaceholder}
                        aria-describedby="inputGroupPrepend2"
                    />
                    :
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
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