import React, { Fragment, useState } from "react";
import "../../user/dasboard.css";


export default (props) => {
    return (
        <Fragment>
            <select
                id={props.id}
                style={{ width: '100%' }}
                className="CGSELECTCSS"
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            >
                <option value="">Select</option>
                {props.options.map((op, i) => (
                    <option value={op.value}> {op.name}</option>
                ))}
            </select>
        </Fragment>
    );
};



// id={"Type_" + i}
// style={{ width: '100%' }}
// className="line-dropdown-css"
// value={item.Type}
// onChange={(e) => this.updateLineDetail(i, "Type", e)}
// >
// <option value="" >Select</option>
// {APIURLS.POItemType.map((op, i) => (
//     <option value={op.value} > {op.name}</option>

// ))}


