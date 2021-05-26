import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "./ContactPage.css";
import OverlayOpener from "./OverlayOpener/OverlayOpener";
import classnames from "classnames";
import Staircase from "../Staircase/Staircase";
import ContactForm from "./ContactForm/ContactForm";
import { setPageVisited } from "../../actions/stylesActions";
import { Element, animateScroll as scroll, scroller, Events } from "react-scroll";
// import FormSubmittedDiv from './ContactForm/FormSubmittedDiv/FormSubmittedDiv';
import ShowContactFormBtn from "./ContactForm/ShowContactFormBtn";

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEndNum: 0,
    };

    this.scrollToForm = this.scrollToForm.bind(this);
    this.onSubmitScrollToForm = this.onSubmitScrollToForm.bind(this);
    this.showContactFormFunc = this.showContactFormFunc.bind(this);
  }

  componentDidMount() {
    document.title = "Code by Mike - Contact";

    const { pageVisited, scrolledForm } = this.state;
    var { visitedPages } = this.props.styles;
    if (visitedPages.indexOf(String("contact").toLocaleLowerCase()) !== -1) {
      // console.log("visited");
      this.setState({ pageVisited: true });
    } else {
      // console.log("not visited");
      this.setState({ pageVisited: false });
    }

    if (
      !scrolledForm
      // && window.innerHeight <= 600
    ) {
      this.setState({ scrolledForm: true, showPullUpBtn: true });
    }
  }

  componentDidUpdate() {
    const { scrolledForm } = this.state;
    if (
      // this.props.styles.rectangleTouchTextIsRevealed &&
      !scrolledForm
      //   &&window.innerHeight <= 600
    ) {
      this.setState({ scrolledForm: true, showPullUpBtn: true });
      // setTimeout(() => {
      //     scroll.scrollToBottom({
      //         duration: 1500,
      //         delay: 0,
      //         smooth: 'easeInOutQuad',
      //         containerId: 'contactPage',
      //         offset: 100, // Scrolls to element + 50 pixels down the page
      //     });
      // }, 1000);

      // Events.scrollEvent.register('end', function (to, element) {
      //     console.log('end', to, element);

      //     var { scrollEndNum } = this.state;
      //     scrollEndNum++;

      //     if (scrollEndNum >= 2) {
      //         Events.scrollEvent.remove('end')
      //         this.setState({ showPullUpBtn: true });
      //         return;
      //     }

      //     this.setState({ scrollEndNum });

      //     scroll.scrollToTop({
      //         duration: 500,
      //         delay: 300,
      //         smooth: 'easeInOutQuad',
      //         containerId: 'contactPage',
      //         offset: 50, // Scrolls to element + 50 pixels down the page
      //     });
      // }.bind(this));
    }
  }

  componentWillUnmount() {
    // console.log("contact page unmount");
    var { visitedPages } = this.props.styles;
    if (visitedPages.indexOf(String("contact").toLocaleLowerCase()) === -1) {
      visitedPages.push("contact");
      this.props.setPageVisited(visitedPages);
    }
  }

  scrollToForm() {
    scroller.scrollTo("contactPage", {
      duration: 1000,
      smooth: "easeInOutQuad",
      containerId: "contactPage",
      offset: 300, // Scrolls to element + 50 pixels down the page
    });
  }

  onSubmitScrollToForm() {
    scroller.scrollTo("contactFormContainerWrapper", {
      duration: 600,
      smooth: "easeInOutQuad",
      containerId: "contactPage",
      offset: -100, // Scrolls to element + 50 pixels down the page
    });
  }

  showContactFormFunc() {
    this.setState({ showContactForm: true });
  }

  render() {
    const { pageVisited, showPullUpBtn, formPulledByScroll, showContactForm } = this.state;
    const { isMobileMode } = this.props.styles;

    return (
      <div
        id="contactPage"
        className={classnames("routeDiv contactPage", {
          // "contactPageFirstVisit": pageVisited === false
        })}
        onScroll={function (e) {
          //   if (e.target.scrollTop >= 20) console.log("scroll>=20", e.target.scrollTop);
          //   if (e.target.scrollTop < 20) console.log("scroll<20", e.target.scrollTop);

          if (e.target.scrollTop >= 20 && showPullUpBtn && !formPulledByScroll) this.setState({ formPulledByScroll: true });
        }.bind(this)}
      >
        <Helmet>
          <title>MoKan Code - Contact</title>
          <meta name="description" content="Let's get in touch" />
        </Helmet>

        {pageVisited == true || pageVisited === false ? <OverlayOpener pageVisited={pageVisited} /> : null}

        <Staircase />

        {/* <FormSubmittedDiv showDiv={true} /> */}

        <ShowContactFormBtn showContactFormFunc={this.showContactFormFunc} showContactForm={showContactForm} />

        {!isMobileMode || (isMobileMode && showContactForm) ? (
          <ContactForm
            scrollToForm={this.scrollToForm}
            onSubmitScrollToForm={this.onSubmitScrollToForm}
            showPullUpBtn={showPullUpBtn}
            showContactForm={showContactForm}
            formPulledByScroll={formPulledByScroll}
          />
        ) : null}

        {/* <div className="contactInfoContainer"> */}

        {/* <div className="contactInfoWrapper">
            <div className="myNameContainer">
            <div className="panelShineWrapper"><div className="panelShine"></div></div>
            <div className="textDiv">
            <div className="welcomeLine">
            <p>Welcome</p>
            <p>, visitor, to my humble portfolio.</p>
            </div>
            <p className="myName">My name is Mike</p>
            <p>I'm a web developer</p>
            <p>I graduated from Queens College in '18 with a <span>BS</span> degree in Computer Science</p>
            <p>Shortly after, over the course of a year I studied web development online</p>
            <p>And in this site I present some of the things I can do.</p>
            </div>
            </div>
        </div> */}
        {/* </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navbar: state.navbar,
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setPageVisited })(ContactPage);
// export default ContactPage;
