import React, { Fragment, useState } from "react";
import "../../user/dasboard.css";


export default (props) => {
    return (
        <Fragment>
            
            <input
            
            style={
                props.disabled===true? 
                {width: '100%', fontSize: 14,backgroundColor:'#f5f5f5',borderRightStyle: 'none', }:
                {width: '100%', fontSize: 14,borderRightStyle: 'none', }
                
              }
                id={props.id}
                type={props.type}
                className={props.disabled?"DISABLEDCGINPUTBOXCSS":"CGINPUTBOXCSS"}
                
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


