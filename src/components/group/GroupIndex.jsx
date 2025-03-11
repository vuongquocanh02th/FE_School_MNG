import React, {useState} from "react";
import GroupForm from "./GroupForm.jsx";
import GroupList from "./GroupList.jsx";
import GroupInfo from "./GroupInfo.jsx";

export default function GroupIndex() {
    const [formType, setFormType] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const [groupDetails, setGroupDetails] = useState({});

    const openAddForm = () => {
        setFormType('add');
        setShowForm(true);
    }

    const openEditForm = () => {
        setFormType('edit');
        closeInfo();
        setShowForm(true);
    }

    const chooseGroup = (group) => {
        setGroupDetails(group);
        setShowInfo(true);
    }

    const closeForm = () => setShowForm(false);
    const closeInfo = () => setShowInfo(false);

    return (
        <div className="ms-4 my-4">
            <button type="button" className="btn btn-primary" onClick={openAddForm}>
                Mở Form
            </button>
            <GroupList onItemClick={chooseGroup}/>
            {showForm && (
                <GroupForm data={groupDetails} formType={formType} closeForm={closeForm}/>
            )}
            {showInfo && (
                <GroupInfo data={groupDetails} closeInfo={closeInfo} openForm={openEditForm}/>
            )}
        </div>
    )
}