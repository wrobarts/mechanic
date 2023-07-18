import React, {useReducer, useState, useEffect} from 'react';
import {validate} from '../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            };
        case "QUANTITY":
            return {
                ...state,
                value: action.val
            };
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || "",
        isTouched: false,
        isValid: props.initialIsValid || false
    });

    const [numberInputValue, setNumberInputValue] = useState(props.initialValue || 1);

    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators
        });
        setNumberInputValue(parseInt(event.target.value));
    };

    const touchHandler = () => {
        dispatch({
            type: "TOUCH"
        });
    };

    const increaseQuantityHandler = () => {
        setNumberInputValue(prevValue => prevValue + 1);
    };

    const decreaseQuantityHandler = () => {
        if (numberInputValue > 0) {
            setNumberInputValue(prevValue => prevValue - 1);
        }
    };

    useEffect(() => {
        if (props.element === "number") {
            dispatch({
                type: "QUANTITY",
                val: numberInputValue
            });
        }
    }, [numberInputValue]);

    let element;

    if (props.element === "input") {
        element = <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
            style={{width: props.width}}
        />;
    } else if (props.element === "textarea") {
        element = <textarea
            id={props.id}
            rows={props.rows || 3}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />;
    } else {
        element = <div className="quantity-input-container">
            <input
                id={props.id}
                type="number"
                onChange={changeHandler}
                onBlur={touchHandler}
                value={numberInputValue}
                min={props.min}
                max={props.max}
            />
            <button
                type="button"
                onClick={increaseQuantityHandler}
                className="quantity-input-button button-top">+</button>
            <button
                type="button"
                onClick={decreaseQuantityHandler}
                className="quantity-input-button">-</button>
        </div>;
    }

    return (
        <div className={`form-control ${props.className} ${
            !inputState.isValid && inputState.isTouched && "form-control--invalid"
        }`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;