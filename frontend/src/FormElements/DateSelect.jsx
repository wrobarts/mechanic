import React, {useEffect, useState, useReducer} from 'react';
import {FaArrowRight, FaArrowLeft} from 'react-icons/fa';
import './DateSelect.css';

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const months = [
    {month: "January", days: 31},
    {month: "February", days: 28},
    {month: "March", days: 31},
    {month: "April", days: 30},
    {month: "May", days: 31},
    {month: "June", days: 30},
    {month: "July", days: 31},
    {month: "August", days: 31},
    {month: "September", days: 30},
    {month: "October", days: 31},
    {month: "November", days: 30},
    {month: "December", days: 31}
    ];

const getFirstDayOfWeek = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const dayOfWeek = date.getDay();
    return dayOfWeek;
};

const getcalendarState = (date) => {
    const currentDate = new Date();
    const calendarBody = {
        month: months[date.getMonth()].month,
        year: date.getFullYear(),
        days: []
    };
    let previousMonth = date.getMonth() - 1;
    if (previousMonth < 0) {
        previousMonth = 11;
    }
    let nextMonth = date.getMonth() + 1;
    if (nextMonth > 11) {
        nextMonth = 0;
    }
    var monthDay = 1;
    var nextMonthDayCounter = 1;

    while (monthDay <= months[date.getMonth()].days) {
        var monthDaysRow = {days: []};
        while (monthDaysRow.days.length < 7) {
            var firstDayOfWeek = getFirstDayOfWeek(date.getFullYear(), date.getMonth() + 1);
            if (firstDayOfWeek > 1 && monthDay === 1) {
                var dayCounter = months[date.getMonth() - 1].days - firstDayOfWeek + 2;
                for (var prevMonth = 1; prevMonth <= firstDayOfWeek - 1; prevMonth++) {
                    monthDaysRow.days.push({day: dayCounter, month: previousMonth, enabled: false, active: false});
                    dayCounter++;
                }
            }
            if (monthDay > months[date.getMonth()].days) {
                monthDaysRow.days.push({day: nextMonthDayCounter, month: nextMonth, enabled: false, active: false});
                nextMonthDayCounter++;
            } else {
                if (monthDay >= date.getDate()) {
                    monthDaysRow.days.push({day: monthDay, month: date.getMonth(), enabled: true, active: false});
                } else {
                    if (date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
                        monthDaysRow.days.push({day: monthDay, month: date.getMonth(), enabled: false, active: false});
                    } else {
                        monthDaysRow.days.push({day: monthDay, month: date.getMonth(), enabled: true, active: false});
                    }
                }
            }
            monthDay++;
        }
        calendarBody.days.push(monthDaysRow);
    }
    return calendarBody;
};

const calendarReducer = (state, action) => {
    switch (action.type) {
        case "cycle":
            if (
                state.body.find(
                    b => b.month === months[action.payload.newDate.getMonth()].month &&
                    b.year === action.payload.newDate.getFullYear()
                )
            ) {
                return {...state,
                    selectedDate: action.payload.newDate
                };
            } else {
                const newCalendarState = getcalendarState(action.payload.newDate);
                return {...state,
                    selectedDate: action.payload.newDate,
                    body: [...state.body, newCalendarState]
                };
            }
        case "select":
            let selections;
            if (state.selections.first && action.payload.numSelections !== 1) {
                selections = {
                    first: state.selections.first,
                    second: action.payload.dateSelected
                };
            } else {
                selections = {
                    first: action.payload.dateSelected,
                    second: null
                };
            }
            return {...state,
                selections: selections,
                body: state.body.map((bodyItem) => {
                if (bodyItem.month === action.payload.month && bodyItem.year === action.payload.year) {
                    return {...bodyItem,
                        days: bodyItem.days.map((row, rowIndex) => {
                            if (rowIndex < action.payload.rowIndex) {
                                return {...row,
                                    days: row.days.map((day) => {
                                        return {
                                            ...day, enabled: false
                                        };
                                    })
                                };
                            }
                            if (rowIndex > action.payload.rowIndex && !selections.second && action.payload.numSelections !== 1) {
                                return row;
                            }
                            if (action.payload.numSelections === 1) {
                                if (rowIndex > action.payload.rowIndex) {
                                    return {...row,
                                        days: row.days.map((day) => {
                                            return {
                                                ...day, enabled: false
                                            }
                                        })
                                    };
                                }
                            } else {
                                if (rowIndex > action.payload.rowIndex && selections.second) {
                                    return {...row,
                                        days: row.days.map((day) => {
                                            return {
                                                ...day, enabled: false
                                            }
                                        })
                                    };
                                }
                            }
                            return {...row,
                                days: row.days.map((day, dayIndex) => {
                                    if (action.payload.numSelections === 1 && dayIndex > action.payload.dayIndex) {
                                        return {
                                            ...day, enabled: false
                                        };
                                    } else {
                                        if (dayIndex > action.payload.dayIndex && !selections.second) {
                                            return day;
                                        }
                                        if (dayIndex > action.payload.dayIndex && selections.second) {
                                            return {
                                                ...day, enabled: false
                                            };
                                        }
                                    }
                                    if (dayIndex < action.payload.dayIndex) {
                                        return {
                                            ...day, enabled: false
                                        };
                                    }
                                    return {
                                        ...day, enabled: false, active: true
                                    };
                                })
                            };
                        })
                    };
                } else {
                    return bodyItem;
                }})
            };
        case "reset":
            return {
                selections: {first: null, second: null},
                selectedDate: new Date(),
                body: [getcalendarState(new Date())]
            };
        default:
            return state;
    }
};

const DateSelect = ({reset, selectDate, clearCalendar, numSelections, initialDate}) => {
    let initialCalendarState;
    let initialFirst;
    let initialSecond;
    if (initialDate && initialDate.first) {
        initialCalendarState = new Date(initialDate.first);
        initialFirst = initialDate.first;
    } else {
        initialCalendarState = new Date();
    }

    if (initialDate && initialDate.second) {
        initialSecond = initialDate.second;
    }

    const [calendarState, dispatch] = useReducer(calendarReducer, {
        selections: {first: initialFirst, second: initialSecond},
        selectedDate: initialCalendarState,
        body: [getcalendarState(initialCalendarState)]
    });

    const [calendarBody, setCalendarBody] = useState();

    useEffect(() => {
        setCalendarBody(
            calendarState.body.find(
                c => c.month === months[calendarState.selectedDate.getMonth()].month &&
                c.year === calendarState.selectedDate.getFullYear()
            )
        );
    }, [calendarState]);

    const decrementMonthHandler = () => {
        if (!calendarState.selections.second && numSelections !== 1) {
            const currentDate = new Date();
            if ((
                calendarState.selectedDate.getMonth() > currentDate.getMonth() &&
                calendarState.selectedDate.getFullYear() >= currentDate.getFullYear()
            ) || calendarState.selectedDate.getFullYear() > currentDate.getFullYear()) {
                const newDate = new Date(calendarState.selectedDate.setMonth(calendarState.selectedDate.getMonth() - 1));
                dispatch({type: "cycle", payload: {newDate: newDate}});
            }
        }
    };

    const incrementMonthHandler = () => {
        if (!calendarState.selections.second && numSelections !== 1) {
            const newDate = new Date(calendarState.selectedDate.setMonth(calendarState.selectedDate.getMonth() + 1));
            dispatch({type: "cycle", payload: {newDate: newDate}});
        }
    };

    const dateSelectHandler = (day, rowIndex) => {
        const updatedCalendarBody = {...calendarBody};
        const dayIndex = updatedCalendarBody.days[rowIndex].days.findIndex(c => c.day === day);
        const dateSelected = months[calendarState.selectedDate.getMonth()].month +
            " " + day.toString() + ", " + calendarState.selectedDate.getFullYear().toString();
        dispatch({
            type: "select",
            payload: {
                dayIndex: dayIndex,
                rowIndex: rowIndex,
                month: months[calendarState.selectedDate.getMonth()].month,
                year: calendarState.selectedDate.getFullYear(),
                dateSelected: dateSelected,
                numSelections: numSelections
            }
        });
    };

    useEffect(() => {
        selectDate(calendarState.selections);
    }, [calendarState.selections]);

    const [initialRender, setInitialRender] = useState(false);

    useEffect(() => {
        if (calendarBody && initialDate && initialDate.first && !initialRender) {
            const day = new Date(initialDate.first).getDate();
            const rowIndex = calendarBody.days.findIndex(
                d => d.days.find(d => d.day === day && d.month === new Date(initialDate.first).getMonth())
            );
            dateSelectHandler(day, rowIndex);
            setInitialRender(true);
        }
    }, [calendarBody, initialDate, dateSelectHandler]);

    const resetCalendar = () => {
        dispatch({type: "reset"});
        clearCalendar();
    };

    return (
        <section className="calendar-container">
            <header className="calendar-header">
                <FaArrowLeft
                    className={`calendar-icon ${calendarState.selections.second && "calendar-icon-disabled"}`}
                    onClick={decrementMonthHandler}
                />
                <div>
                    {calendarBody && <h4 className="calendar-month">{calendarBody.month}</h4>}
                    {calendarBody && <h5 className="calendar-year">~ {calendarBody.year} ~</h5>}
                </div>
                <FaArrowRight
                    className={`calendar-icon ${calendarState.selections.second && "calendar-icon-disabled"}`}
                    onClick={incrementMonthHandler}
                />
            </header>
            <ul className="weekday-items">
                {weekdays.map((weekday, index) =>
                    <li key={index}>{weekday}</li>
                )}
            </ul>
            {calendarBody &&
                calendarBody.days.map((row, rowIndex) =>
                    <ul key={rowIndex} className="day-row">
                        {row.days.map((day, index) =>
                            <li
                                key={index}
                                onClick={() => dateSelectHandler(day.day, rowIndex)}
                                className={`${!day.enabled && "disabled disabled-hover"} ${day.active && "active"}`}
                            >
                                {day.day}
                            </li>
                        )}
                    </ul>
                )
            }
            {reset &&
                <button type="button" onClick={resetCalendar} className="reset-button">
                    Reset
                </button>
            }
            {calendarState.selections.first && !calendarState.selections.second &&
                <p className="date-selected-text">{calendarState.selections.first}</p>
            }
            {calendarState.selections.second &&
                <p className="date-selected-text">
                    {calendarState.selections.first} <span>to</span> {calendarState.selections.second}
                </p>
            }
        </section>
    );
};

export default DateSelect;