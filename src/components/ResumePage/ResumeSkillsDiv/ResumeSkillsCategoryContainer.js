import React, { Component } from "react";
import ResumeSkillItem from "./ResumeSkillItem/ResumeSkillItem";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";

class ResumeSkillsCategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { categoryItem } = this.props;
    var uniqueIDs = [];
    for (var i = 0; i < categoryItem.skills.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  render() {
    const { skillsList, categoryItem, categoryIndex, show } = this.props;
    const { uniqueIDs } = this.state;

    return (
      <div className="skillsCategoryContainer">
        <p className="categoryName" style={{ transitionDelay: `${skillsList[categoryIndex].delay}ms` }}>
          {categoryItem.category}:{" "}
        </p>
        <ul className="skillsList">
          {!isEmpty(uniqueIDs) &&
            categoryItem.skills.map(function (skill, index) {
              return (
                <li key={uniqueIDs[index]}>
                  <ResumeSkillItem
                    pointerName={skill.pointerName}
                    name={skill.name}
                    icon={skill.img}
                    index={index}
                    categoryIndex={categoryIndex}
                    show={show}
                    extraDelay={skillsList[categoryIndex].delay}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default ResumeSkillsCategoryContainer;
