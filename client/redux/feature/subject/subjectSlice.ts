import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Subject {
    id: number;
    subject_name: string;
    active: boolean;
    created_at: string;
}

interface SubjectState {
    subjects: Subject[];
    loading: boolean;
    error: string | null;
}

interface SubjectPayload {
    subject_name: string;
    active: boolean;
}

const initialState: SubjectState = {
    subjects: [],
    loading: false,
    error: null,
};

// Lấy toàn bộ danh sách môn học
export const fetchSubject = createAsyncThunk(
    "subject/fetchSubject",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:3000/subjects");
            return res.data;
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const addSubject = createAsyncThunk(
    "subject/addSubject",
    async ({ subject_name, active }: SubjectPayload, thunkAPI) => {
        try {
            const now = new Date();
            const created_at = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
                now.getDate()
            ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
                now.getMinutes()
            ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

            const newSubject = {
                subject_name,
                active,
                created_at,
            };

            const res = await axios.post("http://localhost:3000/subjects", newSubject);
            return res.data;
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const editSubject = createAsyncThunk(
    "subject/editSubject",
    async (
        { id, subject_name, active }: { id: number; subject_name: string; active: boolean },
        thunkAPI
    ) => {
        try {
            const updatedData = { subject_name, active };
            const res = await axios.patch(`http://localhost:3000/subjects/${id}`, updatedData);
            return res.data;
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteSubject = createAsyncThunk(
    "subject/deleteSubject",
    async (id: number, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:3000/subjects/${id}`);
            return id; // chỉ cần trả lại id để xóa trong state
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ---------------- FETCH ----------------
        builder
            .addCase(fetchSubject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects = action.payload;
            })
            .addCase(fetchSubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // ---------------- ADD ----------------
        builder
            .addCase(addSubject.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects.push(action.payload);
            })
            .addCase(addSubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // -------
        builder
            .addCase(editSubject.pending, (state) => {
                state.loading = true;
            })
            .addCase(editSubject.fulfilled, (state, action) => {
                state.loading = false;
                const updatedSubject = action.payload;
                const index = state.subjects.findIndex(
                    (subj) => subj.id === updatedSubject.id
                );
                if (index !== -1) {
                    state.subjects[index] = updatedSubject;
                }
            })
            .addCase(editSubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        //------------------------------------------------------------
        builder
            .addCase(deleteSubject.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects = state.subjects.filter(
                    (subj) => subj.id !== action.payload
                );
            })
            .addCase(deleteSubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default subjectSlice.reducer;
