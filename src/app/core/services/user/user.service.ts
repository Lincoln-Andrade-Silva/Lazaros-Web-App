import { Injectable } from "@angular/core";
import { IService } from "../service";
import { HttpClient } from "@angular/common/http";
import { DataListResponse } from "../../../shared/model/DataListResponse";
import { Observable } from "rxjs";
import { DataResponse } from "../../../shared/model/DataResponse";
import { UserResponse } from "../../../shared/model/user/UserResponse";
import { UserRequest } from "../../../shared/model/user/UserRequest";

@Injectable({
    providedIn: 'root'
})
export class UserService implements IService<UserResponse, UserRequest> {
    private baseUrl = 'http://localhost:8080/users';

    constructor(private http: HttpClient) { }

    list(): Observable<DataListResponse<UserResponse>> {
        return this.http.get<DataListResponse<UserResponse>>(this.baseUrl);
    }

    create(item: UserRequest): Observable<DataResponse<UserResponse>> {
        return this.http.post<DataResponse<UserResponse>>(this.baseUrl, item);
    }

    edit(id: any, item: UserRequest): Observable<DataResponse<UserResponse>> {
        return this.http.put<DataResponse<UserResponse>>(`${this.baseUrl}/${id}`, item);
    }

    delete(id: any): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}