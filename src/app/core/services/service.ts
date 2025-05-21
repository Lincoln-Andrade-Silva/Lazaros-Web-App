import { Observable } from "rxjs";
import { DataListResponse } from "../../shared/model/DataListResponse";
import { DataResponse } from "../../shared/model/DataResponse";

export interface IService<T, K> {
    list(): Observable<DataListResponse<T>>;
    create(item: K): Observable<DataResponse<T>>;
    edit(id: any, item: K): Observable<DataResponse<T>>;
    delete(id: any): Observable<void>;
}