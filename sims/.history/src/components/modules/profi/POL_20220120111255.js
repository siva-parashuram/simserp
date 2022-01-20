import React, { Fragment } from "react";
import * as APIURLS from "../../../routes/apiconstant";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import CGINPUT from "../../compo/specialcompo/custominputbox";
import CGSELECT from "../../compo/specialcompo/customselectbox";

import SCSI from "../../compo/customswitchinput";
import SCADI from "../../compo/customautocompletecomponent";

class POL extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                {console.log("props > ", this.props)}
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <table id="no-space-table" className="table">
                            <thead>
                                <tr>
                                    <th className="line-table-header2-font td-width" align="left">&nbsp;</th>
                                    <th className="line-table-header2-font td-width" align="left">Type</th>
                                    <th className="line-table-header2-font td-width" align="left">Category</th>
                                    <th className="line-table-header2-font" style={{ width: 150, minWidth: 150 }} align="left">Item</th>
                                    <th className="line-table-header2-font td-width" align="left">Desc</th>
                                    <th className="line-table-header2-font td-width" align="left">Pack.Desc</th>
                                    <th className="line-table-header2-font td-width" align="left">Cust.Code</th>
                                    <th className="line-table-header2-font td-width" align="left">UOM</th>
                                    <th className="line-table-header2-font td-width" align="right">Tolerance %</th>
                                    <th className="line-table-header2-font td-width" align="right">Quantity </th>
                                    <th className="line-table-header2-font td-width" align="right">Unit Price </th>
                                    <th className="line-table-header2-font td-width" align="right">Disc %</th>
                                    <th className="line-table-header2-font " style={{ width: 150, minWidth: 150 }} align="left">Item Posting Group </th>
                                    <th className="line-table-header2-font td-width" align="left">HSN </th>
                                    {this.props.state.Branch.IsVAT === true ? (
                                        <th className="line-table-header2-font td-width" align="right">VAT % </th>
                                    ) : null}
                                    {
                                        this.props.state.Branch.IsGST === true ? (
                                            <Fragment>
                                                <th className="line-table-header2-font td-width" align="left">GST Group </th>
                                                <th className="line-table-header2-font td-width" align="right"> GST %</th>
                                            </Fragment>
                                        ) : null
                                    }
                                    {this.props.state.Branch.IsLot === true ? (
                                        <th className="line-table-header2-font td-width" align="right">Is Lot? </th>
                                    ) : null}

                                </tr>
                            </thead>
                            <tbody>
                                {this.props.state.ProformaInvoiceLine ? this.props.state.ProformaInvoiceLine.map((item, i) => (
                                    <tr className={item.isDataProper === true ? "lineSelectedRow" : "selectedRowError"}>
                                        <td>
                                            <ButtonGroup
                                                size="small"
                                                variant="text"
                                                aria-label="Action Menu Button group"
                                            >
                                                <DeleteForeverIcon
                                                    fontSize="small"
                                                    style={{
                                                        color: '#e53935'
                                                    }}
                                                    onClick={(e) => this.props.itemDelete(i, item)}
                                                />

                                                {
                                                    (i + 1) === this.props.state.ProformaInvoiceLine.length ? (
                                                        <Fragment>
                                                            <AddCircleOutlineIcon
                                                                fontSize="small"
                                                                style={{
                                                                    color: '#00897b',
                                                                    marginLeft: 10
                                                                }}
                                                                onClick={(e) => this.props.createBlankLine()}
                                                            />
                                                        </Fragment>
                                                    ) : null
                                                }

                                            </ButtonGroup>
                                        </td>
                                        <td>
                                            <CGSELECT
                                                id={"Type" + i}
                                                options={APIURLS.POItemType}
                                                onChange={(e) => {
                                                    document.getElementById("Type" + i).value = e.target.value;
                                                    this.props.updatePILStateOnBlur("Type", i, parseInt(e.target.value));
                                                }}


                                            />
                                        </td>

                                        <td>
                                            <CGSELECT
                                                id={"CategoryID" + i}
                                                options={item.categoryList}
                                                disabled={parseInt(item.Type) === 0 ? false : true}
                                                onChange={(e) => {
                                                    document.getElementById("CategoryID" + i).value = e.target.value;
                                                    this.props.updatePILStateOnBlur("CategoryID", i, parseInt(e.target.value), item);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <SCADI
                                                style={{ width: '100%' }}
                                                id={"TypeID" + i}
                                                value={item.selectitemListObj}
                                                options={item.itemList}
                                                isMandatory={true}
                                                onChange={(e, value) => {
                                                    this.props.updatePILStateOnBlur("TypeID", i, value, item);

                                                }}
                                            />
                                        </td>
                                        <td>
                                            <CGINPUT
                                                id={"desc" + i}
                                                type="text"
                                                value={item.desc}
                                            />
                                        </td>
                                        <td>
                                            <CGINPUT
                                                id={"packDesc" + i}
                                                type="text"
                                                value={item.packDesc}
                                            />
                                        </td>
                                        <td>
                                            <CGINPUT
                                                id={"CustomerCode" + i}
                                                type="text"
                                                onChange={(e) => {
                                                    document.getElementById("CustomerCode" + i).value = e.target.value;
                                                }}
                                                onBlur={(e) => {
                                                    this.props.updatePILStateOnBlur("CustomerCode", i, e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <CGSELECT
                                                id={"UOMID" + i}
                                                onChange={(e) => {
                                                    document.getElementById("UOMID" + i).value = e.target.value;
                                                }}
                                                onBlur={(e) => {
                                                    this.props.updatePILStateOnBlur("UOMID", i, e.target.value);
                                                }}
                                                options={this.props.state.UOMList}
                                            />
                                        </td>
                                        <td>
                                            <CGINPUT
                                                id={"TolerancePercentage" + i}
                                                type="number"
                                                onChange={(e) => {
                                                    document.getElementById("TolerancePercentage" + i).value = e.target.value;
                                                }}
                                                onBlur={(e) => {
                                                    this.props.updatePILStateOnBlur("TolerancePercentage", i, e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <CGINPUT
                                                id={"Quantity" + i}
                                                type="number"
                                                onChange={(e) => {
                                                    document.getElementById("Quantity" + i).value = e.target.value;
                                                }}
                                                onBlur={(e) => {
                                                    this.props.updatePILStateOnBlur("Quantity", i, e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <CGINPUT
                                                id={"Price" + i}
                                                type="number"
                                                onChange={(e) => {
                                                    document.getElementById("Price" + i).value = e.target.value;
                                                }}
                                                onBlur={(e) => {
                                                    this.props.updatePILStateOnBlur("Price", i, e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <CGINPUT
                                                id={"LineDiscPercentage" + i}
                                                type="number"
                                                onChange={(e) => {
                                                    document.getElementById("LineDiscPercentage" + i).value = e.target.value;
                                                }}
                                                onBlur={(e) => {
                                                    this.props.updatePILStateOnBlur("LineDiscPercentage", i, e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <CGSELECT
                                                id={"ItemPostingGroupID" + i}
                                                onChange={(e) => {
                                                    document.getElementById("ItemPostingGroupID" + i).value = e.target.value;
                                                }}
                                                onBlur={(e) => {
                                                    this.props.updatePILStateOnBlur("ItemPostingGroupID", i, e.target.value);
                                                }}
                                                options={this.props.state.ItemPostingGroupList}

                                            />
                                        </td>
                                        <td>
                                            <CGINPUT
                                                id={"HSNCode" + i}
                                                type="text"
                                                onChange={(e) => {
                                                    document.getElementById("HSNCode" + i).value = e.target.value;
                                                }}
                                                onBlur={(e) => {
                                                    this.props.updatePILStateOnBlur("HSNCode", i, e.target.value);
                                                }}
                                            // value={item.HSNCode}
                                            />
                                        </td>
                                        {this.props.state.Branch.IsVAT === true ? (
                                            <td>
                                                <CGINPUT
                                                    id={"VATPercentage" + i}
                                                    type="number"
                                                    value={item.VATPercentage}
                                                    disabled={true}
                                                />
                                            </td>
                                        ) : null}
                                        {
                                            this.props.state.Branch.IsGST === true ? (
                                                <Fragment>
                                                    <td>
                                                        <CGSELECT
                                                            id={"GSTGroupID" + i}
                                                            onChange={(e) => {
                                                                document.getElementById("GSTGroupID" + i).value = e.target.value;
                                                                this.props.updatePILStateOnBlur("GSTGroupID", i, e.target.value);
                                                            }}

                                                            options={this.props.state.GSTGROUPList}
                                                        />
                                                    </td>
                                                    <td>
                                                        <CGINPUT
                                                            id={"GSTPercentage" + i}
                                                            type="number"
                                                            value={item.GSTPercentage}
                                                            disabled={true}
                                                        />
                                                    </td>
                                                </Fragment>
                                            ) : null
                                        }

                                        {this.props.state.Branch.IsLot === true ? (
                                            <td>
                                                <SCSI
                                                    key={"IsLot" + i}
                                                    id={"IsLot" + i}
                                                    param={item.IsLot}
                                                    onChange={(e) => {
                                                        this.props.updatePILStateOnBlur("IsLot", i, e.target.checked);
                                                    }}
                                                />
                                            </td>
                                        ) : null}
                                    </tr>
                                )) : null}
                            </tbody>
                        </table>


                    </Grid>
                </Grid>

                <Dialog
                    className="dialog-prompt-activity"
                    open={this.props.status.DialogStatus}
                    onClose={() => this.props.handleDialogClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" className="dialog-area">
                        <span style={{ color: 'red' }}>Line Delete Request</span>
                    </DialogTitle>
                    <DialogContent className="dialog-area">
                        <DialogContentText id="alert-dialog-description">
                            {"Do you want to delete this Line ?"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="dialog-area">
                        <Button onClick={() => this.props.handleDialogClose()}>No</Button>
                        <Button onClick={() => this.props.deleteSelectedItem()} >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
export default POL;