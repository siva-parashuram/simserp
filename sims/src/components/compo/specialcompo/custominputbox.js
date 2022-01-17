import React, { Fragment, useState } from "react";
import "../../user/dasboard.css";


export default (props) => {
    return (
        <Fragment>
            <input 
            type={props.type}
            className="CGINPUTBOXCSS"
            style={props.style}
            disabled={props.disabled}
            />
        </Fragment>
    );
};


