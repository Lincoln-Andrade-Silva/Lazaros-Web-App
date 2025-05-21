import { Injectable } from "@angular/core";
import { IService } from "../service";
import { ProfileResponse } from "../../../shared/model/profile/ProfileResponse";
import { HttpClient } from "@angular/common/http";
import { ProfileRequest } from "../../../shared/model/profile/ProfileRequest";
import { DataListResponse } from "../../../shared/model/DataListResponse";
import { Observable } from "rxjs";
import { DataResponse } from "../../../shared/model/DataResponse";

@Injectable({
    providedIn: 'root'
})
export class ProfileService implements IService<ProfileResponse, ProfileRequest> {
    private baseUrl = 'http://localhost:8080/profile';

    constructor(private http: HttpClient) { }

    list(): Observable<DataListResponse<ProfileResponse>> {
        return this.http.get<DataListResponse<ProfileResponse>>(this.baseUrl);
    }

    create(item: ProfileRequest): Observable<DataResponse<ProfileResponse>> {
        return this.http.post<DataResponse<ProfileResponse>>(this.baseUrl, item);
    }

    edit(id: any, item: ProfileRequest): Observable<DataResponse<ProfileResponse>> {
        return this.http.put<DataResponse<ProfileResponse>>(`${this.baseUrl}/${id}`, item);
    }

    delete(id: any): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}