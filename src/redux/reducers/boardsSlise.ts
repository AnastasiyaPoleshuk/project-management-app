import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, ICreatedBoard } from '../../types/apiTypes';
import { getBoardsList, addBoard, removeBoard } from '../thunks/boardThunks';

export type boardsPreviewState = {
  isLoading: boolean;
  error: null | string;
  boards: IBoard[];
};

const initialState: boardsPreviewState = {
  isLoading: true,
  error: null,
  boards: [],
};

export const boardsSlice = createSlice({
  name: 'boardsPreview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsList.pending, (state: boardsPreviewState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getBoardsList.fulfilled,
        (state: boardsPreviewState, action: PayloadAction<IBoard[]>) => {
          state.isLoading = false;
          state.error = null;
          state.boards = action.payload;
        }
      )
      .addCase(getBoardsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(removeBoard.pending, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeBoard.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = null;
        state.boards = state.boards.filter((board) => board.id !== action.payload);
      })
      .addCase(addBoard.fulfilled, (state, action: PayloadAction<ICreatedBoard>) => {
        state.isLoading = false;
        state.error = null;
        state.boards.push(action.payload);
      });
  },
});

export default boardsSlice.reducer;
