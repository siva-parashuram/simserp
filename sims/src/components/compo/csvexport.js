import React, { Fragment } from 'react';
import CsvDownload from 'react-json-to-csv';
import '../user/dasboard.css';


class csvexport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <CsvDownload
                data={this.props.data}
                filename={this.props.filename}
                className="csvExportComponent"
            >{this.props.buttonName}</CsvDownload>
        )
    }

}
export default csvexport;

