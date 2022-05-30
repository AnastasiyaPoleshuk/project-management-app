export interface ITaskResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
}
export interface IColumnResponse {
  id: string;
  title: string;
  order: number;
  tasks: ITaskResponse[];
}
export interface IBoardResponse {
  id: string;
  title: string;
  columns: IColumnResponse[];
}
