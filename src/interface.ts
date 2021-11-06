/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
}


export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

export interface IGetTodoItemResponse {
  success: boolean;
  message: string;
  data: object;
}
