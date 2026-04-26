import { CocoChatFile } from "@/types/resource";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CocoChatFile[] = [];

const filesSlice = createSlice({
  name: `files`,
  initialState,
  reducers: {
    fillFiles(state, action: PayloadAction<CocoChatFile[]>) {
      return action.payload;
    },
    addFile(state, action: PayloadAction<CocoChatFile>) {
      state.push(action.payload);
    },
    deleteFile(state, action: PayloadAction<string>) {
      const content = action.payload;
      const idx = state.findIndex((f) => f.content == content);
      if (idx > -1) {
        state.splice(idx, 1);
      }
    },
  },
});

export const { addFile, deleteFile, fillFiles } = filesSlice.actions;

export default filesSlice.reducer;
