import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './WorkItemLink.module.scss';

class WorkItemLink extends Component {
    render() {

        const { extend, link, freeHosting } = this.props;

        return (
            <div className={classnames(styles.workItemLinkWrapper, {
                [styles.extend]: extend
            })}>
                <div className={styles.linkConnectorContainer}>
                    <div className={styles.linkConnector}></div>
                    <div className={styles.linkConnector}></div>
                </div>
                <div className={styles.linkBox}>
                    <p>Visit site</p>
                    <a href={link}
                        target="_blank" rel="noopener noreferrer"
                    ></a>
                    {/* <Link to={link} target="_blank" /> */}
                    {freeHosting ? <p className={styles.freeHostingNotification}>* Hosted on a free tier - please allow a few seconds to load</p> : null}
                </div>
            </div>
        );
    }
}

export default WorkItemLink;