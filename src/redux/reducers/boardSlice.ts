import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnResponse, ITaskResponse } from '../../types/board';
import { IUpdateColumn, IUpdateTask } from '../../types/apiTypes';
import { addColumn, addTask, fetchBoardData } from '../thunks/boardThunks';

export type BoardState = {
  columns: IColumnResponse[];
  title: string;
  status: string;
  error: string | null;
};

const initialState: BoardState = {
  columns: [],
  title: '',
  status: 'idle',
  error: null,
};

function reorderItems(
  items: (ITaskResponse | IColumnResponse)[],
  currentItem: ITaskResponse | IColumnResponse,
  newOrder: number
) {
  const itemsToReorder = items.filter((item) =>
    currentItem.order < newOrder
      ? item.order >= currentItem.order && item.order <= newOrder
      : item.order >= newOrder && item.order <= currentItem.order
  );

  itemsToReorder.forEach((item) => {
    if (currentItem.order < newOrder) item.order -= 1;
    else item.order += 1;
  });
  currentItem.order = newOrder;
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    columnDeleted(
      state,
      action: PayloadAction<{
        columnId: string;
      }>
    ) {
      const { columnId } = action.payload;
      const currentColumn = state.columns.find((item) => item.id === columnId) as IColumnResponse;
      const columnsToReorder = state.columns.filter((item) => item.order > currentColumn.order);
      columnsToReorder.forEach((item) => {
        item.order -= 1;
      });
      state.columns = state.columns.filter((item) => item.id !== columnId);
    },
    taskDeleted(
      state,
      action: PayloadAction<{
        columnId: string;
        taskId: string;
      }>
    ) {
      const { columnId, taskId } = action.payload;
      const column = state.columns.find((item) => item.id === columnId) as IColumnResponse;
      const currentTask = column.tasks.find((item) => item.id === taskId) as ITaskResponse;
      const tasksToReorder = column.tasks.filter((item) => item.order > currentTask.order);
      tasksToReorder.forEach((item) => {
        item.order -= 1;
      });
      column.tasks = column.tasks.filter((item) => item.id !== taskId);
    },
    taskEdited(
      state,
      action: PayloadAction<{
        columnId: string;
        taskId: string;
        task: IUpdateTask;
      }>
    ) {
      const { columnId, taskId, task } = action.payload;
      const column = state.columns.find((item) => item.id === columnId) as IColumnResponse;
      const { tasks } = column;
      const currentTask = tasks.find((item) => item.id === taskId) as ITaskResponse;

      if (columnId !== task.columnId) {
        const otherColumn = state.columns.find(
          (item) => item.id === task.columnId
        ) as IColumnResponse;
        const tasksInOtherColumn = otherColumn.tasks;

        tasksInOtherColumn.forEach((item) => {
          if (task.order <= item.order) {
            item.order += 1;
          }
        });
        tasks.forEach((item) => {
          if (currentTask.order < item.order) {
            item.order -= 1;
          }
        });
        currentTask.order = task.order;

        column.tasks = column.tasks.filter((item) => item.id !== taskId);
        tasksInOtherColumn.push({ ...task, id: taskId });
        return;
      }

      if (currentTask.order !== task.order) {
        reorderItems(tasks, currentTask, task.order);
        return;
      }

      currentTask.title = task.title;
      currentTask.description = task.description;
    },
    columnEdited(
      state,
      action: PayloadAction<{
        columnId: string;
        column: IUpdateColumn;
      }>
    ) {
      const { columnId, column } = action.payload;
      const { columns } = state;
      const currentColumn = columns.find((item) => item.id === columnId) as IColumnResponse;

      if (currentColumn.order !== column.order) {
        reorderItems(columns, currentColumn, column.order);
        return;
      }

      currentColumn.title = column.title;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });

    builder.addCase(fetchBoardData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      state.title = action.payload.title;
      state.columns = action.payload.columns;
    });

    builder.addCase(fetchBoardData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      state.title = '';
      state.columns = [];
    });

    builder.addCase(addColumn.fulfilled, (state, action) => {
      action.payload.tasks = [];
      state.columns.push(action.payload);
    });

    builder.addCase(addTask.fulfilled, (state, action) => {
      const { columnId } = action.payload;
      state.error = null;
      const column = state.columns.find((item) => item.id === columnId);
      (column as IColumnResponse).tasks.push(action.payload);
    });
  },
});

export const { columnDeleted, columnEdited, taskDeleted, taskEdited } = boardSlice.actions;

export default boardSlice.reducer;
