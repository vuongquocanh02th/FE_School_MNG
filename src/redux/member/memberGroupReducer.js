import {
    GET_GROUP_MEMBER_LIST_SUCCESS,
    GET_GROUP_MEMBER_INFO_SUCCESS,
    ADD_GROUP_MEMBER_SUCCESS,
    OPEN_ADD_GROUP_MEMBER_FORM,
    OPEN_EDIT_GROUP_MEMBER_FORM,
    CLOSE_GROUP_MEMBER_FORM, LEAVE_GROUP_SUCCESS, RESET_GROUP_MEMBER
} from "./memberAction.js";

const initialState = {
    members: [],
    info: {},
    message: "",
    error: "",
    formType: "none",
    loading: false,
    addMemberSuccess: false,
    leaveGroupSuccess: false,
};

export const memberGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUP_MEMBER_LIST_SUCCESS:
            return {...state, members: action.payload, loading: false, addMemberSuccess: false};
        case GET_GROUP_MEMBER_INFO_SUCCESS:
            return {...state, info: action.payload};
        case ADD_GROUP_MEMBER_SUCCESS:
            return {...state, message: "Thêm thành viên thành công", addMemberSuccess: true};
        case OPEN_ADD_GROUP_MEMBER_FORM:
            return {...state, formType: "add"};
        case OPEN_EDIT_GROUP_MEMBER_FORM:
            return {...state, formType: "edit", info: action.payload};
        case CLOSE_GROUP_MEMBER_FORM:
            return {...state, formType: "none", message: "", error: "", info: {}, addMemberSuccess: false};
        case LEAVE_GROUP_SUCCESS:
            return {...state, members: [], leaveGroupSuccess: true};
        case RESET_GROUP_MEMBER:
            return {...state, leaveGroupSuccess: false};
        default:
            return state;
    }
};
