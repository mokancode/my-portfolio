import React, { Component } from 'react';
import Lottie from 'react-lottie';
import data from './data.json';
import classnames from 'classnames';

class ShowContactFormBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused: true
        };

        this.showContactFormFunc = this.props.showContactFormFunc;
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({ isPaused: false });
        }.bind(this), 3000);
    }

    render() {

        const { isPaused } = this.state;
        const { showContactForm } = this.props;

        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: data,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div className={classnames("showContactFormBtn", {
                "clicked": showContactForm
            })} onClick={function () { this.showContactFormFunc(); }.bind(this)}>
                <Lottie
                    options={defaultOptions}
                    ref={this.showContactFormBtnLottieRef}
                    // eventListeners={[
                    //     {
                    //         eventName: "complete",
                    //         callback: async function () {

                    //             // console.log('showContactFormBtn complete', this.showContactFormBtnLottieRef.current.anim.currentFrame);
                    //             // if (this.showContactFormBtnLottieRef.current.anim.currentFrame > 0 && itemIndex === 0) {
                    //             //     // console.log("bracket anim finished")
                    //             //     // this.bracketAnimFinishedFunc();

                    //             //     // this.showContactFormBtnLottieRef.current.destroy();
                    //             //     // this.setState({ destroyshowContactFormBtn: true });
                    //             // }
                    //         }.bind(this)
                    //     }
                    // ]}
                    // direction={-1}
                    // height={400}
                    // width={400}
                    // isStopped={isStopped}
                    isPaused={isPaused}
                />
            </div>
        );
    }
}

export default ShowContactFormBtn;