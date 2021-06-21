import React, { useContext } from 'react';
import { DroppableProvided, DroppableStateSnapshot, Droppable } from 'react-beautiful-dnd';
import { FunnelContext } from '../reducer';
import { makeStyles, Theme } from '@material-ui/core';
import Task from './Task';

type OwnProps = {
    columnId: string;
    index: number;
}

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        minWidth: theme.spacing(38),
        maxWidth: theme.spacing(38),
        width: theme.spacing(38),
        alignItems: 'center',
        overflowY: 'scroll',
        flexGrow: 1,
    }
}))

const Column: React.FC<OwnProps> = ({ columnId, index}) => {

    const classes = useStyle();
    const {dispatchFunnelReducer, funnelStore} = useContext(FunnelContext);
    const { board } = funnelStore;
    const column = board.columns[columnId];

      const holderStyle = (isDragging: boolean) => ({
        background: isDragging ? 'lightblue' : 'white',
      })

return  <Droppable droppableId={column.id} key={column.id}>
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <div style={{height: '90%', overflowY: 'scroll', display: 'flex', flexDirection: 'column'}} >
                <div className={classes.root} 
                    style={holderStyle(snapshot.isDraggingOver)} 
                    ref={provided.innerRef} {...provided.droppableProps}>
                    {board.columns[columnId].taskIds.map((taskId, index) => {
                        const task = board.tasks[taskId];
                        return <Task task={task} index={index} key={taskId} />
                    })}
                    {provided.placeholder}
                </div>
            </div>
            )}
        </Droppable>

}

export default Column;
