// Action types

// Lấy danh sách thành viên nhóm
export const GET_GROUP_MEMBER_LIST = 'GET_GROUP_MEMBER_LIST';
export const GET_GROUP_MEMBER_LIST_SUCCESS = 'GET_GROUP_MEMBER_LIST_SUCCESS';

// Lấy thông tin nhóm (nếu muốn dùng riêng)
export const GET_GROUP_MEMBER_INFO_SUCCESS = 'GET_GROUP_MEMBER_INFO_SUCCESS';

// Thêm thành viên vào nhóm
export const ADD_GROUP_MEMBER = 'ADD_GROUP_MEMBER';
export const ADD_GROUP_MEMBER_SUCCESS = 'ADD_GROUP_MEMBER_SUCCESS';

export const LEAVE_GROUP = 'LEAVE_GROUP';
export const LEAVE_GROUP_SUCCESS = 'LEAVE_GROUP_SUCCESS';

// Xóa thành viên khỏi nhóm
export const REMOVE_GROUP_MEMBER = 'REMOVE_GROUP_MEMBER';

// Cập nhật vai trò thành viên
export const UPDATE_GROUP_MEMBER_ROLE = 'UPDATE_GROUP_MEMBER_ROLE';

export const TRANSFER_GROUP_OWNERSHIP = 'TRANSFER_GROUP_OWNERSHIP';

// Hiển thị và đóng form
export const OPEN_ADD_GROUP_MEMBER_FORM = 'OPEN_ADD_GROUP_MEMBER_FORM';
export const OPEN_EDIT_GROUP_MEMBER_FORM = 'OPEN_EDIT_GROUP_MEMBER_FORM';
export const CLOSE_GROUP_MEMBER_FORM = 'CLOSE_GROUP_MEMBER_FORM';

export const RESET_GROUP_MEMBER = 'RESET_GROUP_MEMBER';
