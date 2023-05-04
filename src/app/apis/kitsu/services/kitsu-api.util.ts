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
  public static addDeepObjectToHttpParams(httpParams: HttpParams, value: { [fieldName: string]: any }, key: string): HttpParams {
    for(const field of Object.keys(value)) {
      httpParams = httpParams.append(`${key}[${field}]`, value[field]);
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
      params = this.addDeepObjectToHttpParams(params, parameters.page, 'page');
    }
    if (parameters.sort !== undefined && parameters.sort !== null) {
      params = this.addToHttpParams(params, parameters.sort, 'sort');
    }
    if (parameters.filter !== undefined && parameters.filter !== null) {
      params = this.addDeepObjectToHttpParams(params, parameters.filter, 'filter');
    }

    return params;
  }


}


export class SafeTimeout {
  private handle?: number;

  constructor(handler: () => void, timeout: number) {
    this.handle = makeSafeTimeout(
      handler,
      timeout,
      handle => this.handle = handle,
      () => this.handle = undefined
    );
  }

  get isFinished() {
    return !this.handle;
  }

  public clear() {
    if (!this.handle) return;

    window.clearTimeout(this.handle);
  }
}

const MAX_32_BIT = 0x7fffffff;

/**
 * setTimeout is LIMITED to 2,160,000,000ms (25 days), as it can only accept 32bit numbers.
 * If the timeout is set to more than that, it will execute immediately.
 * This Function fixes that issue, by calling itself in 25 day intervals.
 *
 * @param onTimeout
 * @param delay
 * @param updateHandle
 * @param finished
 */
function makeSafeTimeout(onTimeout: () => void, delay: number, updateHandle: (handle: number) => void, finished: () => void): number {
  return window.setTimeout(() => {
    if (delay > MAX_32_BIT) {
      updateHandle(makeSafeTimeout(onTimeout, delay - MAX_32_BIT, updateHandle, finished));
    } else {
      onTimeout();
      finished();
    }
  }, Math.min(MAX_32_BIT, delay));
}
