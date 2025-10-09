import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface subject {
    id: number,
    subject_name: string
    created_at: string
}

interface subjectState {
    data: subject[],
    loading: boolean,
    error: null | string,
}

const initialState: subjectState = {
    data: [],
    loading: false,
    error: null,
}

const fetSubject = createAsyncThunk(
    'subject/fetchSubject',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:3000/subjects");
            return res.data
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {

    }
    , extraReducers: (builder) => {
        builder.addCase(fetSubject.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetSubject.rejected, (state, action) => {
                state.loading = false;
                if (action.payload !== null) {
                    state.error = action.payload as string
                }
            })
    }
})

export default subjectSlice.reducer