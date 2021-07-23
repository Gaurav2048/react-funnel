import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { DayHeaderContentArg } from '@fullcalendar/common';
import { format, isToday } from 'date-fns';

const useStyle = (today: boolean) => makeStyles((theme: Theme)=> ({
    root: {
        padding: theme.spacing(0.5),
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: today ? theme.palette.primary.main : '#f1f6fb',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: today ? theme.spacing(0.5) : -theme.spacing(0.25),
        color: today ? theme.palette.common.white : theme.palette.text.secondary,
    }
}))

const HeaderComponent: React.FC<DayHeaderContentArg> = ({date}) => {
    const classes = useStyle(isToday(date))();
    return <div className={classes.root}>
        <div className={classes.header}>
            <div className={classes.date}>
                <Typography variant="body1" >{format(date, 'dd')}</Typography>
            </div>
            <Typography variant="body2" color={isToday(date) ? "primary" : "textSecondary"}>{format(date, 'EEE')}</Typography>
        </div>

    </div>
}

export default HeaderComponent;