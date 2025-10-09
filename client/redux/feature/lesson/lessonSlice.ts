import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface lesson {
    id: number,
    subject_id: number,
    lesson_name: string,
    created_at: string,
}

interface lessonState {
    data: lesson[],
    loading: boolean,
    error: null | string,
}

const initialState: lessonState = {
    data: [],
    loading: false,
    error: null,
}

const fetLesson = createAsyncThunk(
    'lesson/fetchLesson',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:3000/lesson");
            return res.data
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const lessonSlice = createSlice({
    name: "lesson",
    initialState,
    reducers: {

    }
    , extraReducers: (builder) => {
        builder.addCase(fetLesson.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetLesson.rejected, (state, action) => {
                state.loading = false;
                if (action.payload !== null) {
                    state.error = action.payload as string
                }
            })
    }
})

export default lessonSlice.reducer