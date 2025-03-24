const unknown = "% UNKNOWN %"

export const reformatDate = (date) => {
    try {
        let str = "";
        let arr = date.split("-");
        str += `${arr[0]}-${arr[1]}-`;
        arr = arr[2].split("T");
        str += arr[0];
        arr = arr[1].split(":");
        str += ` ${arr[0]}:${arr[1]}:${arr[2].split(".")[0]}`;
        return str;
    } catch {
        return unknown;
    }
}

export const reformatGroupAccess = (access) => {
    switch (access) {
        case "PUBLIC":
            return "Công khai";
        case "PRIVATE":
            return "Riêng tư";
        default:
            return unknown;
    }
}

export const reformatMemberType = (type) => {
    switch (type) {
        case "OWNER":
            return "Chủ nhóm";
        case "ADMIN":
            return "Quản trị viên";
        case "MEMBER":
            return "Thành viên";
        default:
            return unknown;
    }
}