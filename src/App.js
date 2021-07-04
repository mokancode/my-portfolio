import React, { Component } from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import "./App.scss";
import Portfolio from "./components/Portfolio/Portfolio";
import classnames from "classnames";

// Redux
import { connect } from "react-redux";
import { setBgImgLoaded } from "./actions/stylesActions";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { setCurrentPage } from "./actions/navActions";
import { setIsTouchScreen, setMobileMode, setBrowserName, setStarsShowing, setDocumentHasFocus } from "./actions/stylesActions";

import isEmpty from "./validation/is-empty";
import ContactPage from "./components/ContactPage/ContactPage";

import { detect } from "detect-browser";
import FloatingNavbar from "./components/FloatingNavbar/FloatingNavbar";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import NavbarMobile from "./components/Navbar_Mobile/NavbarMobile";
import ResumePage from "./components/ResumePage/ResumePage";
import ResumePageButton from "./components/ResumePage/ResumePageButton/ResumePageButton";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appVer: "1.1.9.2",
    };

    this.documentHasFocusHandler = this.documentHasFocusHandler.bind(this);

    // refs
    this.mainDivRef = React.createRef();
  }

  componentDidMount() {
    if (String(window.location.href).includes("myportfolio-77b3c")) window.location.href = "https://mokancode.com";

    // console.log("appVer: ", this.state.appVer);

    // localStorage.removeItem("W_ImageSliderControlsAcknowledged");

    // Upon mount determine whether device has mobile viewport
    // console.log("isMobileMode navigator userAgent: ", navigator.userAgent);

    const { isMobileMode } = this.props.styles;
    if (
      ((window.innerWidth <= 950 && window.innerHeight <= 450) || (window.innerHeight <= 950 && window.innerWidth <= 450)) &&
      !isMobileMode
    )
      this.props.setMobileMode(true);
    // else if ((window.innerWidth > 950 && window.innerHeight > 450 || window.innerHeight > 950 && window.innerWidth > 450) && isMobileMode)
    //     this.props.setMobileMode(false);

    // Calculate 1/100th of vh (viewport height) value and set in :root in CSS.
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    this.setState({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });

    // Recalculate viewport upon resizing of viewport (the real purpose of this is to detect orientation change).
    // Also, recalculate viewport height for CSS.
    window.addEventListener(
      "resize",
      function (e) {
        // console.log("resized", window.innerWidth);

        // console.log(`mount size w:${window.innerWidth}, h:${window.innerHeight}`);
        this.setState({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });

        const { isMobileMode } = this.props.styles;
        if (
          ((window.innerWidth <= 950 && window.innerHeight <= 450) || (window.innerHeight <= 950 && window.innerWidth <= 450)) &&
          !isMobileMode
        )
          this.props.setMobileMode(true);
        // else if ((window.innerWidth > 950 && window.innerHeight > 450 || window.innerHeight > 950 && window.innerWidth > 450) && isMobileMode)
        //     this.props.setMobileMode(false);

        // Recalculate viewport height for CSS.
        let vh = window.innerHeight * 0.01;
        let vw = window.innerWidth * 0.01;

        // console.log("vh vw", vh * 100, vw * 100);

        document.documentElement.style.setProperty("--vh", `${vh}px`);

        // if (window.innerHeight > window.innerWidth) document.documentElement.style.setProperty('--vh', `${vh}px`);
        // else if (window.innerHeight < window.innerWidth) document.documentElement.style.setProperty('--vh', `${vw}px`);

        // this.setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
      }.bind(this)
    );

    // Determine device orientation on mount
    const { initialOrientationSet } = this.state;
    if (!initialOrientationSet) {
      this.setState({ initialOrientationSet: true });
      if (window.innerWidth > window.innerHeight) this.setState({ deviceOrientation: "landscape" });
      else if (window.innerWidth < window.innerHeight) this.setState({ deviceOrientation: "portrait" });
    }

    // Listen to orientation change
    // var initialOrientationAngle = window.screen.orientation.angle;
    // this.setState({ deviceOrientationAngle: initialOrientationAngle });
    window.addEventListener(
      "orientationchange",
      function (e) {
        // console.log("orientation: ", e.target.screen.orientation.angle);
        this.setState({
          deviceOrientationAngle: e.target.screen.orientation.angle,
        });
        const { deviceOrientation } = this.state;
        if (e.target.screen.orientation.angle === 90 || (e.target.screen.orientation.angle === 270 && deviceOrientation !== "landscape"))
          this.setState({ deviceOrientation: "landscape" });
        else if (e.target.screen.orientation.angle === 0 && deviceOrientation !== "portrait")
          this.setState({ deviceOrientation: "portrait" });
      }.bind(this)
    );

    // Determine if device has a touch screen.
    try {
      document.createEvent("TouchEvent");
      this.props.setIsTouchScreen(true);
      //   console.log("touch true");
    } catch (e) {
      // console.log("touch false");
    }

    // Detect browser
    try {
      const detectBrowser = detect();
      // console.log("detectBrowser: ", detectBrowser);
      this.props.setBrowserName(detectBrowser.name);
    } catch (err) {
      // console.log("detectBrowser err: ", err);
    }

    // window.addEventListener("mousemove", function (e) {
    //     // console.log("mousemove x y", e.clientX, e.clientY);
    //     // this.setState({ currentX: e.clientX, currentY: e.clientY });
    // }.bind(this));

    // Set listener to determine of document (tab) has focus
    document.addEventListener("visibilitychange", this.documentHasFocusHandler);
  }

  documentHasFocusHandler(e) {
    // console.log("visibility:", e.target.visibilityState);
    if (e.target.visibilityState === "visible") this.props.setDocumentHasFocus(true);
    else this.props.setDocumentHasFocus(false);
  }

  // componentWillUnmount() {
  //   document.removeEventListener("visibilitychange", this.documentHasFocusHandler);
  // }

  componentDidUpdate() {
    // console.log("history: ", this.props);

    const currentPagePath = this.props.location.pathname;
    const { currentPage } = this.props.navbar;

    // console.log("currentPagePath", currentPagePath);
    // console.log("currentPage", currentPage);

    // console.log("criteria for notFound",
    //     isEmpty(String(currentPagePath).match(/\blanding\b|\bportfolio\b|\bcontact\b/)),
    //     currentPagePath.length !== 1,
    //     currentPage !== "notFound")

    if (currentPagePath === "/portfolio" && currentPage !== "portfolio") {
      // console.log("history portfolio");
      setTimeout(
        function () {
          this.props.setCurrentPage("portfolio");
        }.bind(this),
        10
      );
    } else if (currentPagePath === "/" && currentPage !== "landing") {
      // console.log("history landing");
      setTimeout(
        function () {
          this.props.setCurrentPage("landing");
        }.bind(this),
        10
      );
    } else if (currentPagePath === "/contact" && currentPage !== "contact") {
      // console.log("history contact");
      setTimeout(
        function () {
          this.props.setCurrentPage("contact");
        }.bind(this),
        10
      );
    } else if (currentPagePath === "/resume" && currentPage !== "resume") {
      // console.log("history resume");
      setTimeout(
        function () {
          this.props.setCurrentPage("resume");
        }.bind(this),
        10
      );
    } else if (
      isEmpty(String(currentPagePath).match(/\blanding\b|\bportfolio\b|\bcontact\b|\bresume\b/)) &&
      currentPagePath.length !== 1 &&
      currentPage !== "notFound"
    ) {
      setTimeout(
        function () {
          this.props.setCurrentPage("notFound");
        }.bind(this),
        10
      );
      // console.log("currentPage is notFound");
    }
  }

  render() {
    const { particlesReveal, deviceOrientation } = this.state;
    const { bgImgLoaded, portfolioReadyToLoad, isMobileMode, browserName, w_Item_Full_WrapperShadowRedux, miscWorkItemShadowRedux } =
      this.props.styles;
    const { currentPage } = this.props.navbar;

    return (
      <div
        className={classnames("mainAppContainer", {
          isTouchScreen: this.props.styles.isTouchScreen,
          deviceOrientationPortrait: deviceOrientation === "portrait",
          deviceOrientationLandscape: deviceOrientation === "landscape",
          isMobileMode: isMobileMode,
          browserNotChrome: browserName !== "chrome",
        })}
        ref={this.mainDivRef}
      >

        {/* <Link to="asd" id="linkToNowhere">Link</Link> */}
        {/* <p className="testText">{`X: ${this.state.currentX}, Y: ${this.state.currentY}`}</p> */}
        {/* <p className="testText">{`W: ${this.state.innerWidth}, H: ${this.state.innerHeight}`}</p> */}

        <div className="appVerWrapper">
          <p className="appVerText">v{`${this.state.appVer}`}</p>
        </div>

        {/* <p className="testText">{`o: ${this.state.deviceOrientation} ${this.state.deviceOrientationAngle}`}</p> */}

        {/* {isMobileMode ?  */}
        {/* <p className="mobileSiteInProgress">Site is in development</p> */}
        {/* : null} */}

        <div
          className={classnames("pageBackgrounds", {
            currentPageHome: currentPage === "landing",
            currentPagePortfolio: currentPage === "portfolio",
            currentPageContact: currentPage === "contact",
            currentPageNotFound: currentPage === "notFound",
          })}
        >
          <div className="homePageBG"></div>
          <div className="contactPageBG"></div>
          <div className="portfolioPageBG"></div>
          <div className="notFoundPageBG"></div>
        </div>

        <ResumePageButton />

        <div
          className={classnames("starsBgWrapper", {
            showStars: this.state.showStars,
          })}
          onAnimationEnd={function () {
            this.props.setStarsShowing();
          }.bind(this)}
        >
          {window.innerWidth <= 800 ? (
            <img
              onLoad={function (e) {
                this.setState({ showStars: true });
                this.props.setBgImgLoaded(true);
              }.bind(this)}
              className="starsBg"
              src="./images/starsBright.png"
              alt="starsBrightBackground"
            ></img>
          ) : (
            <img
              onLoad={function (e) {
                this.setState({ showStars: true });
                this.props.setBgImgLoaded(true);
              }.bind(this)}
              className="starsBg"
              src="./images/stars.png"
              alt="starsBackground"
            ></img>
          )}
        </div>

        {/* Navbar and routes must wait for stars image to load first */}

        {bgImgLoaded ? <div className="mainNavbarContainer">{isMobileMode ? <NavbarMobile /> : <FloatingNavbar />}</div> : null}

        {bgImgLoaded ? (
          <TransitionGroup className="transition-group">
            <CSSTransition key={this.props.location.key} timeout={{ enter: 1000, exit: 3000 }} classNames="pageSwitching">
              <div className="routesContainer">
                <Switch location={this.props.location}>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/resume" component={ResumePage} />
                  <Route
                    exact
                    path="/portfolio"
                    render={function (props) {
                      return <Portfolio {...props} />;
                    }}
                  />
                  <Route
                    exact
                    path="/contact"
                    render={function (props) {
                      return <ContactPage {...props} />;
                    }}
                  />
                  <Route path="*" component={PageNotFound} />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
    navbar: state.navbar,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    setBgImgLoaded,
    setCurrentPage,
    setIsTouchScreen,
    setMobileMode,
    setBrowserName,
    setStarsShowing,
    setDocumentHasFocus,
  })(App)
);
