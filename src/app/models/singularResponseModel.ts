import { ResponseModel } from "./responseModel";

export interface SingularResponseModel<T> extends ResponseModel{
    data : T
}