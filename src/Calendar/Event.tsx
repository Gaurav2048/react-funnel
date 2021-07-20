import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { EventContentArg } from '@fullcalendar/common';
import classNames from 'classnames';

const useStyle = makeStyles((theme: Theme) => ({
    indicator: {
        width: '100%',
        height: 4,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    red: {
        backgroundColor: '#E13962',
    },
    blue: {
        backgroundColor: '#4AA0F7',
    },
    yellow: {
        backgroundColor: '#F2913D',
    },
    violet: {
        backgroundColor: '#3F46F5',
    },
    green: {
        backgroundColor: '#5ECBA4',
    },
    root: {

    }
}))

const Event: React.FC<EventContentArg> = (props) => {
    const classes = useStyle();
    const extendedProps = props.event.extendedProps;
    const getIndicatorstyle = () => {
        if (extendedProps.index === 'red'){
            return classNames(classes.indicator, classes.red)
        }else if (extendedProps.index === 'blue'){
            return classNames(classes.indicator, classes.blue)
        }else if (extendedProps.index === 'green'){
            return classNames(classes.indicator, classes.green)
        }else if (extendedProps.index === 'violet'){
            return classNames(classes.indicator, classes.violet)
        }else if (extendedProps.index === 'yellow'){
            return classNames(classes.indicator, classes.yellow)
        }
    } 

    return <div className={classes.root}>
        <div className={getIndicatorstyle()}></div>
        <Typography variant="caption" color="textPrimary"><b>{props.event.extendedProps.summary}</b></Typography>
        <Typography variant="caption" color="textSecondary">{props.event.extendedProps.type}</Typography>
    </div>
}

export default Event;