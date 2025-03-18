import React from "react";
import GroupMemberList from "../../components/groupMember/GroupMemberList.jsx";

const MemberGroup = ({ groupId }) => {
    return (
        <div>
            <GroupMemberList groupId={groupId} />
        </div>
    );
};

export default MemberGroup;