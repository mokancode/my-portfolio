import React, { Component } from "react";
import styles from "./ResumeProjectItem.module.scss";
import classnames from "classnames";
import isEmpty from "../../../is-empty";
import { v4 as uuidv4 } from "uuid";

class ResumeProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var frontEndIDs = [],
      backEndIDs = [],
      thingsLearnedIDs = [];

    const { project } = this.props;

    for (var i = 0; i < project.frontEnd.length; i++) {
      frontEndIDs.push(uuidv4());
    }

    if (project.backEnd)
      for (var i = 0; i < project.backEnd.length; i++) {
        backEndIDs.push(uuidv4());
      }

    if (project.thingLearnedOrAchieved)
      for (var i = 0; i < project.thingsLearnedOrAchieved.length; i++) {
        thingsLearnedIDs.push(uuidv4());
      }

    this.setState({ frontEndIDs, backEndIDs, thingsLearnedIDs });

    const { index, extraDelay } = this.props;

    const dateCircleDelay = index * 1200 + extraDelay;
    const dateLineDelay = index * 1200 + 600 + extraDelay;
    this.setState({ dateCircleDelay, dateLineDelay });

    setTimeout(
      function () {
        this.setState({ show: true });
      }.bind(this),
      10
    );
  }

  render() {
    const { project, index, total } = this.props;
    const { show, dateCircleDelay, dateLineDelay, frontEndIDs, backEndIDs, thingsLearnedIDs } = this.state;

    return (
      <div
        className={classnames(styles.resumeProjectItem, {
          [styles.show]: show,
        })}
      >
        <div className={styles.dateColumn}>
          <p style={{ transitionDelay: `${dateLineDelay}ms` }}>{project.dateFinished}</p>
          <div className={styles.circleAndConnectorLine}>
            <div className={styles.circle} style={{ transitionDelay: `${dateCircleDelay}ms` }}></div>
            <div
              className={classnames(styles.connectorLine, {
                [styles.lastOne]: index === total - 1,
              })}
              style={{ transitionDelay: `${dateLineDelay}ms` }}
            ></div>
          </div>
        </div>
        <div className={styles.projectContent}>
          <a className={styles.projectName} href={project.url} target="_blank" style={{ transitionDelay: `${dateCircleDelay}ms` }}>
            {project.name} {project.workInProgress ? <span>(W.I.P.)</span> : null}
          </a>
          {/* <h1 className="projectName" href={project.url} target="_blank"
                        style={{ transitionDelay: `${dateCircleDelay}ms` }}>{project.name} {project.workInProgress ? <span>(W.I.P.)</span> : null}</h1> */}
          <div className={styles.stackFrontAndBackEndWrapper}>
            {!isEmpty(project.stack) ? (
              <p className={styles.stack} style={{ transitionDelay: `${dateCircleDelay + 500}ms` }}>
                {project.stack}
              </p>
            ) : null}

            <div className={styles.frontAndBackEndWrapper}>
              <div className={styles.frontEndDiv}>
                <p style={{ transitionDelay: `${dateLineDelay + 200}ms` }}>Front-end:</p>
                <ul className={styles.frontEndList}>
                  {!isEmpty(frontEndIDs) &&
                    project.frontEnd.map(function (item, index) {
                      return (
                        <li key={frontEndIDs[index]} style={{ transitionDelay: `${dateLineDelay + index * 200 + 300}ms` }}>
                          <p>{item}</p>
                        </li>
                      );
                    })}
                </ul>
              </div>
              {project.backEnd ? (
                <div className={styles.backEndDiv}>
                  <p style={{ transitionDelay: `${dateLineDelay + 1000}ms` }}>Back-end:</p>
                  <ul className={styles.backEndList}>
                    {!isEmpty(backEndIDs) &&
                      project.backEnd.map(function (item, index) {
                        return (
                          <li key={backEndIDs[index]} style={{ transitionDelay: `${dateLineDelay + index * 200 + 1000}ms` }}>
                            <p>{item}</p>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <p className={styles.projectDescription} style={{ transitionDelay: `${dateLineDelay + 1000}ms` }}>
            {project.description}
          </p>
          {!isEmpty(project.thingsLearnedOrAchieved) ? (
            <ul className={styles.thingLearnedOrAchievedList}>
              {!isEmpty(thingsLearnedIDs) &&
                project.thingsLearnedOrAchieved.map(function (thing, index) {
                  return (
                    <li
                      key={thingsLearnedIDs[index]}
                      style={{
                        transitionDelay: `${dateLineDelay + index * 200 + 1500}ms`,
                        animationDelay: `${index * 200}ms`,
                      }}
                    >
                      <p>{thing}</p>
                    </li>
                  );
                })}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ResumeProjectItem;
