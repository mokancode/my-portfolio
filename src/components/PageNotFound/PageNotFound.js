import React, { Component } from 'react';
import anime from 'animejs';
import './PageNotFound.css';
import classnames from 'classnames';
import Error404Text from './Error404Text/Error404Text';
import FrontMountain404 from './Mountains404/FrontMountain404';
import RearMountain404 from './Mountains404/RearMountain404';
import PageNotFoundCursive from './PageNotFoundCursive/PageNotFoundCursive';

class PageNotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.title = "Code by Mike - Page not found";

        var path = anime.path("#spherePath");
        var animeObjUpper = anime({
            targets: ".pageNotFoundSphereFlare",
            translateX: path('x'),
            translateY: path('y'),
            // rotate: path('angle'),
            // easing: 'easeInOutBounce',
            easing: 'linear',
            duration: 5000,
            // direction: "reverse",
            loop: false,
            autoplay: false
        });

        animeObjUpper.seek(2500);
        setTimeout(function () {
            animeObjUpper.play();
        }.bind(this), 2000);

        setTimeout(function () {
            this.setState({ reveal: true });
        }.bind(this), 10);
    }

    render() {

        const { reveal } = this.state;

        return (
            <div className={classnames("pageNotFoundWrapper", {
                "reveal": reveal
            })}>
                <div className="sphereAndFlare">
                    <div className="pageNotFoundSphereFlare"></div>
                    <svg className="sphereSVG" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <linearGradient
                            id={`sphereSVGGradient`}
                            gradientTransform="rotate(90)"
                        >
                            <stop
                                offset="30%"
                                stopColor="var(--color-stop-1)" />
                            <stop
                                offset="70%"
                                stopColor="var(--color-stop-2)" />
                        </linearGradient>
                        <circle id="spherePath" cx="50" cy="50" r="50" />
                    </svg>

                </div>

                <div className="notFoundText">
                    <Error404Text />
                    <PageNotFoundCursive />
                </div>

                <div className="mountains404">
                    <FrontMountain404 />
                    <RearMountain404 />
                </div>
            </div>

        );
    }
}

export default PageNotFound;