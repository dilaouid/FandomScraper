import { FateENDataSource } from "./data-source";

/**
 * Schema for Fate/Type-Moon wiki
 * Note: The List of Servants page uses a table format, which would require 
 * a custom implementation or using FandomPersonalScraper with appropriate selectors
 */
const FateEN: ISchema = {
    url: 'https://typemoon.fandom.com/wiki/List_of_Servants',
    pageFormat: 'table-6',
    dataSource: FateENDataSource
};

export { FateEN };