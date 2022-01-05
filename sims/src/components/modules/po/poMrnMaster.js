import React, { Fragment } from 'react';
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import BackdropLoader from "../../compo/backdrop";
import MasterDataGrid from "../../compo/masterdatagrid";

 


class poMrnMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                page: 1,
                rowsPerPage: APIURLS.pagination.rowsPerPage,
            },
            ProgressLoader: false,
            editBtnDisable: true,
            initialCss: "",
            urlparams: "",
            item: null,
            editUrl: null,
            branch:{},
            BranchID: 0,
            columns: APIURLS.poMasterColumn,
            PODataList: [],
            selectionModel: [1],
        }
    }
    componentDidMount() {
        let params=CF.GET_URL_PARAMS();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams =params;
       

            // "?branchId=" +
            // branchId +
            // "&compName=" +
            // compName +
            // "&branchName=" +
            // branchName;
        this.setState({ urlparams: urlparams, BranchID: branchId, editBtnDisable: false }, () => {
            this.getBranchDetail(branchId);
            
        });
    }

    getBranchDetail(branchId) {
        try {
          let ValidUser = APIURLS.ValidUser;
          ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
          ValidUser.Token = getCookie(COOKIE.TOKEN);
          const headers = {
            "Content-Type": "application/json",
          };
    
          const data = {
            validUser: ValidUser,
            branch: {
              BranchId: parseInt(branchId),
            },
          };
    
          let GetBranchUrl = APIURLS.APIURL.GetBranch;
    
          axios
            .post(GetBranchUrl, data, { headers })
            .then((response) => {
              let data = response.data;
              this.setState({ branch: data },()=>{
                this.getPOList();
              });
            })
            .catch((error) => {
              this.setState({ branch: null, ProgressLoader: true });
            });
        } catch (ex) {
          console.log("ex");
        }
      }

    getPOList = () => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.GetPOByBranchID;
        let reqData = {
            ValidUser: ValidUser,
            PurchaseOrder: {
                BranchID: CF.toInt(this.state.BranchID),
                Status:2
            }
        };
        axios
            .post(Url, reqData, { headers })
            .then((response) => {
                let data = response.data;
                console.log("data > ", data);
                let newData = [];  
                           
                for (let i = 0; i < data.length; i++) {
                   
                    if(this.props.isImport===true){
                        if(this.state.branch.IsGIT===true){  
                            if(this.props.isImport===data[i].IsImport){
                                if(data[i].Pick==="PO"){
                                    data[i].id = i + 1;
                                    newData.push(data[i]);
                                }  
                                // if(data[i].Status===2){
                                //     if(data[i].Pick==="PO"){
                                //         data[i].id = i + 1;
                                //         newData.push(data[i]);
                                //     }  
                                // }else{
                                //     if(data[i].Pick==="PO"){
                                //         data[i].id = i + 1;
                                //         newData.push(data[i]);
                                //     }
                                   
                                // }
                                
                            }                           
                        }                    
                    }else{

                        if(this.props.isImport===data[i].IsImport || data[i].Pick==="GIT"){
                            data[i].id = i + 1;
                            newData.push(data[i]);
                        }  
                    } 
                }
                this.setState({ PODataList: newData, ProgressLoader: true }, () => {
                    if (newData.length > 0) {
                        this.handleRowClick([1]);
                    }
                });
            })
            .catch((error) => {
                console.log("Error > ", error);
                this.setState({ PODataList: [], ProgressLoader: true });
            });
    };


    handleRowClick = (e) => {
        try {
            console.log("handleRowClick > e > ", e);
            let index = e[0];
            console.log("handleRowClick > index > ", index);  
            let item = this.state.PODataList[index - 1]; 
            console.log("handleRowClick > item > ", item);          
            let editUrl ="";

            if(this.props.isImport===true){
                if(this.state.branch.IsGIT===true){//consider only if in Branch GIT is true
                    editUrl= URLS.URLS.doPOGIT +
                    this.state.urlparams +
                    "&editPOID=" +
                    item.POID + "&type=edit";
                }else{
                    editUrl= URLS.URLS.doPOMRN +
                    this.state.urlparams +
                    "&editPOID=" +
                    item.POID + "&type=edit";
                }               
            }else{
                if(item.Pick==="GIT"){
                    editUrl= URLS.URLS.doPOMRN +
                    this.state.urlparams +
                    "&editPOID=" +
                    item.POID + "&type=edit"+"&Pick=GIT";
                }
                if(item.Pick==="PO"){
                    editUrl= URLS.URLS.doPOMRN +
                    this.state.urlparams +
                    "&editPOID=" +
                    item.POID + "&type=edit"+"&Pick=PO";
                }
               
            }

           
            console.log("-----------> editUrl > ",editUrl);

          
            
            this.setState({
                item: item,
                editUrl: editUrl,
                selectionModel: index,
            });
        } catch (e) {
            console.log("Error : ", e);
        }
    }

    render() {
        const openPage = (url) => {
            console.log("url > ", url);
            window.location = url;
        };

        const handlePageChange = (event, newPage) => {
            let pagination = this.state.pagination;
            pagination.page = newPage;
            this.setState({ pagination: pagination });
        };
 

        const buttongroupHtml = (
            <Fragment>
                <ButtonGroup
                    size="small"
                    variant="text"
                    aria-label="Action Menu Button group"
                >
                   
                    <Button className="action-btns"
                        startIcon={APIURLS.buttonTitle.add.icon}
                        onClick={(e) =>
                            openPage(this.state.editUrl)
                        }
                        disabled={this.state.PODataList.length>0?this.state.editBtnDisable:true}
                    >
                        {APIURLS.buttonTitle.add.name}
                    </Button>
                </ButtonGroup>
            </Fragment>
        );

        return (
            <Fragment>
                <BackdropLoader open={!this.state.ProgressLoader} />
                <TopFixedRow3
                    breadcrumb={buttongroupHtml}
                    buttongroup={null}
                />

                <Grid container spacing={0}>                
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <Fragment>
                            {console.log("this.state.PODataList > ", this.state.PODataList)}
                            {this.state.PODataList.length > 0 ? (
                                <Fragment>
                                    <MasterDataGrid
                                        selectionModel={this.state.selectionModel}
                                        rows={this.state.PODataList}
                                        columns={this.state.columns}
                                        pagination={this.state.pagination}
                                         disableSelectionOnClick={false}
                                        onSelectionModelChange={(e) => this.handleRowClick(e)}
                                        onPageChange={handlePageChange}
                                    />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {this.state.PODataList.length===0?(
                                        <MasterDataGrid
                                        selectionModel={this.state.selectionModel}
                                        rows={[]}
                                        columns={this.state.columns}
                                        pagination={this.state.pagination}
                                        disableSelectionOnClick={false}
                                        onSelectionModelChange={(e) => this.handleRowClick(e)}
                                        onPageChange={handlePageChange}
                                    />
                                    ):null}
                                    
                                </Fragment>
                                
                            )}
                        </Fragment>
                    </Grid>
                   
                </Grid>

            </Fragment>
        )
    }

}
export default poMrnMaster;

