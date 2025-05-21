import { GenericDTO } from "../GenericDTO";

export interface UserResponse {
    id: number;
    name: string;
    profiles: GenericDTO[];
}