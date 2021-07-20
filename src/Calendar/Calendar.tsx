import './CssOverride.scss';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import FullCalendar, { DayHeaderContentArg, EventContentArg } from '@fullcalendar/react';
import timegrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Event from './Event';
import HeaderComponent from './HeaderComponent';

const useStyles = makeStyles((theme: Theme)=>({
    root: {
        height: '90vh',
        overflow: 'scroll',
        marginTop: theme.spacing(1),
    },
    cell: {
        backgroundColor: '#f1f6fb !important',
        border: '2px solid #d6e8f9 !important',
    },
    event: {
        backgroundColor: theme.palette.common.white,
        border: 'none',
        padding: 0,

    },
    header: {
        border: 'none !important',
        borderBottom: '1px solid #d6e8f9 !important',
        backgroundColor: '#f1f6fb !important',
    },
    slot: {
        backgroundColor: '#f1f6fb !important',
        border: '2px solid #d6e8f9 !important',
    },
}))

const Calendar: React.FC = () => {
    const classes = useStyles();
    return <div className={classes.root}>
        <FullCalendar 
                  plugins={[timegrid, interactionPlugin]} 
                  initialView='timeGridWeek'
                  headerToolbar={false}
                  nowIndicator={false}
                  allDaySlot={false}
                  contentHeight={2200}
                  duration={7}
                  dayHeaderContent={headerContent}
                  slotDuration="01:00:00"
                  eventClassNames={classes.event}
                  eventBorderColor="#d6e8f9"
                  aspectRatio={3}
                  slotLabelClassNames={classes.slot}
                  stickyHeaderDates={true}
                  dragScroll={true}
                  eventContent={(props: EventContentArg) => <Event {...props} />}
                  editable
                  
                  validRange={{
                      start: '2021-07-11',
                      end: '2021-07-18'
                  }}
                  dayCellClassNames={classes.cell}
                  expandRows={true}
                  dayHeaderClassNames={classes.header}
                  events={events}
                  eventDataTransform={(e)=>{
                      const event = {...e};
                      event.start = e.startTime;
                      event.end = e.endTime;
                      event.editable = true;
                      return event;
                  }}
                />
    </div>
}

export default Calendar;

function headerContent(props: DayHeaderContentArg) {
    const { date } = props;
    return <HeaderComponent {...props} />
}


const events = [
    {
       "id":"7ioo0930t3eht7c7gje3rco0im",
       "startTime":"2021-07-12T12:30:00+05:30",
       "endTime":"2021-07-12T13:30:00+05:30",
       "type": "Scaling",
       "summary":"Vikram",
       "index": 'red',
    },
    {
       "id":"7enuintleeoe25moeb2oj1rouc_20210712T093000Z",
       "type": "Root Canal",
       "startTime":"2021-07-12T15:00:00+05:30",
       "endTime":"2021-07-12T16:30:00+05:30",
       "summary":"Gunjan",
       "index": 'green',
    },
    {
       "id":"1ls6s0508jgf3n7q1n92si0tar_20210713T080000Z",
       "type": "Consulation",
       "startTime":"2021-07-13T13:30:00+05:30",
       "endTime":"2021-07-13T14:45:00+05:30",
       "summary":"Suhash",
       "index": 'violet',
       
    },
    {
       "id":"7enuintleeoe25moeb2oj1rouc_20210714T093000Z",
       "type": "Wisdom teeth removal",
       "startTime":"2021-07-14T16:00:00+05:30",
       "endTime":"2021-07-14T17:30:00+05:30",
       "summary":"Willy",
       "index": 'green',
    },
    {
       "id":"7enuintleeoe25moeb2oj1rouc_20210716T093000Z",
       "type": "Bleaching",
       "startTime":"2021-07-16T16:00:00+05:30",
       "endTime":"2021-07-16T18:30:00+05:30",
       "summary": "Herman",
       "index": 'blue',
    }
 ];