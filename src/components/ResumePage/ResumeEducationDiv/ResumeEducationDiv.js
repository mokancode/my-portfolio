import React, { Component } from "react";
import ResumeHeader from "../ResumeHeader/ResumeHeader";
import "./ResumeEducationDiv.css";
import ResumeEducationItem from "./ResumeEducationItem/ResumeEducationItem";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";
import MERNStack from "./MERNStack/MERNStack";

class ResumeEducationDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationList: [
        {
          achievement: "Full-stack web development - Next.js",
          school: "Self-taught",
          year: "2021",
        },
        {
          achievement: (
            <div className="MERNStackAchievementWrapper">
              <p>Full-stack web development -</p>
              <MERNStack />
            </div>
          ),
          school: "Self-taught",
          year: "2018-2021",
        },
        {
          achievement: "Bachelor of Arts in Computer Science",
          school: "CUNY Queens College, NY",
          year: "2018",
        },
      ],
    };
  }

  componentDidMount() {
    const { educationList } = this.state;
    var uniqueIDs = [];
    for (var i = 0; i < educationList.length; i++) {
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
    const { show, educationList, uniqueIDs } = this.state;

    return (
      <div className="resumeEducationDiv">
        <ResumeHeader text="Education" show={show} />

        <div className="resumeEducationItemsList">
          {!isEmpty(uniqueIDs) &&
            educationList.map(function (edItem, index) {
              return (
                <ResumeEducationItem
                  key={uniqueIDs[index]}
                  education={edItem}
                  total={educationList.length}
                  index={index}
                  extraDelay={7000}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default ResumeEducationDiv;
