import React, { Component } from "react";
import "./NavbarItemText2.css";
import NavbarItemTextSingle from "./NavbarItemTextSingle";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";

export class NavbarItemText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { itemName } = this.props;

    // console.log("item name:", itemName);

    var itemNameLetters = itemName.split("");
    // var itemNameLetters = itemName.split(new RegExp(""));
    // console.log("letters: ", itemNameLetters);

    var uniqueIDs = [];

    for (var i = 0; i < itemNameLetters.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  render() {
    const { itemName, itemIndex, animateHue } = this.props;
    const { uniqueIDs } = this.state;

    var itemNameLetters = itemName.split("");

    return (
      <div className="navbarItemTextDiv">
        {!isEmpty(uniqueIDs) &&
          itemNameLetters.map(
            function (letter, index) {
              return (
                <NavbarItemTextSingle
                  key={uniqueIDs[index]}
                  letter={letter}
                  itemIndex={index}
                  wordIndex={itemIndex}
                  animateHue={animateHue}
                />
              );
            }.bind(this)
          )}
        {/* <p className="navbarItemName">{itemName}</p> */}
      </div>
    );
  }
}

export default NavbarItemText;
