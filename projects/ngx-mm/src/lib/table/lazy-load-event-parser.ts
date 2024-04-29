import {LazyLoadEvent} from 'primeng/api';

export class LazyLoadEventParser {

  // TODO - static or injectable service??? Injectable service can be customizable!!!
  // https://github.com/tkaczmarzyk/specification-arg-resolver

  public static toHttpParams(event: LazyLoadEvent): { [key: string]: any } {
    const params: { [key: string]: any } = {};
    if (event.rows != null) {
      params['size'] = event.rows;
    }

    if (event.rows != null && (event.first || event.first === 0)) {
      params['page'] = (event.first / event.rows);
    }

    if (event.sortField != null) {
      let sort = null;
      if (event?.sortOrder!=null && event?.sortOrder > 0) {
        sort = 'asc';
      }
      if (event?.sortOrder!=null && event?.sortOrder < 0) {
        sort = 'desc';
      }
      params['sort'] = event.sortField + (sort!=null ? `,${sort}` : '');
    }


    const filters = event.filters || {};
    const filterParams = Object.keys(filters)
      // .filter(key => filters[key].value!=null && filters[key].value?.length>0)
      .filter(key => filters[key].value!=null && filters[key].value!='')
      .map(key => ({key: key, value: filters[key].value}))
      .map((item: any) => {
        if (item.value instanceof Array) {
          console.log(item.value);
          return {...item, value: item.value.join(',')};
        }
        if (item.value instanceof Date) {
          // return {...item, value: item.value.toJSON()}; // return -1 day :?
          // const days = item.value.setDate(item.value.getDate() + 1);
          // const dateFilter = new Date(days).toISOString();
          // console.warn('Date filter', {f: item.value.toISOString(), dateFilter});
          // const days = new Date().setDate(item.value.getDate() + 1);
          const newDate = new Date();
          newDate.setDate(item.value.getDate());
          console.warn('Date filter', newDate.toISOString(), item.value.toISOString());
          return {...item, value: newDate.toISOString()};
        }
        return item;
      })
      // .filter(item => item.value?.length>0)
      .map(value => ({[value.key]: value.value}))
      .reduce((previousValue, currentValue) => ({...previousValue, ...currentValue}), {})

    console.log('Filter params', filterParams, event);

    return {...params, ...filterParams};
  }

}
