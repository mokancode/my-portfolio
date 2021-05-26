import React, { Component } from "react";
import "./Mobile_Nav_Layout.scss";
import anime from "animejs";
import classnames from "classnames";
import ThreePartLayoutSVG from "./ThreePartLayoutSVG";
import PortfolioIcon from "../../SVGs/MenuIcons/PortfolioIcon/PortfolioIcon";
import AboutIcon from "../../SVGs/MenuIcons/AboutIcon/AboutIcon";
import ContactIcon from "../../SVGs/MenuIcons/ContactIcon/ContactIcon";
import Mobile_Nav_Layout_Letter from "./Mobile_Nav_Layout_Letter";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";

class Mobile_Nav_Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.hideFlareFunc = this.hideFlareFunc.bind(this);
    this.closeMobileNav = this.props.closeMobileNav;
  }

  componentDidMount() {
    console.log("mounted");

    var homeUniqueIDs = [],
      portfolioUniqueIDs = [],
      contactUniqueIDs = [];
    for (var i = 0; i < "home".split("").length; i++) {
      homeUniqueIDs.push(uuidv4());
    }
    for (var i = 0; i < "portfolio".split("").length; i++) {
      portfolioUniqueIDs.push(uuidv4());
    }
    for (var i = 0; i < "contact".split("").length; i++) {
      contactUniqueIDs.push(uuidv4());
    }
    this.setState(
      {
        homeUniqueIDs,
        portfolioUniqueIDs,
        contactUniqueIDs,
      },
      function () {
        var path = anime.path(".splitterPathUpper");

        var animeObjUpper = anime({
          targets: ".flareWrapper_Upper",
          translateX: path("x"),
          translateY: path("y"),
          rotate: path("angle"),
          easing: "easeInOutQuad",
          duration: 2000,
          direction: "reverse",
          loop: false,
          autoplay: false,
        });

        animeObjUpper.seek(2000);
        // animeObjUpper.reverse();

        var path = anime.path(".splitterPathLower");

        var animeObjLower = anime({
          targets: ".flareWrapper_Lower",
          translateX: path("x"),
          translateY: path("y"),
          rotate: path("angle"),
          easing: "easeInOutQuad",
          duration: 2000,
          // direction: "reverse",
          loop: false,
          autoplay: false,
        });

        animeObjLower.seek(1);

        // setTimeout(() => {
        this.setState({
          showFlare: true,
          animeObjUpper,
          animeObjLower,
        });
        // }, 1000);
      }.bind(this)
    );
  }

  componentDidUpdate() {
    const { flareLoaded, animeObjUpper, animeObjLower } = this.state;
    if (flareLoaded && !this.state.flareLoadedAcknowledged) {
      this.setState({ flareLoadedAcknowledged: true, drawLines: true });
      animeObjUpper.play();
      animeObjLower.play();
    }
  }

  hideFlareFunc() {
    this.setState({ hideFlare: true });
  }

  render() {
    const {
      windowHeight,
      showFlare,
      hideFlare,
      animeObjLower,
      animeObjUpper,
      drawLines,
      homeUniqueIDs,
      portfolioUniqueIDs,
      contactUniqueIDs,
    } = this.state;
    const { navbarMobileOpenState } = this.props;

    if (isEmpty(homeUniqueIDs) || isEmpty(portfolioUniqueIDs) || isEmpty(contactUniqueIDs)) return null;

    return (
      <div className="mobileNavLayout">
        <div className="flareWrapper flareWrapper_Upper">
          <div
            className={classnames("mobileNavFlare flareUpper", {
              showFlare: showFlare,
              hideFlare: hideFlare,
            })}
            onTransitionEnd={function () {
              if (showFlare) {
                this.setState({ flareLoaded: true });

                // this.setState({
                //     // showFlare: false,
                //     drawLines: true
                // }, function () {
                //     // animeObjUpper.play();
                // })
              }
            }.bind(this)}
          ></div>
        </div>
        <div className="flareWrapper flareWrapper_Lower">
          <div
            className={classnames("mobileNavFlare flareLower", {
              showFlare: showFlare,
              hideFlare: hideFlare,
            })}
          ></div>
        </div>
        <ThreePartLayoutSVG drawLines={drawLines} hideFlareFunc={this.hideFlareFunc} closeMobileNav={this.closeMobileNav} />

        <div className="mobileNavIconsWrapper">
          <div className="mobileNav_TextWrapper mobileNav_TextWrapper_About">
            <AboutIcon showIcon={hideFlare} forceStopTurbulence={!navbarMobileOpenState} />
            {"Home".split("").map(function (letter, index) {
              return <Mobile_Nav_Layout_Letter key={homeUniqueIDs[index]} letter={letter} index={index} />;
            })}
          </div>

          <div className="mobileNav_TextWrapper mobileNav_TextWrapper_Portfolio">
            <PortfolioIcon showIcon={hideFlare} />
            {"Portfolio".split("").map(function (letter, index) {
              return <Mobile_Nav_Layout_Letter key={portfolioUniqueIDs[index]} letter={letter} index={index} wordIndex={1} />;
            })}
          </div>

          <div className="mobileNav_TextWrapper mobileNav_TextWrapper_Contact">
            <ContactIcon showIcon={hideFlare} />
            {"Contact".split("").map(function (letter, index) {
              return <Mobile_Nav_Layout_Letter key={contactUniqueIDs[index]} letter={letter} index={index} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Mobile_Nav_Layout;
