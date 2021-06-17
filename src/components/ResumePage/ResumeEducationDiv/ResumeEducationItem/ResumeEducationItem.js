import React, { Component } from "react";
import classnames from "classnames";
import isEmpty from "../../../../is-empty";
import styles from "./ResumeEducationItem.module.scss";

class ResumeEducationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { index, extraDelay } = this.props;

    const dateCircleDelay = index * 800 + extraDelay;
    const dateLineDelay = index * 800 + 600 + extraDelay;
    this.setState({ dateCircleDelay, dateLineDelay });

    setTimeout(
      function () {
        this.setState({ show: true });
      }.bind(this),
      10
    );
  }

  render() {
    const { education, index, total } = this.props;
    const { show, dateCircleDelay, dateLineDelay } = this.state;

    return (
      <div
        className={classnames(styles.resumeEducationItem, {
          [styles.show]: show,
        })}
      >
        <div className={styles.dateColumn}>
          <p style={{ transitionDelay: `${dateLineDelay}ms` }}>{education.year}</p>
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

        <div className={styles.educationContent}>
          <div className={styles.educationAchievement}>
            {typeof this.props.education.achievement === "object" ? (
              <div className={styles.MERNStackAchievementOuterWrapper} style={{ transitionDelay: `${dateLineDelay}ms` }}>
                {this.props.education.achievement}
              </div>
            ) : (
              <p style={{ transitionDelay: `${dateLineDelay}ms` }}>{education.achievement}</p>
            )}
          </div>
          <div className={styles.educationSchool}>
            <p style={{ transitionDelay: `${dateLineDelay + (index + 1) * 100}ms` }}>{education.school}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeEducationItem;
