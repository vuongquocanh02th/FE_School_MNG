import {
    GET_MEMBERGROUP_LIST_SUCCESS,
    GET_MEMBERGROUP_INFO_SUCCESS,
    ADD_MEMBERGROUP_SUCCESS,
    REMOVE_MEMBERGROUP_SUCCESS,
    UPDATE_MEMBERGROUP_ROLE_SUCCESS,
    OPEN_ADD_MEMBERGROUP_FORM,
    OPEN_EDIT_MEMBERGROUP_FORM,
    CLOSE_MEMBERGROUP_FORM,
    ADD_MEMBERGROUP_FAILED
} from "./memberAction.js";

const initialState = {
    members: [],
    info: {},
    message: "",
    error: "",
    formType: "none",
    loading: false,
    addMemberSuccess: false

};

export const memberGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MEMBERGROUP_LIST_SUCCESS:
            return { ...state, members: action.payload, loading: false, addMemberSuccess: false };

        case GET_MEMBERGROUP_INFO_SUCCESS:
            return { ...state, info: action.payload };

        case ADD_MEMBERGROUP_SUCCESS:
            return { ...state, message: "Thêm thành viên thành công", addMemberSuccess: true  };

        case REMOVE_MEMBERGROUP_SUCCESS:
            return { ...state, message: "Xóa thành viên thành công" };

        case UPDATE_MEMBERGROUP_ROLE_SUCCESS:
            return { ...state, message: "Cập nhật vai trò thành công" };

        case OPEN_ADD_MEMBERGROUP_FORM:
            return { ...state, formType: "add" };

        case OPEN_EDIT_MEMBERGROUP_FORM:
            return { ...state, formType: "edit", info: action.payload };

        case CLOSE_MEMBERGROUP_FORM:
            return { ...state, formType: "none", message: "", error: "", info: {}, addMemberSuccess: false };
        case ADD_MEMBERGROUP_FAILED:
            return {
                ...state,
                addMemberSuccess: false,
                addMemberError: action.payload
            };
        default:
            return state;
    }
};
