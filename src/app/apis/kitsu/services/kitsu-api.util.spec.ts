import {KitsuApiUtil} from "./kitsu-api.util";
import {HttpParams} from "@angular/common/http";
import {CommonParameters} from "./common.parameters";

describe('KitsuApiUtil', () => {

  describe('ToHttpParams', () => {
    it('should return empty HttpParams if parameters is undefined', () => {
      const result = KitsuApiUtil.ToHttpParams(undefined);
      expect(result).toEqual(new HttpParams());
    });

    it('should add fields to HttpParams if fields parameter is defined', () => {
      const parameters = { fields: { foo: 'bar' } };
      const result = KitsuApiUtil.ToHttpParams(parameters);
      expect(result.get('fields[foo]')).toEqual('bar');
    });

    it('should add include to HttpParams if include parameter is defined', () => {
      const parameters = { include: 'foo' };
      const result = KitsuApiUtil.ToHttpParams(parameters);
      expect(result.get('include')).toEqual('foo');
    });

    it('should add page to HttpParams if page parameter is defined', () => {
      const parameters: CommonParameters = { page: { limit: 20, offset: 15 } };
      const result = KitsuApiUtil.ToHttpParams(parameters);
      expect(result.get('page[limit]')).toEqual('20');
      expect(result.get('page[offset]')).toEqual('15');
    });

    it('should add sort to HttpParams if sort parameter is defined', () => {
      const parameters = { sort: '-foo,bar' };
      const result = KitsuApiUtil.ToHttpParams(parameters);
      expect(result.get('sort')).toEqual('-foo,bar');
    });

    it('should add filter to HttpParams if filter parameter is defined', () => {
      const parameters = { filter: { foo: 'bar' } };
      const result = KitsuApiUtil.ToHttpParams(parameters);
      expect(result.get('filter[foo]')).toEqual('bar');
    });

    it('should throw an error if parameter is not recognized', () => {
      const parameters = { unknown: 'foo' } as any;
      expect(() => KitsuApiUtil.ToHttpParams(parameters)).toThrowError();
    });


    // it('filter', () => {
    //   const params = KitsuApiUtil.ToHttpParams({
    //     filter: {filterNumber: 123, filterString: '123', filterBoolean: true, filterObj: {test: 'test'}}
    //   });
    //
    //   expect(params.get('filter[filterNumber]')).toBe(String(123));
    //   expect(params.get('filter[filterString]')).toBe('123');
    //   expect(params.get('filter[filterBoolean]')).toBe(String(true));
    // });
    //
    // it('sort', () => {
    //   const params = KitsuApiUtil.ToHttpParams({
    //     sort: 'anime'
    //   });
    //
    //   expect(params.get('sort')).toBe('anime');
    // });
    //
    // it('page', () => {
    //   const params = KitsuApiUtil.ToHttpParams({
    //     page: {
    //       limit: 15,
    //       offset: 3
    //     }
    //   });
    //
    //   expect(params.get('page[limit]')).toBe(String(15));
    //   expect(params.get('page[offset]')).toBe(String(3));
    // });
    //
    // it('include', () => {
    //   const params = KitsuApiUtil.ToHttpParams({
    //     include: 'test123'
    //   });
    //
    //   expect(params.get('include')).toBe('test123');
    // });
    //
    // it('fields', () => {
    //   const params = KitsuApiUtil.ToHttpParams({
    //     fields: {users: 'name,createdAt'}
    //   });
    //
    //   expect(params.get('fields[users]')).toBe('name,createdAt');
    // });
  });

  describe('addToHttpParams', () => {

    let httpParams: HttpParams;

    beforeEach(() => {
      httpParams = new HttpParams();
    });

    it('should append key-value pair to HttpParams when key is provided', () => {
      const result = KitsuApiUtil.addToHttpParams(httpParams, 'value', 'key');
      expect(result.get('key')).toBe('value');
    });

    it('should append object to HttpParams when key is not provided', () => {
      const result = KitsuApiUtil.addToHttpParams(httpParams, { key: 'value' });
      expect(result.get('key')).toBe('value');
    });

    it('should throw error when key is null and value is not object or array', () => {
      expect(() => KitsuApiUtil.addToHttpParams(httpParams, 'value')).toThrowError('key may not be null if value is not object or array');
    });

    it('should add array elements to HttpParams when value is array', () => {
      const result = KitsuApiUtil.addToHttpParams(httpParams, ['value1', 'value2'], 'key');
      expect(result.getAll('key')).toContain('value1');
      expect(result.getAll('key')).toContain('value2');
    });

    it('should convert date to ISO string and append it to HttpParams when value is date and key is provided', () => {
      const date = new Date();
      const result = KitsuApiUtil.addToHttpParams(httpParams, date, 'key');
      expect(result.get('key')).toBe(date.toISOString().substring(0, 10));
    });

    it('should throw error when value is date and key is not provided', () => {
      const date = new Date();
      expect(() => KitsuApiUtil.addToHttpParams(httpParams, date)).toThrowError('key may not be null if value is Date');
    });



    // it('should work', () => {
    //
    //   httpParams = KitsuApiUtil.addToHttpParams(httpParams, true, 'test1');
    //   httpParams = KitsuApiUtil.addToHttpParams(httpParams, 123, 'test2');
    //   httpParams = KitsuApiUtil.addToHttpParams(httpParams, 'test', 'test3');
    //   httpParams = KitsuApiUtil.addToHttpParams(httpParams, {test4: 'test', test5: 'test'});
    //   httpParams = KitsuApiUtil.addToHttpParams(httpParams, new Date(2023, 1, 1), 'test6');
    //   httpParams = KitsuApiUtil.addToHttpParams(httpParams, ['test', 'test'], 'test7');
    //
    //   expect(httpParams.get('test1')).toBe(String(true));
    //   expect(httpParams.get('test2')).toBe(String(123));
    //   expect(httpParams.get('test3')).toBe('test');
    //   expect(httpParams.get('test4')).toBe('test');
    //   expect(httpParams.get('test5')).toBe('test');
    //   expect(httpParams.get('test6')).toBe('2023-01-01');
    //   expect(httpParams.get('test7')).toBe('test');
    // });
  });

  describe('addDeepObjectToHttpParams', () => {
    let httpParams: HttpParams;

    beforeEach(() => {
      httpParams = new HttpParams();
    });

    it('should append key-value pairs to HttpParams for each field in object', () => {
      const result = KitsuApiUtil.addDeepObjectToHttpParams(httpParams, { field1: 'value1', field2: 'value2' }, 'key');
      expect(result.get('key[field1]')).toBe('value1');
      expect(result.get('key[field2]')).toBe('value2');
    });

    it('should convert object to JSON string when field value is object', () => {
      const result = KitsuApiUtil.addDeepObjectToHttpParams(httpParams, { field1: { nestedField: 'value' } }, 'key');
      expect(result.get('key[field1]')).toBe('{"nestedField":"value"}');
    });

    // it('should work', () => {
    //   let httpParams = new HttpParams();
    //
    //   httpParams = KitsuApiUtil.addDeepObjectToHttpParams(httpParams, { test1: 123, test2: '123', test3: true, '444': 555 }, 'test');
    //
    //   expect(httpParams.get('test[test1]')).toBe(String(123));
    //   expect(httpParams.get('test[test2]')).toBe('123');
    //   expect(httpParams.get('test[test3]')).toBe(String(true));
    //   expect(httpParams.get('test[444]')).toBe(String(555));
    // });
  });
});




