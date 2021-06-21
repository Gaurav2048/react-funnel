import React from 'react';
import { Select, makeStyles, Theme } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(0),
        width: theme.spacing(15)
    }
}))

const AppSelect: React.FC = (props) => {
    const classes = useStyle();
    return <Select MenuProps = {{
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        getContentAnchorEl: null,
    }} 
    IconComponent={ArrowDropDown}
    variant="outlined" 
    margin="dense" 
    displayEmpty
    className={classes.root}
    >
        {props.children}
    </Select>
}

export default AppSelect;