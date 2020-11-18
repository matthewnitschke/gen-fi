import React, { useState } from 'react';

export default function TextInput({
    value,
    onValueChange,
}) {
    const [isEditing, setIsEditing] = useState(false);

    const [internalValue, setInternalValue] = useState(value);

    function commitValue() {
        setIsEditing(false);

        onValueChange(internalValue);
    }

    return <div className={`text-input ${isEditing ? 'editing' : ''}`}>
        {isEditing &&
            <input
                type="text"
                value={internalValue}
                onChange={(e) => setInternalValue(e.target.value)}
                className="text-input__input"
                autoFocus={true}
                onBlur={commitValue}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        commitValue()
                    }
                }}
            />
        }

        {!isEditing &&
            <div
                onClick={() => setIsEditing(true)}
            >{internalValue}</div>
        }
    </div>
}