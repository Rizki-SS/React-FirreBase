import React from "react";

import * as ROLES from "../../constants/roles";
import { withAuthorization } from "../Session";

const AdminPage = () => (
    <div>
        <h1>Admin Page</h1>
        <p>welcome Admin</p>
    </div>
)

// const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN]
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AdminPage);
