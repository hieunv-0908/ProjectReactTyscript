import { configureStore } from "@reduxjs/toolkit";
import subjectReducer from "../feature/subject/subjectSlice"
import lessonReducer from "../feature/lesson/lessonSlice"
import userReducer from "../feature/user/userSlice"

export const store = configureStore({
    reducer: {
        subject: subjectReducer,
        lesson: lessonReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch