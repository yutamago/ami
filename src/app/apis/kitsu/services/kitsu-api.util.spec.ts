import {KitsuApiUtil} from "./kitsu-api.util";
import {HttpParams} from "@angular/common/http";

describe('KitsuApiUtil', () => {

  describe('ToHttpParams', () => {
    it('filter', () => {
      const params = KitsuApiUtil.ToHttpParams({
        filter: {filterNumber: 123, filterString: '123', filterBoolean: true, filterObj: {test: 'test'}}
      });

      expect(params.get('filter[filterNumber]')).toBe(String(123));
      expect(params.get('filter[filterString]')).toBe('123');
      expect(params.get('filter[filterBoolean]')).toBe(String(true));
    });

    it('sort', () => {
      const params = KitsuApiUtil.ToHttpParams({
        sort: 'anime'
      });

      expect(params.get('sort')).toBe('anime');
    });

    it('page', () => {
      const params = KitsuApiUtil.ToHttpParams({
        page: {
          limit: 15,
          offset: 3
        }
      });

      expect(params.get('page[limit]')).toBe(String(15));
      expect(params.get('page[offset]')).toBe(String(3));
    });

    it('include', () => {
      const params = KitsuApiUtil.ToHttpParams({
        include: 'test123'
      });

      expect(params.get('include')).toBe('test123');
    });

    it('fields', () => {
      const params = KitsuApiUtil.ToHttpParams({
        fields: {users: 'name,createdAt'}
      });

      expect(params.get('fields[users]')).toBe('name,createdAt');
    });
  });

  describe('addToHttpParams', () => {
    it('should work', () => {
      let httpParams = new HttpParams();

      httpParams = KitsuApiUtil.addToHttpParams(httpParams, true, 'test1');
      httpParams = KitsuApiUtil.addToHttpParams(httpParams, 123, 'test2');
      httpParams = KitsuApiUtil.addToHttpParams(httpParams, 'test', 'test3');
      httpParams = KitsuApiUtil.addToHttpParams(httpParams, {test4: 'test', test5: 'test'});

      expect(httpParams.get('test1')).toBe(String(true));
      expect(httpParams.get('test2')).toBe(String(123));
      expect(httpParams.get('test3')).toBe('test');
      expect(httpParams.get('test4')).toBe('test');
      expect(httpParams.get('test5')).toBe('test');
    });
  });

  describe('addDeepObjectToHttpParams', () => {
    it('should work', () => {
      let httpParams = new HttpParams();

      httpParams = KitsuApiUtil.addDeepObjectToHttpParams(httpParams, { test1: 123, test2: '123', test3: true, '444': 555 }, 'test');

      expect(httpParams.get('test[test1]')).toBe(String(123));
      expect(httpParams.get('test[test2]')).toBe('123');
      expect(httpParams.get('test[test3]')).toBe(String(true));
      expect(httpParams.get('test[444]')).toBe(String(555));
    });
  });
});




