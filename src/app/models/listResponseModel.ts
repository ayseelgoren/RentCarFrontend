import { responseModel } from "./responseModel";

export interface ListResponseModel<T> extends responseModel{
    data : T[]
}