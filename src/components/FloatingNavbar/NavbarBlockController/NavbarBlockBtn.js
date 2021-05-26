import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import isEmpty from "../../../validation/is-empty";
import AboutIcon from "../../SVGs/MenuIcons/AboutIcon/AboutIcon";
import ContactIcon from "../../SVGs/MenuIcons/ContactIcon/ContactIcon";
import PortfolioIcon from "../../SVGs/MenuIcons/PortfolioIcon/PortfolioIcon";
import NavbarItemText from "../NavbarItemText/NavbarItemText";

class NavbarBlockBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.returnNavbar = this.props.returnNavbar;
  }

  componentDidUpdate() {
    if (this.props.navbarIsShowingInPosition === true && isEmpty(this.state.navbarIsShowingInPosition))
      this.setState({ navbarIsShowingInPosition: true });
    else if (this.props.navbarIsShowingInPosition === false && this.state.navbarIsShowingInPosition === true) {
      this.setState({ navbarIsShowingInPosition: false });
    }
  }

  render() {
    const { link, index } = this.props;
    const { navbarIsShowingInPosition } = this.state;

    return (
      <div className="navbarBtn">
        <div className="navbarBtnSides">
          <div className="btnSide front">
            {/* <div className="element"></div> */}
            {index === 1 && navbarIsShowingInPosition ? <AboutIcon showIcon={true} /> : null}
            {index === 1 ? <NavbarItemText itemIndex={0} itemName="Home" animateHue={navbarIsShowingInPosition} /> : null}

            {index === 2 && navbarIsShowingInPosition ? <PortfolioIcon showIcon={true} /> : null}
            {index === 2 ? <NavbarItemText itemIndex={1} itemName="Portfolio" animateHue={navbarIsShowingInPosition} /> : null}

            {index === 3 && navbarIsShowingInPosition ? <ContactIcon showIcon={true} /> : null}
            {index === 3 ? <NavbarItemText itemIndex={2} itemName="Contact" animateHue={navbarIsShowingInPosition} /> : null}

            <Link
              to={`/${link}`}
              tabIndex={-1}
              onClick={function () {
                this.returnNavbar();
              }.bind(this)}
            ></Link>
          </div>

          <div className="btnSide leftWrapper">
            <div className="btnSide left"></div>
          </div>

          <div className="btnSide bottomWrapper">
            <div className="btnSide bottom"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavbarBlockBtn);
