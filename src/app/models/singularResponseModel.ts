import { responseModel } from "./responseModel";

export interface SingularResponseModel<T> extends responseModel{
    data : T
}