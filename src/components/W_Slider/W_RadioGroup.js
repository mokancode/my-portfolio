import React, { Component } from "react";
import isEmpty from "../../is-empty";
import "./W_RadioGroup.scss";
import W_RadioItem from "./W_RadioItem";
import { v4 as uuidv4 } from "uuid";

class W_RadioGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      numberOfPages: 0,
    };

    this.setSliderPage = this.props.setSliderPage;
  }

  componentDidMount() {}

  componentDidUpdate() {
    const { numberOfPages } = this.props;
    if (numberOfPages !== this.state.numberOfPages) {
      var pages = [];
      for (var i = 0; i < numberOfPages; i++) {
        pages.push(i);
      }

      var uniqueIDs = [];
      for (var i = 0; i < pages.length; i++) {
        uniqueIDs.push(uuidv4());
      }

      this.setState({ pages, numberOfPages, uniqueIDs });
    }
  }

  render() {
    const { pages, uniqueIDs } = this.state;
    const { currentPage, closeRadioGroup, showRadioGroup, miniWorkItemsStartingPageIndex } = this.props;

    return (
      <div className="w_RadioGroup">
        {!isEmpty(uniqueIDs) &&
          pages.map(
            function (item, index) {
              return (
                <W_RadioItem
                  key={uniqueIDs[index]}
                  item={item}
                  index={index}
                  setSliderPage={this.setSliderPage}
                  currentPage={currentPage}
                  closeRadioGroup={closeRadioGroup}
                  showRadioGroup={showRadioGroup}
                  isMiscPage={index >= miniWorkItemsStartingPageIndex}
                />
              );
            }.bind(this)
          )}

        {/* <div className="radioBtnContainer">
                    <label>
                        <input type="radio" id="female" name="gender" value="female"></input>
                        <div className="customRadioBtn"></div>
                    </label>
                </div>
                <div className="radioBtnContainer">
                    <label>
                        <input type="radio" id="female" name="gender" value="other"></input>
                        <div className="customRadioBtn"></div>
                    </label>
                </div> */}
      </div>
    );
  }
}

export default W_RadioGroup;
