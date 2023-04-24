/**
 * Kitsu API Docs
 * Kitsu is a modern anime discovery platform that helps you track the anime you're watching, discover new anime and socialize with other fans.  With the Kitsu API you can do everything the client can do and much more.  Base API path: `https://kitsu.io/api/edge`  <!-- # Versioning  Every year, we release a new version of the API, numbered by the last two digits of the current year. For example, the root URL of this (the 2017) release is `https://kitsu.io/api/17/`.  No fields, endpoints, or resources will be removed until the next year's release, but may be changed to return empty values (arrays, empty strings, etc.) before then. Fields, endpoints, and resources may be added throughout the lifetime of a release.  In addition to these versioned APIs, there is access to the same API our website uses. However, this offers no guarantees: anything could change at any time. We suggest you don't use this, but if you need to, it can be accessed at `https://kitsu.io/api/edge/`.  ## Life Cycle  Upon release of a new version, the previous version will be maintained for one year or until usage drops below 2% of API traffic.  During this period, it will not be updated to have any new fields, endpoints, or resources. You are expected to keep your applications running on the latest version of the API. For most applications, upgrading should take no more than a few hours of work. -->  # JSON:API  The Kitsu API implements the [JSON:API specification][jsonapi]. This means there are some notable semantics to how you consume it, but understanding it will take a lot of the work of using it out of your hands.  These docs will include a short overview of the capabilities, but you can consult the [JSON:API Specification][jsonapi] for more information.  You can be more specific about the data you want to retrieve by using URL parameters and are outlined below.  **Note:** This documentation will display parameters with brackets (`[` and `]`) for readability, but actual URLs will need to be percent-encoded (`%5B` and `%5D`).  ## Request Headers  As per the JSON:API specification, all requests to the API should contain these headers:  ``` Accept: application/vnd.api+json Content-Type: application/vnd.api+json ```  ## Filtering and Search  Filtering lets you query data that contains certain matching attributes or relationships. These take the form of `filter[attribute]=value`. For example, you can request all the anime of the Adventure category:  ``` /anime?filter[categories]=adventure ```  For some models, you can also search based on the query text:  ``` /anime?filter[text]=cowboy%20bebop ```  ## Pagination  You can choose how much of a resource to receive by specifying pagination parameters. Pagination is supported via `limit` and `offset`. Resources are paginated in groups of `10` by default and can be increased to a maximum of `20`.  `/anime?page[limit]=5&page[offset]=0`  The response will include URLs for the first, next and last page of resources in the `links` object based on your request.  ``` \"links\": {     \"first\": \"https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=0\",     \"next\": \"https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=5\",     \"last\": \"https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=12062\" } ```  ## Sorting  Sorting by attributes is also supported. By default, sorts are applied in ascending order. You can request a descending order by prepending `-` to the parameter. You can use a comma-delimited list to sort by multiple attributes.  `/users?sort=-followersCount,-followingCount`  ## Includes  You can include related resources with `include=[relationship]`. You can also specify successive relationships using a `.`. A comma-delimited list can be used to request multiple relationships.  `/anime?include=categories,mediaRelationships.destination`  ## Sparse Fieldsets  You can request a resource to only return a specific set of fields in its response. For example, to only receive a user's name and creation date:  `/users?fields[users]=name,createdAt`  ## Client Implementations  JSON:API has a great advantage in that since its standardised, API-agnostic tools can be made to abstract away the semantics of consuming and working with the data. It is recommended that you use a JSON:API client to implement the Kitsu API for this reason.  Many implementations in over 13 languages can be found on the [JSON:API website][jsonapi-client].  # Authentication  Kitsu uses OAuth 2 for authentication. Authentication is not required for most public-facing `GET` endpoints.  It is advised to use an OAuth2 client for the language you're using, however it is not required.  **NOTE:** NSFW/R18 content (feed posts, media, categories etc.) are hidden for all unauthenticated requests and for accounts that have NSFW content disabled in their settings.  Base OAuth2 path: `https://kitsu.io/api/oauth`  ## Request Headers  OAuth does not use the JSON:API headers, instead one of the following headers are required:  | Header       | json               | x-www-form-urlencoded | ------------ | ------------------ | --------------------- | Content-Type | application/json   | application/x-www-form-urlencoded  ## App Registration  After registering your app, you will receieve a client ID and a client secret. The client ID is considered public information and is used to build login URLs or included in source code. The client secret **must** be kept confidential.  **NOTE:** Application registration has not yet been implemented. For now, `client_id` and `client_secret` can be omitted, provided as empty strings or with the following:  ``` CLIENT_ID: dd031b32d2f56c990b1425efe6c42ad847e7fe3ab46bf1299f05ecd856bdb7dd CLIENT_SECRET: 54d7307928f63414defd96399fc31ba847961ceaecef3a5fd93144e960c0e151 ```  ## Grant Types  OAuth 2 provides several grant types for different use cases. The grant types defined are:  - **Authorization Code** for apps running on a web server, browser-based and mobile apps (not yet implemented)  - **Password** for logging in with a username and Password  - **Client Credentials** for application access (not yet implemented)  ## Obtaining an Access Token  ### Password Grant  Send a `POST` request to `https://kitsu.io/api/oauth/token` with the following body:  #### application/json  ```json5 {   grant_type: 'password',   username: '<email|slug>',   password: '<password>' // RFC3986 URl encoded string } ```  #### application/x-www-form-urlencoded  ``` grant_type=password&username=<email|slug>&password=<password> ```  **IMPORTANT**: If you use `x-www-form-urlencoded`, you **must** URL encode the password field using the [RFC3986 encoding scheme](http://whatwebwhat.com/en/page/350/oauth-and-url-encoding).  ## Refreshing an Access Token  Send a `POST` request to `https://kitsu.io/api/oauth/token` with the following body:  **NOTE:** If the token was issued using a `client_secret` then the `client_id` and `client_secret` parameters must be provided.  #### application/json  ```json5 {   grant_type: 'refresh_token',   refresh_token: '<refresh_token>' } ```  #### application/x-www-form-urlencoded  ``` grant_type=refresh_token&refresh_token=<refresh_token> ```  ## Using an Access Token  Once you've obtained the `access_token` using one of the grant types, you can add the following header to all API requests:  ``` Authorization: Bearer <access_token> ```  ## Access Token Responses  ### Successful Response  If the request for an access token is valid, the server will respond with the following data:  ```json5 {   access_token: 'abc123', // Token used in Authorization header   created_at: 1518235801,   expires_in: 2591963, // Seconds until the access_token expires (30 days default)   refresh_token: '123abc', // Token used to get a new access_token   scope: 'public',   token_type: 'bearer' } ```  ### Unsuccessful Response  If the access token request is invalid, the server will respond with one of six errors in the following format:  ```json5 {   error: 'invalid_request',   error_description: '<reason_why>' } ```  These six errors are:  | Error                    | Status | Explanation | ------------------------ | ------ | ----------- | `invalid_request`        | `400`  | The request is missing a parameter, uses an unsupported parameter or repeats a parameter. | `invalid_client`         | `401`  | The request contains an invalid client ID or secret. | `invalid_grant`          | `400`  | The authorization code (or password with the password grant) is invalid or expired. | `invalid_scope`          | `400`  | The request contains an invalid scope (password or client credential grants). | `unauthorized_client`    | `400`  | The client is not authorized to use the requested grant type. | `unsupported_grant_type` | `400`  | The grant type requested is not recognized by the server.  # HTTP Methods  Method   | Description -------- | ----------- `GET`    | Fetch - retrieve resources `POST`   | Create - create new resources `PATCH`  | Update - (partially) modify existing resources `DELETE` | Delete - remove resources  # Status Codes  Code  | Description ----- | ----------- `200` | OK - request succeeded (GET, PATCH, DELETE) `201` | Created - new resource created (POST) `204` | No Content - request succeeded (DELETE) `400` | Bad Request - malformed request `401` | Unauthorized - invalid or no authentication details provided `404` | Not Found - resource does not exist `406` | Not Acceptable - invalid `Accept` header `5xx` | Server Error  # 3rd Party Tutorials  - [You and your Kitsu Anime library](https://github.com/pheyvaer/kitsu-tutorial/blob/master/index.md)  # Questions?  If you have any questions you can:  - Join our [Discord server][discord] (recommended)  - Ping [@wopian][wopian], [@matthewdias][matthewdias] or [@nuck][nuck] on Kitsu.  [jsonapi]:http://jsonapi.org/format/ [jsonapi-client]:http://jsonapi.org/implementations/#client-libraries [wopian]:https://kitsu.io/users/wopian [matthewdias]:https://kitsu.io/users/matthewdias [nuck]:https://kitsu.io/users/nuck [discord]:https://invite.gg/kitsu
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { InlineResponse200 } from '../model/inlineResponse200';
import { InlineResponse20010 } from '../model/inlineResponse20010';
import { InlineResponse20011 } from '../model/inlineResponse20011';
import { InlineResponse2008 } from '../model/inlineResponse2008';
import { InlineResponse2009 } from '../model/inlineResponse2009';
import { InlineResponse400 } from '../model/inlineResponse400';
import { InlineResponse500 } from '../model/inlineResponse500';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class MediaRelationsService {

    protected basePath = 'https://kitsu.io/api/edge';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Fetch Collection
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fetchCollection18(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection18(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection18(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection18(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/vnd.api+json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/media-relationships`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch Collection
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fetchCollection20(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection20(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection20(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection20(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/vnd.api+json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/mappings`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch Collection
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fetchCollection22(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection22(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection22(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection22(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/vnd.api+json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/franchises`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch Collection
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fetchCollection24(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection24(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection24(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection24(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/vnd.api+json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/installments`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fetchResource19(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse2008>;
    public fetchResource19(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse2008>>;
    public fetchResource19(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse2008>>;
    public fetchResource19(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource19.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/vnd.api+json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse2008>('get',`${this.basePath}/media-relationships/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fetchResource21(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse2009>;
    public fetchResource21(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse2009>>;
    public fetchResource21(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse2009>>;
    public fetchResource21(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource21.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/vnd.api+json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse2009>('get',`${this.basePath}/mappings/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fetchResource23(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20010>;
    public fetchResource23(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20010>>;
    public fetchResource23(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20010>>;
    public fetchResource23(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource23.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/vnd.api+json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse20010>('get',`${this.basePath}/franchises/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fetchResource25(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20011>;
    public fetchResource25(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20011>>;
    public fetchResource25(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20011>>;
    public fetchResource25(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource25.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/vnd.api+json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse20011>('get',`${this.basePath}/installments/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
