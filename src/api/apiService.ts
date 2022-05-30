import {
  IConfig,
  ICreateBoard,
  ICreateColumn,
  ICreateTask,
  ICreateUser,
  ISinginUser,
  IUpdateTask,
  ICreateBoardPreview,
} from '../types/apiTypes';
import CONSTANTS from '../utils/constants';

const baseUrl = CONSTANTS.URLS.BASE_URL;

async function createResponse(
  url: string,
  method: string,
  {
    token,
    data,
  }: {
    token?: string;
    data?:
      | ISinginUser
      | ICreateUser
      | ICreateBoard
      | ICreateColumn
      | ICreateBoardPreview
      | ICreateTask
      | IUpdateTask;
  } = {}
) {
  const config: IConfig = {
    method,
    headers: {},
  };
  if (data) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(data);
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    if (method === 'DELETE') {
      return response;
    }
    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

// Authorization

export const createUser = (user: ICreateUser) => {
  const url = `${baseUrl}/signup`;
  return createResponse(url, 'POST', { data: user });
};

export const loginUser = (user: ISinginUser) => {
  const url = `${baseUrl}/signin`;
  return createResponse(url, 'POST', { data: user });
};

// Users

export const getUsers = (token: string) => {
  const url = `${baseUrl}/users`;
  return createResponse(url, 'GET', { token });
};

export const getUserById = (userId: string, token: string) => {
  const url = `${baseUrl}/users/${userId}`;
  return createResponse(url, 'GET', { token });
};

export const updateUser = (userId: string, user: ICreateUser, token: string) => {
  const url = `${baseUrl}/users/${userId}`;
  return createResponse(url, 'PUT', { token, data: user });
};

export const deleteUser = (userId: string, token: string) => {
  const url = `${baseUrl}/users/${userId}`;
  return createResponse(url, 'DELETE', { token });
};

const parseJwt = (token: string) => {
  const data = token.split('.')[1];
  const decodedString = JSON.parse(atob(data));
  return decodedString;
};

export const getUserId = (token: string) => {
  const payLoad = parseJwt(token);
  return payLoad.userId;
};

// Boards

export const getBoards = (token: string) => {
  const url = `${baseUrl}/boards`;
  return createResponse(url, 'GET', { token });
};

export const createBoard = (board: ICreateBoardPreview, token: string) => {
  const url = `${baseUrl}/boards`;
  return createResponse(url, 'POST', { data: board, token });
};

export const getBoardById = (boardId: string, token: string) => {
  const url = `${baseUrl}/boards/${boardId}`;
  return createResponse(url, 'GET', { token });
};

export const updateBoard = (boardId: string, board: ICreateBoard, token: string) => {
  const url = `${baseUrl}/boards/${boardId}`;
  return createResponse(url, 'PUT', { token, data: board });
};

export const deleteBoard = (boardId: string, token: string) => {
  const url = `${baseUrl}/boards/${boardId}`;
  return createResponse(url, 'DELETE', { token });
};

// Columns

export const getColumns = (boardId: string, token: string) => {
  const url = `${baseUrl}/boards/${boardId}/columns`;
  return createResponse(url, 'GET', { token });
};

export const createColumn = (boardId: string, column: ICreateColumn, token: string) => {
  const url = `${baseUrl}/boards/${boardId}/columns`;
  return createResponse(url, 'POST', { token, data: column });
};

export const getColumnById = (boardId: string, columnId: string, token: string) => {
  const url = `${baseUrl}/boards/${boardId}/columns/${columnId}`;
  return createResponse(url, 'GET', { token });
};

export const updateColumn = (
  boardId: string,
  columnId: string,
  column: ICreateColumn,
  token: string
) => {
  const url = `${baseUrl}/boards/${boardId}/columns/${columnId}`;
  return createResponse(url, 'PUT', { token, data: column });
};

export const deleteColumn = (boardId: string, columnId: string, token: string) => {
  const url = `${baseUrl}/boards/${boardId}/columns/${columnId}`;
  return createResponse(url, 'DELETE', { token });
};

// Tasks

export const getTasks = (boardId: string, columnId: string, token: string) => {
  const url = `${baseUrl}/boards/${boardId}/columns/${columnId}/tasks`;
  return createResponse(url, 'GET', { token });
};

export const createTask = (boardId: string, columnId: string, task: ICreateTask, token: string) => {
  const url = `${baseUrl}/boards/${boardId}/columns/${columnId}/tasks`;
  return createResponse(url, 'POST', { token, data: task });
};

export const getTaskById = (boardId: string, columnId: string, taskId: string, token: string) => {
  const url = `${baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  return createResponse(url, 'GET', { token });
};

export const updateTask = (
  boardId: string,
  columnId: string,
  taskId: string,
  task: IUpdateTask,
  token: string
) => {
  const url = `${baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  return createResponse(url, 'PUT', { token, data: task });
};

export const deleteTask = (boardId: string, columnId: string, taskId: string, token: string) => {
  const url = `${baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  return createResponse(url, 'DELETE', { token });
};
