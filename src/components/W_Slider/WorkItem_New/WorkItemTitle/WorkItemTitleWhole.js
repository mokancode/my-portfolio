import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { setWIImageLoaded } from '../../../../actions/stylesActions';
// import WorkItemTitleLetter from './WorkItemTitleLetter';

class WorkItemTitleWhole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTitle: false
        };

        this.closeWorkItemFunc = this.props.closeWorkItemFunc;
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        const { showTitle } = this.props;
        if (showTitle && !this.state.showTitle)
            this.setState({ showTitle: true }, function () {
                setTimeout(function () {
                    this.setState({ assembleTitle: true });
                }.bind(this), 50);
            });
    }

    render() {

        const { title, firstLoad, hideTitle, isMobileMode, browserName } = this.props;
        const { showTitle, assembleTitle, titleDisplayOff, showTextShadow } = this.state;

        return (
            <div className={classnames("workItemTitle workItemTitleWhole", {
                "hideWorkItemTitle": titleDisplayOff
            })}>
                {showTitle ?
                    <p className={classnames("workItemTitleLetter", {
                        "workItemTitleLetterShow": assembleTitle
                        , "workItemTitleLetterHide": hideTitle && !(isMobileMode || browserName !== "chrome")
                        , "showTextShadow": showTextShadow
                    })}
                        onTransitionEnd={function () {
                            if (assembleTitle) {
                                this.props.setWIImageLoaded(true);
                                if ((browserName !== "chrome" || isMobileMode) && !showTextShadow) {
                                    // console.log("showTextShadow");
                                    this.setState({ showTextShadow: true });
                                }
                            }

                            if (hideTitle) {
                                this.closeWorkItemFunc(true, false);
                                this.setState({ titleDisplayOff: true });
                            }
                        }.bind(this)}
                    >{title}</p>
                    : null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        styles: state.styles
    }
}

export default connect(mapStateToProps, { setWIImageLoaded })(WorkItemTitleWhole);
// export default WorkItemTitleWhole;