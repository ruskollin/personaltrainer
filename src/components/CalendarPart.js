import React,  { useState, useEffect, useRef} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarPart() {
    const [agenda, setAgenda] = useState([]);
    const localizer = momentLocalizer(moment)

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(trainings => {
                return setAgenda(
                    trainings.map((training, index) => ({
                        id: index,
                        title: training.activity + " with " + training.customer.lastname + ", " + training.customer.firstname,
                        start: moment(training.date)._d,
                        end: moment(training.date).add(training.duration, 'minutes')._d                        
                }))
                )
            })
            .catch(err => console.log(err));
    }

    return (
        <div class="page2">
        <Calendar
        events={agenda}
        startAccessor="start"
        endAccessor="end"
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        style={{height: "90vh"}}/>
        </div>
    )
}

export default CalendarPart;
