import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {KitsuAnimeService} from './kitsu-anime.service';
import {AnimeResource} from "../schemas/resources/anime.resource";
import {ResourceTypesEnum} from "../schemas/resource-types.enum";
import {of} from "rxjs";
import {KitsuConfig} from "../kitsu.config";
import {KitsuFetchManyResponse} from "../models/responses/kitsu-fetch-many.response";
import {KitsuFetchOneResponse} from "../models/responses/kitsu-fetch-one.response";
import {KitsuOAuthService} from "./kitsu-o-auth.service";
import {KitsuOAuthServiceTesting} from "./kitsu-o-auth.service.spec";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

describe('KitsuCrudService', () => {
  let service: KitsuAnimeService;
  let oauth: KitsuOAuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KitsuAnimeService, {
        provide: KitsuOAuthService,
        useValue: new KitsuOAuthServiceTesting()
      }]
    });
    service = TestBed.inject(KitsuAnimeService);
    oauth = TestBed.inject(KitsuOAuthService);

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('crud methods', () => {
    const id = '1';
    const item: AnimeResource = {
      id: id,
      type: ResourceTypesEnum.anime,
      attributes: {createdAt: String(Date.now() / 1000), updatedAt: String(Date.now() / 1000)}
    };

    it('should call create', () => {
      const fakeResponse = {
        data: item
      } as KitsuFetchOneResponse<AnimeResource, ResourceTypesEnum.anime>;

      service.create(item.attributes!).then(res => {
        expect(res).toEqual(fakeResponse);
      });

      const req = httpTestingController.expectOne(`${KitsuConfig.ApiBaseUrl}anime`);
      expect(req.request.method).toEqual('POST');
      req.flush(fakeResponse);
    });

    it('should call update', () => {
      const fakeResponse = {
        data: item
      } as KitsuFetchOneResponse<AnimeResource, ResourceTypesEnum.anime>;

      service.update(id, item.attributes!).then(res => {
        expect(res).toEqual(fakeResponse);
      });

      const req = httpTestingController.expectOne(`${KitsuConfig.ApiBaseUrl}anime/${id}`);
      expect(req.request.method).toEqual('PATCH');
      req.flush(fakeResponse);
    });

    it('should call get', () => {
      const fakeResponse = {
        data: item
      } as KitsuFetchOneResponse<AnimeResource, ResourceTypesEnum.anime>;


      service.getSingle(id).then(res => {
        expect(res).toEqual(fakeResponse);
      });

      const req = httpTestingController.expectOne(`${KitsuConfig.ApiBaseUrl}anime/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(fakeResponse);
    });

    it('should call getAll', () => {
      const fakeResponse = {
        data: [item]
      } as KitsuFetchManyResponse<AnimeResource, ResourceTypesEnum.anime>;


      service.getMany().then(res => {
        expect(res).toEqual(fakeResponse);
      });

      const req = httpTestingController.expectOne(`${KitsuConfig.ApiBaseUrl}anime`);
      expect(req.request.method).toEqual('GET');
      req.flush(fakeResponse);
    });

    it('should call delete', () => {
      service.delete(id).then(res => {
        expect(res).toEqual({});
      });

      const req = httpTestingController.expectOne(`${KitsuConfig.ApiBaseUrl}anime/${id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
