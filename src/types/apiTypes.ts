export interface IUser {
  id: string;
  name: string;
  login: string;
}
export interface IUpdateUser {
  name: string;
  login: string;
  password: string;
}
export interface ISinginUser {
  login: string;
  password: string;
}
export interface ICreateUser {
  name: string;
  login: string;
  password: string;
}
export interface IBoard {
  id: string;
  title: string;
  description?: string;
}
export interface ICreateBoard {
  title: string;
  description?: string;
  token: string;
}
export interface ICreateBoardPreview {
  title: string;
  description?: string;
}
export interface ICreatedBoard {
  id: string;
  title: string;
}
export interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface ICreateColumn {
  title: string;
}
export interface IUpdateColumn {
  title: string;
  order: number;
}
export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
export interface ICreateTask {
  title: string;
  description: string;
  userId: string;
}
export interface IUpdateTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
export interface IConfig {
  method: string;
  headers: {
    Authorization?: string;
    'Content-Type'?: string;
  };
  body?: string;
}
export interface INewBoardForm {
  title: string;
  description: string;
}
