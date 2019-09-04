import { IError } from "./interfaces";
import { API, EVENT } from "./enums";

export type OrderQuery = {
    /**
     * sorting column name
     *
     * @type {string}
     */
    by: string;

    /**
     * sorting type - asc/desc
     *
     * @type {string}
     */
    type: string;

    /**
     * whether to do sorting by indexeddb or by jsstore
     * default - true
     * @type {boolean}
     */
    idbSorting?: boolean
};

export type JoinQuery = {
    type?: string //'inner',
    with: string // 'Customers',
    on: string // "Customers.customerId = Orders.customerId"
    where?: object;
    order?: OrderQuery;
    as?: { [originalColumnName: string]: [string] }
};

export type SelectQuery = {
    from: string;
    join?: JoinQuery | JoinQuery[];
    where?: any;
    skip?: number;
    limit?: number;
    order?: OrderQuery;
    groupBy?: string | string[];
    aggregate?: AggregateOption;
    ignoreCase?: boolean;
    distinct?: boolean;
};

export type AggregateOption = {
    max?: string | string[];
    min?: string | string[];
    sum?: string | string[];
    count?: string | string[];
    avg?: string | string[];
};

export type WebWorkerRequest = {
    name: API;
    query?: any;
    onSuccess?: (results) => void;
    onError?: (err: IError) => void;
};

export type DbInfo = {
    dbName: string;
    table: {
        name: string,
        version: number
    };
};

export type CountQuery = {
    from: any;
    ignoreCase?: boolean;
    where?: any;
};

export type RemoveQuery = {
    from: string;
    ignoreCase?: boolean;
    where?: any;
};

export type UpdateQuery = {
    in: string;
    ignoreCase?: boolean;
    set: any;
    where?: any;
};

export type InsertQuery = {
    into: string;
    values: any[];
    return?: boolean;
    skipDataCheck?: boolean;
    upsert?: boolean;
};

export type WebWorkerResult = {
    errorOccured: boolean;
    errorDetails: any;
    returnedValue: any;
    throwError: boolean;
};

export type TranscationQuery = {
    tables: string[];
    logic: (data: any) => Promise<void>;
    data: any;
};

export type SqlWebResult = {
    api: string;
    data: any;
};

export type EventQueue = {
    event: EVENT;
    callback: Function
};