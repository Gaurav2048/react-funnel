import produce from 'immer';
import { createContext, Dispatch } from 'react';
import { normalize, schema } from 'normalizr';
import { initialData, columns, categories, territories, priorities } from './initialData';

export type ActionType = {type: 'INIT', data: any} 
                        | {type: 'UPDATE_BOARD', data: Funnel.parsedColumn}
                        | {type: 'UPDATE_COLUMN', data: string[]};

export type ReducerStateType = {
    board: FunnelStore;
    categories: Funnel.keyValPair[] | null;
    territories: Funnel.keyValPair[] | null;
    priorities: Funnel.keyValPair[] | null;
}

export const FunnelContext = createContext<{
    dispatchFunnelReducer: Dispatch<ActionType>;
    funnelStore: ReducerStateType;
}>({
    dispatchFunnelReducer: ()=>({}),
    funnelStore: {
        board: {
            tasks: {},
            columns: {},
            columnOrder: [],
        },
        categories: null,
        territories: null ,
        priorities:  null,
    }
});

export function reducerFunction(
    state: ReducerStateType,
    action: ActionType
): ReducerStateType {
    return produce(state, draft => {
        switch(action.type) {
            case'INIT': 
            const funnelSchema = new schema.Entity('tasks', {}, {idAttribute: 'id'})
            const normalizedFunnelSchema = normalize(initialData.tasks, [funnelSchema]);
            draft.board.tasks = normalizedFunnelSchema.entities.tasks || {};            
            const columnSchema = new schema.Entity('columnVal', {}, {idAttribute: 'id'});
            const normalizedColumnSchema = normalize(columns, [columnSchema]);
            draft.board.columnOrder = normalizedColumnSchema.result;
            draft.board.columns = normalizedColumnSchema.entities.columnVal || {};
            
            if(draft.board.columns){
                for(const columnId of Object.keys(draft.board.columns)){
                    if(!draft.board.columns[columnId].taskIds){
                        draft.board.columns[columnId].taskIds = [];
                    }
                    for(const task of initialData.tasks){
                        if(task.column === columnId){
                             draft.board.columns[columnId].taskIds.push(task.id);
                        }
                    }
                }
            }      
            
            draft.categories = categories;
            draft.territories = territories;
            draft.priorities = priorities;
            return;

            case 'UPDATE_BOARD':
                draft.board.columns = action.data;
            return

            case 'UPDATE_COLUMN':
                draft.board.columnOrder = action.data;
                return;

            default:
            return;
        }
    })
}