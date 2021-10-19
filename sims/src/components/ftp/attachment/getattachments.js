import '../../../components/user/dasboard.css'; 
import React, { Fragment } from 'react'; 
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FilePresentIcon from '@mui/icons-material/FilePresent';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
 


class attachmentmaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            e:null,
            item:null,
            AlertDialog:false
        };
    }

    render() {
        const handleDelete=(e,item)=>{
              this.setState({e:e,item:item,AlertDialog:true});
        }

        const processDelete=(e,item)=>{
           document.getElementById("file"+item.id).style.display='none';
        }

        const handleClick=(e,item)=>{
            var a = document.createElement('a');    
            a.id="attachment_"+item.name;        
            a.href =item.link;
            a.download=item.name;
            a.click();
        }

        const CloseAlertDialog=()=>{
             this.setState({AlertDialog:false});
        }
        const CloseAlertDialogAndProcess=()=>{
            this.setState({AlertDialog:false});
            processDelete(this.state.e,this.state.item);
       }        

        return (
            <Fragment>
                <Grid container spacing={0}>
                    <Grid xs={11} sm={11} md={11} lg={11}>
                        {console.log("-----------------> this.props.filelist > ",this.props.filelist)}
                        <Table size="small">
                        <TableBody className="tableBody">
                        {this.props.filelist ? this.props.filelist.map((item, i) => (
                            
                            <TableRow>
                                <TableCell align="left">
                                    <span className="avatar-hover" onClick={(e) => handleClick(e, item)}> {item.fileName} </span> <br/>
                                    <span style={{ color: '#b0bec5' }}>{"Uploaded on " + item.modifiedDateTime}</span>
                                </TableCell>
                                <TableCell align="left">
                                    <IconButton size="small" edge="end" aria-label="delete">
                                        <DeleteIcon fontSize="small" style={{ color: '#f44336' }} onClick={(e) => handleDelete(e, item)} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                             
                        )) : null}
                         </TableBody>
                        </Table>
                    </Grid>
                </Grid>


                <Dialog
                    open={this.state.AlertDialog}
                    onClose={(e)=>CloseAlertDialog()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You want to delete this attachment?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={(e)=>CloseAlertDialog()}>No</Button>
                        <Button onClick={(e)=>CloseAlertDialogAndProcess()} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        )
    }
}
export default attachmentmaster;