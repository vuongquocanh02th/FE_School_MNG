import React, { useState } from "react";
import { Dropdown, Image } from "react-bootstrap";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Profile = () => {
    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-user">
                <Image
                    src="/static/images/avatar/2.jpg"
                    roundedCircle
                    width="40"
                    height="40"
                    alt="User Avatar"
                />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {settings.map((setting, index) => (
                    <Dropdown.Item key={index} href={`#${setting.toLowerCase()}`}>
                        {setting}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Profile;
