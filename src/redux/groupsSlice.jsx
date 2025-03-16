import { createSlice } from "@reduxjs/toolkit";

const groupsSlice = createSlice({
    name: "groups",
    initialState: {
        list: [],
    },
    reducers: {
        addGroup: (state, action) => {
            state.list.push(action.payload);
        },
    },
});

export const { addGroup } = groupsSlice.actions;
export default groupsSlice.reducer;