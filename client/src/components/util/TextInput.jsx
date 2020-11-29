import React, { useState } from 'react';

export default function TextInput(props) {
    const [isEditing, setIsEditing] = useState(false);

    const [internalValue, setInternalValue] = useState(props.value);

    function commitValue() {
        setIsEditing(false);

        
        !!props.onValueChange && props.onValueChange(internalValue);
    }

    return <div className={`text-input ${isEditing ? 'editing' : ''}`}>
        {isEditing &&
            <input
                {...props}
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
                onFocus={() => setIsEditing(true)}
                tabIndex={props.tabIndex}
            >{
                internalValue ?? props.placeholder
            }</div>
        }
    </div>
}