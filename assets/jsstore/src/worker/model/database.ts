
import { Table } from "./table";
import { IDataBase } from "../interfaces";

export class DataBase {
    name: string;
    tables: Table[] = [];

    constructor(dataBase: IDataBase) {
        this.name = dataBase.name;
        dataBase.tables.forEach((item) => {
            this.tables.push(new Table(item));
        });
    }
}
