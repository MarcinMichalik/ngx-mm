import {HttpParams} from '@angular/common/http';
import {Params} from '@angular/router';
import {LazyLoadEvent} from 'primeng/api';

export abstract class MMLazyLoadEventTableParser {

  public abstract toHttpParams(event: LazyLoadEvent): { [key: string]: any; };

  public abstract toRouteParams(event: LazyLoadEvent): { [key: string]: any; };

}

export declare type Pageable = {
  page: number;
  size: number;
}

export declare type Sortable = {
  sortField: string;
  sortOrder: any;
}

export class MMLazyLoadEventTableParserConfig {
  pageFieldName = 'page';
  sizeFieldName = 'size';
  sortFieldName = 'sort';
  sortASCName = 'asc';
  sortDESCName = 'desc';
  globalFilterFieldName = 'filter'
}

export class MMSimpleLazyLoadEventTableParser implements MMLazyLoadEventTableParser {

  config = new MMLazyLoadEventTableParserConfig();

  toHttpParams(event: LazyLoadEvent): { [p: string]: any } {
    const first = event.first || 0;
    const last = event.last;
    const filters = event.filters;
    const rows = event.rows || 1;
    const globalFilter = event.globalFilter;
    const multiSortMeta = event.multiSortMeta;
    const sortField = event.sortField;
    const sortOrder = event.sortOrder;

    // PageableExtractor
    // Pageable - page name field, size name field
    const pageable = {
      [this.config.pageFieldName]: ((event.first || 0) / (event.rows || 1)),
      [this.config.sizeFieldName]: event.rows || 0
    };

    // SortableExtractor
    // Sort - sort name field
    // Multi -> sort=field,order&sort=field,order
    const sortable = {
      [this.config.sortFieldName]: ``
    };

    // FiltersExtractor
    // ArrayParser
    // DateParser
    // Filters
    const filtersParams = {}

    // GlobalFilterExtractor
    // Global filter

    new HttpParams()
      .append('a' , 'a')
      .append('a', 'a')

    return {
      ...pageable,
      ...sortable,
      ...filtersParams
    };
  }

  toRouteParams(event: LazyLoadEvent): { [p: string]: any } {
    return {};
  }

}
