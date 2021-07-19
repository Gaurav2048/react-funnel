import React, { useContext } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { FunnelContext } from '../reducer';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import Column from './Column';

const useStyle = makeStyles((theme: Theme)=> ({
    column: {
        minHeight: theme.spacing(70),
        marginRight: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: theme.spacing(38),
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f1f6fb',
        boxShadow: `1.5px 0 0 0 #f7f7f7`,
    },
    headerHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: theme.spacing(36),
        boxShadow: ` 0 1.5px 0 0 ${theme.palette.grey[300]}`,
        margin: theme.spacing(1, 1),
        borderRadius: 2,
        padding: theme.spacing(1, 0),
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    },
    title: {
      textTransform: 'uppercase',
    }
}))

type OwnProps = {
    columnId: string;
    index: number;
}

const Header: React.FC<OwnProps> = ({ columnId, index }) => {
    const classes = useStyle();
    const { dispatchFunnelReducer, funnelStore } = useContext(FunnelContext);
    const { board } = funnelStore;
    const column = board.columns[columnId];

    return <Draggable draggableId={columnId} index={index}>
    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
    <div ref={provided.innerRef} 
         className={classes.column} 
         {...provided.draggableProps}
    >
            <div className={classes.headerHolder}>
                <div className={classes.header}>
                    <Typography variant="subtitle2" color="textPrimary" className={classes.title} >{` ${column.value}`}</Typography>
                        <div>
                            <Typography variant="caption" color="textPrimary"><b> $ 4.5k</b></Typography>
                            <Typography variant="caption" color="textSecondary">  (6 deals)</Typography>
                        </div>
                </div>
                <div {...provided.dragHandleProps}>
                    <DragIndicatorIcon fontSize="small" color ={!snapshot.isDragging ? "disabled" : "inherit"} />
                </div>
            </div>
            <Column columnId={columnId} index={index} />
        </div>)}
        </Draggable>
}

export default Header;