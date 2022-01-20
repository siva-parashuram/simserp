import React, { Fragment, useState } from "react";
import "../../user/dasboard.css";


export default (props) => {
    return (
        <Fragment>
            
            <input
             style={{
                borderRightStyle: 'none',
                
            }}
                id={props.id}
                type={props.type}
                className="CGINPUTBOXCSS"
                
                disabled={props.disabled}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onKeyUp={props.onKeyUp}
                onKeyDown={props.onKeyDown}
                value={props.value}
                
            />
        </Fragment>
    );
};


