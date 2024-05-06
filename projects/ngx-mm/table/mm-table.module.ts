import {ModuleWithProviders, NgModule} from '@angular/core';

@NgModule({

})
export class MMTable {
  public static forRoot(): ModuleWithProviders<MMTable> {
    return {
      ngModule: MMTable,
      providers: []
    }
  }
}
