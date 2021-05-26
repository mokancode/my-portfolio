import React, { Component } from "react";
import ResumeHeader from "../ResumeHeader/ResumeHeader";
import styles from "./ProjectsDiv.module.scss";
import ResumeProjectItem from "./ResumeProjectItem";
import projects from "./ResumeProjectsList";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";

class ProjectsDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var uniqueIDs = [];
    for (var i = 0; i < projects.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  componentDidUpdate() {
    if (this.props.resumeRaised && !this.state.show)
      setTimeout(
        function () {
          this.setState({ show: true });
        }.bind(this),
        10
      );
  }

  render() {
    const { show, uniqueIDs } = this.state;

    return (
      <div className={styles.projectsDiv}>
        <ResumeHeader text="Recent Projects" show={show} />
        <ul className={styles.projectsList}>
          {!isEmpty(uniqueIDs) &&
            projects.map(function (project, index) {
              return <ResumeProjectItem key={uniqueIDs[index]} project={project} index={index} total={projects.length} extraDelay={7000} />;
            })}
        </ul>
        <div className={styles.borders}>
          <div className={styles.left}></div>
          <div className={styles.right}></div>
          <div className={styles.bottom}></div>
        </div>
      </div>
    );
  }
}

export default ProjectsDiv;
