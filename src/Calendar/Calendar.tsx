import './CssOverride.scss';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import FullCalendar, { DayHeaderContentArg } from '@fullcalendar/react';
import timegrid from '@fullcalendar/timegrid';
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
                  plugins={[timegrid]} 
                  initialView='timeGridWeek'
                  headerToolbar={false}
                  nowIndicator={false}
                  allDaySlot={false}
                  contentHeight={2200}
                  duration={7}
                  dayHeaderContent={headerContent}
                  slotDuration="01:00:00"
                  eventBorderColor="#d6e8f9"
                  
                  aspectRatio={3}
                  slotLabelClassNames={classes.slot}
                  stickyHeaderDates={true}
                  dayCellClassNames={classes.cell}
                  expandRows={true}
                  dayHeaderClassNames={classes.header}
                  events={[{
                      
                  }]}
                />
    </div>
}

export default Calendar;

function headerContent(props: DayHeaderContentArg) {
    const { date } = props;
    return <HeaderComponent {...props} />
}