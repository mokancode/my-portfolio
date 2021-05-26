import React, { Component } from 'react';
import classnames from 'classnames';
import './WorkItemTitle.scss';
import './WorkitemTitleMobile.css';
import WorkItemTitleLetters from './WorkItemTitleLetters';
import isEmpty from '../../../../validation/is-empty';
import WorkItemTitleWhole from './WorkItemTitleWhole';

class WorkItemTitle extends Component {
    constructor(props) {
        super(props);

        this.closeWorkItemFunc = this.props.closeWorkItemFunc;
    }

    render() {

        const { title, titleSubheader, showTitle, hideTitle, closeWorkItem, isMobileMode, browserName, opacityOff } = this.props;

        return (
            <div className={classnames("titleAndSubheader", {
                // "titleAndSubheaderShow": true
                "titleSubheaderExists": !isEmpty(titleSubheader)
                , "opacityOff": opacityOff
            })}>
                {isMobileMode
                    || browserName !== "chrome"
                    ?
                    <WorkItemTitleWhole
                        title={title}
                        showTitle={showTitle}
                        hideTitle={hideTitle}
                        closeWorkItemFunc={this.closeWorkItemFunc}
                        isMobileMode={isMobileMode}
                        browserName={browserName} />
                    :
                    <WorkItemTitleLetters
                        title={title}
                        showTitle={showTitle}
                        hideTitle={hideTitle}
                        closeWorkItemFunc={this.closeWorkItemFunc}
                        isMobileMode={isMobileMode}
                        browserName={browserName} />
                }
                {titleSubheader ? <p className={classnames("titleSubheader", {
                    "hideSubTitle": hideTitle || closeWorkItem
                    , "showSubTitle": showTitle
                })}>{titleSubheader}</p> : null}
            </div>
        );
    }
}

export default WorkItemTitle;