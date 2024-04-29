import {Injectable} from '@angular/core';

@Injectable()
export abstract class MMErrorMessageResolver {

  public abstract resolveErrorMessage(key: string, value?: any, formControlName?: string | null | number): string;

}

@Injectable()
export class MMDefaultErrorMessageResolver implements MMErrorMessageResolver {

  resolveErrorMessage(key: string, value?: any, formControlName?: string): string {
    return 'Invalid field';
  }

}
