import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
// import styles from './Fullcalendar.module.scss';

export default function FullCalendar(props) {
    return (
       <Calendar
           {...props}
           plugins={[ dayGridPlugin, resourceTimeGridPlugin, timeGridPlugin, interactionPlugin ]}
           /*eventBackgroundColor="#55ddee"
           eventTextColor="green"*/
           initialView="resourceTimeGridDay"
           // initialView="timeGridDay", 'dayGridWeek', 'listWeek'
           // initialView="dayGridMonth"
       />
    );
}