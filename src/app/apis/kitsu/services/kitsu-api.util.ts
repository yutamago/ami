import {HttpParams} from "@angular/common/http";

import {CommonParameters} from "./common.parameters";

export class KitsuApiUtil {
  public static addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === "object" && !(value instanceof Date)) {
      httpParams = KitsuApiUtil.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = KitsuApiUtil.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private static addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
    if (value === null || value === undefined) return httpParams;

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
      } else if (value instanceof Date) {
        if (key === null || key === undefined) throw Error("key may not be null if value is Date");

        httpParams = httpParams.append(key, value.toISOString().substring(0, 10));
      } else {
        Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(
          httpParams, value[k], key != null ? `${key}.${k}` : k));
      }
    } else if (key !== null && key !== undefined) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error("key may not be null if value is not object or array");
    }

    return httpParams;
  }

  static ToHttpParams(parameters: CommonParameters | undefined): HttpParams {
    let params = new HttpParams();
    if (!parameters) return params;

    if (parameters.fields !== undefined && parameters.fields !== null) {
      params = this.addToHttpParams(params, parameters.fields, 'fields');
    }
    if (parameters.include !== undefined && parameters.include !== null) {
      params = this.addToHttpParams(params, parameters.include, 'include');
    }
    if (parameters.page !== undefined && parameters.page !== null) {
      params = this.addToHttpParams(params, parameters.page, 'page');
    }
    if (parameters.sort !== undefined && parameters.sort !== null) {
      params = this.addToHttpParams(params, parameters.sort, 'sort');
    }
    if (parameters.filter !== undefined && parameters.filter !== null) {
      params = this.addToHttpParams(params, parameters.filter, 'filter');
    }

    return params;
  }
}
