import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./Portfolio.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { setLoadingScreen } from "../../actions/navActions";
import { setPortfolioReady, setPortfolioDestroyWelcome, setPageVisited } from "../../actions/stylesActions";

import FadedBlocks from "../SVGs/FadedBlock/FadedBlocks";
import MirrorCarouselController from "../MirrorCarousel/MirrorCarouselController";
import BackgroundWaves from "../SVGs/PortfolioWaves/BackgroundWaves";

export class Portfolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: "WELCOME",
      // showWorkItemsContainer: true
      dy: 2,
      dx: 3,
    };

    this.finishedMyWorksTextAnim = this.finishedMyWorksTextAnim.bind(this);
    this.showWorkItemsContainerHandler = this.showWorkItemsContainerHandler.bind(this);
    this.fadedBlockReadyHandler = this.fadedBlockReadyHandler.bind(this);

    // refs
    this.portfolioRef = React.createRef();
    this.workItemsWrapperRef = React.createRef();
    this.mywoItemsWrapperksRef = React.createRef();
  }

  componentDidMount() {
    document.title = "Code by Mike - Portfolio";

    const { pageVisited } = this.state;
    var { visitedPages } = this.props.styles;
    if (visitedPages.indexOf(String("portfolio").toLocaleLowerCase()) !== -1) {
      setTimeout(
        function () {
          this.setState({ pageVisited: true });
        }.bind(this),
        10
      );
    } else {
      setTimeout(
        function () {
          this.setState({ pageVisited: false });
        }.bind(this),
        10
      );
    }
  }

  finishedMyWorksTextAnim() {
    this.setState({ myWorksAnimFinished: true });
  }

  componentWillUnmount() {
    var { visitedPages } = this.props.styles;
    if (visitedPages.indexOf(String("portfolio").toLocaleLowerCase()) === -1) {
      visitedPages.push("portfolio");
      this.props.setPageVisited(visitedPages);
    }
  }

  showWorkItemsContainerHandler() {
    this.setState({ showWorkItemsContainer: true });
  }

  async fadedBlockReadyHandler() {
    this.setState({ fadedBlockReady: true });
  }

  render() {
    const { word, fadedBlockReady, showBackgroundWaves, showWorkItemsContainer, shutdown, myWorksAnimFinished, pageVisited } = this.state;
    const { loadingScreenShowing } = this.props;
    const { portfolioReadyToLoad, visitedPages } = this.props.styles;

    var { dy, dx } = this.state;

    return (
      <div className="routeDiv portfolioDiv">
        <div className="portfolioInnerDiv" ref={this.portfolioRef}>
          <BackgroundWaves
            showBackgroundWaves={showBackgroundWaves}
            pageVisited={pageVisited}
            showWorkItemsContainerHandler={this.showWorkItemsContainerHandler}
            showWorkItemsContainer={showWorkItemsContainer}
            setPortfolioReady={this.props.setPortfolioReady}
            fadedBlockReady={fadedBlockReady}
            fadedBlockReadyHandler={this.fadedBlockReadyHandler}
          />

          <Helmet>
            <title>MoKan Code - Works</title>
            <meta name="description" content="A display of projects" />
          </Helmet>

          <FadedBlocks fadedBlockReady={fadedBlockReady} />

          {this.props.styles.showMirrorSlideshow ? <MirrorCarouselController /> : null}
        </div>
      </div>
    );
  }
}

// export default Portfolio;
function mapStateToProps(state) {
  return {
    navbar: state.navbar,
    styles: state.styles,
  };
}

export default withRouter(connect(mapStateToProps, { setLoadingScreen, setPortfolioReady, setPageVisited })(Portfolio));
