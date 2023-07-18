import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../FormElements/Input';
import Button from '../FormElements/Button';
import DateSelect from '../FormElements/DateSelect';
import {useForm} from '../hooks/form_hook';
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from '../util/validators';
import './ContactForm.css';

const ContactForm = props => {
    const history = useHistory();
    const [calendarOpen, setCalendarOpen] = useState(false);

    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: "",
                isValid: false
            },
            email: {
                value: "",
                isValid: false
            },
            phone: {
                value: "",
                isValid: false
            },
            year: {
                value: "",
                isValid: false
            },
            make: {
                value: "",
                isValid: false
            },
            model: {
                value: "",
                isValid: false
            },
            date: {
                value: null,
                isValid: false
            },
            message: {
                value: "",
                isValid: false
            }
        },
        false
    );

    const toggleCalendarHandler = () => {
        setCalendarOpen(!calendarOpen);
    };

    const selectDate = date => {
        setFormData(
            {
                ...formState.inputs,
                date: {
                    value: date,
                    isValid: true
                }
            },
            formState.inputs.name.isValid &&
            formState.inputs.email.isValid &&
            formState.inputs.phone.isValid &&
            formState.inputs.year.isValid &&
            formState.inputs.make.isValid &&
            formState.inputs.model.isValid &&
            formState.inputs.message.isValid
        );
    };

    const clearCalendar = () => {
        setFormData(
            {
                ...formState.inputs,
                date: {
                    value: null,
                    isValid: false
                }
            },
            false
        );
    };

    const formSubmitHandler = event => {
        event.preventDefault();

        history.push("/thanks");
    };

    return (
        <section className="contact-form-section">
            <h4 className="contact-heading">
                How can we help you?
            </h4>
            <form className="contact-form" onSubmit={formSubmitHandler}>
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    placeholder="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
                    className="contact-input"
                    onInput={inputHandler}
                />
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter an email."
                    className="contact-input"
                    onInput={inputHandler}
                />
                <Input
                    id="phone"
                    element="input"
                    type="text"
                    label="Phone"
                    placeholder="Phone"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a phone number."
                    className="contact-input"
                    onInput={inputHandler}
                />
                <Input
                    id="year"
                    element="input"
                    type="text"
                    label="Year"
                    placeholder="Year"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter your vehicle's year."
                    className="contact-input"
                    onInput={inputHandler}
                />
                <Input
                    id="make"
                    element="input"
                    type="text"
                    label="Make"
                    placeholder="Make"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter your vehicle's make."
                    className="contact-input"
                    onInput={inputHandler}
                />
                <Input
                    id="model"
                    element="input"
                    type="text"
                    label="Model"
                    placeholder="Model"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter your vehicle's model."
                    className="contact-input"
                    onInput={inputHandler}
                />
                <div className="contact-button-container">
                    <Button type="button" className="date-toggle-button" onClick={toggleCalendarHandler}>
                        Desired Appointment Date
                    </Button>
                </div>
                {calendarOpen &&
                    <DateSelect
                        reset={true}
                        selectDate={selectDate}
                        clearCalendar={clearCalendar}
                        numSelections={1}
                        initialDate={formState.inputs.date.value}
                    />
                }
                <Input
                    id="message"
                    element="textarea"
                    type="text"
                    label="Message"
                    placeholder="Message"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a message."
                    className="contact-input"
                    onInput={inputHandler}
                />
                <div className="contact-button-container">
                    <Button disabled={!formState.isValid} type="submit" className="contact-button">
                        Submit
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default ContactForm;