declare interface FunnelStore {
   tasks: {[key: string]: Funnel.Task};
   columns: Funnel.parsedColumn;
   columnOrder: string[];
}

type NormalizedData<T> = {
    map: Record<string, T>,
    result: string[],
}

declare namespace Funnel {
    export interface Task {
        id: string;
        name: string;
        category: string;
        column: string;
        territory: string;
        priority: string;
        photos: string[];
        amount: number;
        time: number;
    }

    export type parsedColumn = {[key: string]: {
        id: string;
        value: string;
        taskIds: string[];
    }}

    export type keyValPair = {id: string; value: string};

    export type categories = [{id: string; value: string }]
    export type columns = [{id: string; value: string }]
    export type territories = [{id: string; value: string }]
    export type priorities = [{id: string; value: string }]

}

