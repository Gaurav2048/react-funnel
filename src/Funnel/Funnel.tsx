import React, {useReducer, useEffect} from 'react';
import { FunnelContext, reducerFunction, ReducerStateType } from '../reducer';
import { DragDropContext, 
         Droppable,  
         DropResult, 
         ResponderProvided, 
         DraggableLocation, 
         DroppableProvided, 
        } from 'react-beautiful-dnd';
import Header from './Header';
import { makeStyles, Theme, MenuItem } from '@material-ui/core';
import  AppSelect from '../Components/Select';
import FunnelHeader from './FunnelHeader';

const useStyle = makeStyles((theme: Theme)=> ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        margin: theme.spacing(2, 2),
        height: '85vh',
        overflowX: 'scroll',
    },
    filters: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
}))

const Funnel: React.FC = () => {
    const initialState: ReducerStateType = {
        board: {
            tasks: {},
            columns: {},
            columnOrder: [],
        },
        categories: null,
        territories: null,
        priorities: null,
    } 
    const classes = useStyle();
    const [funnelStoreContext, dispatchFunnelReducer] = useReducer(reducerFunction, initialState)
    const { board } = funnelStoreContext;

    const move = (source: string[], destination: string[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
    
        destClone.splice(droppableDestination.index, 0, removed);
    
        const result: {[key: string]: string[]} = {} ;
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
    
        return result;
    };
    
    const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
    
      return result;
    };
    
    
    const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
      const { source, destination, type } = result;

      if (!destination) {
        return;
    }
    
    if(type === 'column') {
        const columnOrder = funnelStoreContext.board.columnOrder;
        const result = reorder(columnOrder, source.index, destination.index);

        dispatchFunnelReducer({
            type: 'UPDATE_COLUMN',
            data: result,
        })        
        return;
    }
        
    if (source.droppableId === destination.droppableId) {
        const items = reorder(
            board.columns[source.droppableId].taskIds,
            source.index,
            destination.index
        );
    
        const newBoardColumns = {
          ... board.columns,
          [source.droppableId]: {
              ... board.columns[source.droppableId],
              taskIds: items, 
          }
        }
    
        dispatchFunnelReducer({
            type: 'UPDATE_BOARD',
            data: newBoardColumns,
        });
        
    } else {
        const result = move(
            board.columns[source.droppableId].taskIds,
            board.columns[destination.droppableId].taskIds,
            source,
            destination
        );
    
        const newBoardColumns = {
            ...board.columns,
            [source.droppableId]: {
                ... board.columns[source.droppableId],
                taskIds: result[source.droppableId]
            },
            [destination.droppableId]: {
                ...board.columns[destination.droppableId],
                taskIds: result[destination.droppableId]
            }
          }
      
        dispatchFunnelReducer({
              type: 'UPDATE_BOARD',
              data: newBoardColumns,
          });
    }
    
    }

    useEffect(()=>{
        dispatchFunnelReducer({
            type: 'INIT',
            data: {}
        })
    }, [])

    return <div>
            <div className={classes.filters}>
               <FunnelHeader />
            </div>
            <FunnelContext.Provider value={{dispatchFunnelReducer, funnelStore: funnelStoreContext}} >
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="all-columns" direction="horizontal" type="column">
                        {(provided: DroppableProvided) => (
                            <div className={classes.root} {...provided.droppableProps} ref={provided.innerRef}>
                            {board.columnOrder.map((columnId, index) => {
                                return <Header columnId={columnId} index={index} key={columnId} />
                            })}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </FunnelContext.Provider>
        </div>
}

export default Funnel;
