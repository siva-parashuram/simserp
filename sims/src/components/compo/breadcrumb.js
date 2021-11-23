import React, { Fragment } from 'react';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import '../user/dasboard.css';


class breadcrumb1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {

        return (
            <Fragment>
                <div >
                    {this.props.level === 1 ? (
                        <Breadcrumbs
                            className="style-breadcrumb"
                            aria-label="breadcrumb"
                        >
                            <Link
                                color="inherit"
                                className="backLink"
                                onClick={this.props.backOnClick}
                            >
                                Back
                            </Link>
                            <Link
                                color="inherit"
                                href={this.props.linkHref}
                            >
                                {this.props.linkTitle}
                            </Link>
                            <Typography color="textPrimary">{this.props.typoTitle}</Typography>
                        </Breadcrumbs>
                    ) : (
                        <Breadcrumbs
                            className="style-breadcrumb"
                            aria-label="breadcrumb"
                        >
                            <Link
                                color="inherit"
                                className="backLink"
                                onClick={this.props.backOnClick}
                            >
                                Back
                            </Link>
                            <Link
                                color="inherit"
                                href={this.props.linkHref}
                            >
                                {this.props.linkTitle}
                            </Link>
                            <Link
                                color="inherit"
                                href={this.props.masterHref}
                            >
                                {this.props.masterLinkTitle}
                            </Link>
                            <Typography color="textPrimary">{this.props.typoTitle}</Typography>
                        </Breadcrumbs>
                    )}
                </div>


            </Fragment>
        )
    }

}
export default breadcrumb1;

