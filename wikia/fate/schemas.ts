import { FateENDataSource } from "./data-source";

/**
 * Schema for Fate/Type-Moon wiki
 * The List of Servants page currently renders as a sortable wiki table.
 */
const FateEN: ISchema = {
    url: 'https://typemoon.fandom.com/wiki/List_of_Servants',
    pageFormat: 'table-5',
    dataSource: FateENDataSource
};

export { FateEN };