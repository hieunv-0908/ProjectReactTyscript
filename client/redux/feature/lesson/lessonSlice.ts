import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Kiểu dữ liệu cho một bài học
export interface Lesson {
  id: string;
  subject_id: string;
  lesson_name: string;
  time: number;
  status: string;
  created_at: string;
}

// Kiểu dữ liệu cho state
interface LessonState {
  data: Lesson[];
  loading: boolean;
  error: string | null;
}

const initialState: LessonState = {
  data: [],
  loading: false,
  error: null,
};

//  Lấy danh sách bài học
export const fetLesson = createAsyncThunk(
  "lesson/fetchLesson",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:3000/lessons");
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  Thêm bài học
export const addLesson = createAsyncThunk(
  "lesson/addLesson",
  async (newLesson: Omit<Lesson, "id" | "created_at">, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:3000/lessons", {
        ...newLesson,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      });
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  Sửa bài học
export const updateLesson = createAsyncThunk(
  "lesson/updateLesson",
  async (updatedLesson: Lesson, thunkAPI) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/lessons/${updatedLesson.id}`,
        updatedLesson
      );
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  Xoá bài học
export const deleteLesson = createAsyncThunk(
  "lesson/deleteLesson",
  async (lessonId: string, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3000/lessons/${lessonId}`);
      return lessonId;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder
      .addCase(fetLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ADD
    builder
      .addCase(addLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE
    builder
      .addCase(updateLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (l) => l.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE
    builder
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((l) => l.id !== action.payload);
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default lessonSlice.reducer;
