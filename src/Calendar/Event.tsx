import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { EventContentArg } from '@fullcalendar/common';

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
    }
}))

const Event: React.FC<EventContentArg> = (props) => {
    const classes = useStyle();

    return <div className={classes.root}>Event</div>
}

export default Event;