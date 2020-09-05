import React from "react";

import { withFirebase } from "../Firebase";

const SingOutButton = ({ firebase }) => (
    <button type='button' onClick={firebase.doSingOut}>
        Sing Out
    </button>
);

export default withFirebase(SingOutButton);