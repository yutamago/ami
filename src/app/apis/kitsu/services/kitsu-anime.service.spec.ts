import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {KitsuAnimeService} from './kitsu-anime.service';
import {AnimeResource} from "../schemas/resources/anime.resource";
import {ResourceTypesEnum} from "../schemas/resource-types.enum";
import {of} from "rxjs";
import {KitsuConfig} from "../kitsu.config";

describe('KitsuAnimeService', () => {
  let service: KitsuAnimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KitsuAnimeService]
    });
    service = TestBed.inject(KitsuAnimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //
  // describe('inherited methods', () => {
  //   const id = '1';
  //   const item: AnimeResource = {
  //     id: id,
  //     type: ResourceTypesEnum.anime,
  //     attributes: {createdAt: String(Date.now() / 1000), updatedAt: String(Date.now() / 1000)}
  //   };
  //
  //   it('should call create', () => {
  //     spyOn(service.http, 'post').and.returnValue(of(item));
  //     service.create(item.attributes).subscribe(res => {
  //       expect(res).toEqual(item);
  //     });
  //     expect(service.http.post).toHaveBeenCalledOnceWith(`${KitsuConfig.ApiBaseUrl}anime`, item);
  //   });
  //
  //   it('should call update', () => {
  //     spyOn(service.http, 'patch').and.returnValue(of(item));
  //     service.update(id, item).subscribe(res => {
  //       expect(res).toEqual(item);
  //     });
  //     expect(service.http.patch).toHaveBeenCalledOnceWith(`${KitsuConfig.ApiBaseUrl}anime/${id}`, item);
  //   });
  //
  //   it('should call get', () => {
  //     spyOn(service.http, 'get').and.returnValue(of(item));
  //     service.get(id).subscribe(res => {
  //       expect(res).toEqual(item);
  //     });
  //     expect(service.http.get).toHaveBeenCalledOnceWith(`${KitsuConfig.ApiBaseUrl}anime/${id}`);
  //   });
  //
  //   it('should call getAll', () => {
  //     spyOn(service.http, 'get').and.returnValue(of([item]));
  //     service.getAll().subscribe(res => {
  //       expect(res).toEqual([item]);
  //     });
  //     expect(service.http.get).toHaveBeenCalledOnceWith(`${KitsuConfig.ApiBaseUrl}anime`);
  //   });
  //
  //   it('should call delete', () => {
  //     spyOn(service.http, 'delete').and.returnValue(of({}));
  //     service.delete(id).subscribe(res => {
  //       expect(res).toEqual({});
  //     });
  //     expect(service.http.delete).toHaveBeenCalledOnceWith(`${KitsuConfig.ApiBaseUrl}anime/${id}`);
  //   });
  // });
});
