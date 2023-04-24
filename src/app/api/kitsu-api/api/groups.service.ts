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
import { InlineResponse20049 } from '../model/inlineResponse20049';
import { InlineResponse20050 } from '../model/inlineResponse20050';
import { InlineResponse20051 } from '../model/inlineResponse20051';
import { InlineResponse20052 } from '../model/inlineResponse20052';
import { InlineResponse20053 } from '../model/inlineResponse20053';
import { InlineResponse20054 } from '../model/inlineResponse20054';
import { InlineResponse20055 } from '../model/inlineResponse20055';
import { InlineResponse20056 } from '../model/inlineResponse20056';
import { InlineResponse20057 } from '../model/inlineResponse20057';
import { InlineResponse20058 } from '../model/inlineResponse20058';
import { InlineResponse20059 } from '../model/inlineResponse20059';
import { InlineResponse20060 } from '../model/inlineResponse20060';
import { InlineResponse20061 } from '../model/inlineResponse20061';
import { InlineResponse400 } from '../model/inlineResponse400';
import { InlineResponse500 } from '../model/inlineResponse500';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class GroupsService {

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
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource190(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource190(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource190(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource190(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/groups`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource197(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource197(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource197(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource197(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-bans`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource201(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource201(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource201(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource201(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-categories`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource206(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource206(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource206(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource206(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-invites`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource211(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource211(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource211(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource211(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-member-notes`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource216(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource216(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource216(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource216(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-members`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource221(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource221(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource221(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource221(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-neighbors`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource225(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource225(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource225(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource225(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-permissions`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource229(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource229(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource229(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource229(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-reports`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource233(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource233(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource233(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource233(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-ticket-messages`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource238(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource238(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource238(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource238(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/group-tickets`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Resource
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource242(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createResource242(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createResource242(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createResource242(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('post',`${this.basePath}/leader-chat-messages`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource193(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource193(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource193(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource193(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource193.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/groups/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource199(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource199(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource199(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource199(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource199.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/group-bans/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource204(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource204(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource204(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource204(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource204.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/group-categories/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource209(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource209(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource209(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource209(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource209.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/group-invites/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource214(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource214(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource214(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource214(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource214.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/group-member-notes/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource219(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource219(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource219(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource219(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource219.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/group-members/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource223(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource223(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource223(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource223(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource223.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/group-neighbors/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource227(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource227(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource227(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource227(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource227.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/group-permissions/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource236(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource236(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource236(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource236(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource236.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/group-ticket-messages/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource245(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource245(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource245(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource245(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource245.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/leader-chat-messages/${encodeURIComponent(String(id))}`,
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
    public fetchCollection189(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection189(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection189(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection189(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/groups`,
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
    public fetchCollection194(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection194(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection194(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection194(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-action-logs`,
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
    public fetchCollection196(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection196(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection196(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection196(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-bans`,
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
    public fetchCollection200(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection200(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection200(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection200(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-categories`,
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
    public fetchCollection205(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection205(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection205(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection205(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-invites`,
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
    public fetchCollection210(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection210(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection210(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection210(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-member-notes`,
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
    public fetchCollection215(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection215(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection215(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection215(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-members`,
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
    public fetchCollection220(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection220(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection220(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection220(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-neighbors`,
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
    public fetchCollection224(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection224(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection224(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection224(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-permissions`,
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
    public fetchCollection228(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection228(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection228(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection228(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-reports`,
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
    public fetchCollection232(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection232(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection232(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection232(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-ticket-messages`,
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
    public fetchCollection237(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection237(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection237(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection237(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/group-tickets`,
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
    public fetchCollection241(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public fetchCollection241(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public fetchCollection241(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public fetchCollection241(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse200>('get',`${this.basePath}/leader-chat-messages`,
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
    public fetchResource191(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20049>;
    public fetchResource191(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20049>>;
    public fetchResource191(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20049>>;
    public fetchResource191(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource191.');
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

        return this.httpClient.request<InlineResponse20049>('get',`${this.basePath}/groups/${encodeURIComponent(String(id))}`,
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
    public fetchResource195(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20050>;
    public fetchResource195(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20050>>;
    public fetchResource195(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20050>>;
    public fetchResource195(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource195.');
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

        return this.httpClient.request<InlineResponse20050>('get',`${this.basePath}/group-action-logs/${encodeURIComponent(String(id))}`,
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
    public fetchResource198(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20051>;
    public fetchResource198(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20051>>;
    public fetchResource198(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20051>>;
    public fetchResource198(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource198.');
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

        return this.httpClient.request<InlineResponse20051>('get',`${this.basePath}/group-bans/${encodeURIComponent(String(id))}`,
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
    public fetchResource202(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20052>;
    public fetchResource202(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20052>>;
    public fetchResource202(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20052>>;
    public fetchResource202(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource202.');
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

        return this.httpClient.request<InlineResponse20052>('get',`${this.basePath}/group-categories/${encodeURIComponent(String(id))}`,
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
    public fetchResource207(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20053>;
    public fetchResource207(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20053>>;
    public fetchResource207(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20053>>;
    public fetchResource207(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource207.');
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

        return this.httpClient.request<InlineResponse20053>('get',`${this.basePath}/group-invites/${encodeURIComponent(String(id))}`,
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
    public fetchResource212(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20054>;
    public fetchResource212(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20054>>;
    public fetchResource212(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20054>>;
    public fetchResource212(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource212.');
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

        return this.httpClient.request<InlineResponse20054>('get',`${this.basePath}/group-member-notes/${encodeURIComponent(String(id))}`,
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
    public fetchResource217(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20055>;
    public fetchResource217(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20055>>;
    public fetchResource217(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20055>>;
    public fetchResource217(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource217.');
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

        return this.httpClient.request<InlineResponse20055>('get',`${this.basePath}/group-members/${encodeURIComponent(String(id))}`,
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
    public fetchResource222(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20056>;
    public fetchResource222(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20056>>;
    public fetchResource222(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20056>>;
    public fetchResource222(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource222.');
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

        return this.httpClient.request<InlineResponse20056>('get',`${this.basePath}/group-neighbors/${encodeURIComponent(String(id))}`,
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
    public fetchResource226(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20057>;
    public fetchResource226(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20057>>;
    public fetchResource226(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20057>>;
    public fetchResource226(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource226.');
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

        return this.httpClient.request<InlineResponse20057>('get',`${this.basePath}/group-permissions/${encodeURIComponent(String(id))}`,
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
    public fetchResource230(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20058>;
    public fetchResource230(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20058>>;
    public fetchResource230(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20058>>;
    public fetchResource230(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource230.');
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

        return this.httpClient.request<InlineResponse20058>('get',`${this.basePath}/group-reports/${encodeURIComponent(String(id))}`,
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
    public fetchResource234(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20059>;
    public fetchResource234(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20059>>;
    public fetchResource234(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20059>>;
    public fetchResource234(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource234.');
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

        return this.httpClient.request<InlineResponse20059>('get',`${this.basePath}/group-ticket-messages/${encodeURIComponent(String(id))}`,
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
    public fetchResource239(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20060>;
    public fetchResource239(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20060>>;
    public fetchResource239(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20060>>;
    public fetchResource239(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource239.');
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

        return this.httpClient.request<InlineResponse20060>('get',`${this.basePath}/group-tickets/${encodeURIComponent(String(id))}`,
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
    public fetchResource243(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20061>;
    public fetchResource243(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20061>>;
    public fetchResource243(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20061>>;
    public fetchResource243(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fetchResource243.');
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

        return this.httpClient.request<InlineResponse20061>('get',`${this.basePath}/leader-chat-messages/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateResource192(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateResource192(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateResource192(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateResource192(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateResource192.');
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

        return this.httpClient.request<any>('patch',`${this.basePath}/groups/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateResource203(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateResource203(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateResource203(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateResource203(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateResource203.');
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

        return this.httpClient.request<any>('patch',`${this.basePath}/group-categories/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateResource208(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateResource208(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateResource208(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateResource208(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateResource208.');
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

        return this.httpClient.request<any>('patch',`${this.basePath}/group-invites/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateResource213(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateResource213(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateResource213(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateResource213(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateResource213.');
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

        return this.httpClient.request<any>('patch',`${this.basePath}/group-member-notes/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateResource218(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateResource218(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateResource218(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateResource218(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateResource218.');
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

        return this.httpClient.request<any>('patch',`${this.basePath}/group-members/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateResource231(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateResource231(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateResource231(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateResource231(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateResource231.');
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

        return this.httpClient.request<any>('patch',`${this.basePath}/group-reports/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateResource235(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateResource235(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateResource235(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateResource235(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateResource235.');
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

        return this.httpClient.request<any>('patch',`${this.basePath}/group-ticket-messages/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateResource240(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateResource240(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateResource240(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateResource240(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateResource240.');
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

        return this.httpClient.request<any>('patch',`${this.basePath}/group-tickets/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Resource
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateResource244(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateResource244(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateResource244(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateResource244(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateResource244.');
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

        return this.httpClient.request<any>('patch',`${this.basePath}/leader-chat-messages/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
