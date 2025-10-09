import axios from 'axios';
import { Reducer } from '../../../node_modules/redux/src/types/reducers';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface user {
    id?: string,
    first_name: string,
    last_name: string,
    gender?: number,
    date_of_birth?: string,
    address?: string,
    avatar?: string,
    email: string,
    password: string,
    phone_number?: string,
    created_at?: string
}

interface userState {
    users: user[],
    loading: boolean,
    error: null | string,
}

const initialState: userState = {
    users: [],
    loading: false,
    error: null,
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:3000/users");
            return res.data
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (newUser: user, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:3000/users", newUser);
            return res.data
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    }
    , extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                if (action.payload !== null) {
                    state.error = action.payload as string
                }
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [...state.users, action.payload]
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                if (action.payload !== null) {
                    state.error = action.payload as string
                }
            })
    }
})

export default userSlice.reducer