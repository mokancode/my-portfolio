import React, { Component } from 'react';

class MobileSlideshowRadioItem extends Component {
    constructor(props) {
        super(props)

        this.setCurrentIndex = this.props.setCurrentIndex;
    }

    render() {

        const { picItem, currentIndex, index } = this.props;

        return (
            <div className="mobileSlideshowRadioItemContainer">
                <input type="radio" name="mobileSlideshowPhoto" value={picItem.src} checked={currentIndex === index}
                    onChange={function (e) {
                        this.setCurrentIndex(index);
                    }.bind(this)}
                ></input>
                <label></label>
                <p>{picItem.name}</p>
            </div>
        );
    }
}

export default MobileSlideshowRadioItem;