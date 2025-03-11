import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: ["Nhóm A", "Nhóm B", "Nhóm C"], // Dữ liệu mặc định
};

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        addGroup: (state, action) => {
            state.list.push(action.payload);
        },
    },
});

export const { addGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
