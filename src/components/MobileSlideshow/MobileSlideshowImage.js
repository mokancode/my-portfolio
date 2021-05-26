import React, { Component } from "react";
import classnames from "classnames";

class MobileSlideshowImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.imgRef = React.createRef();
  }

  componentDidMount() {
    // console.log("this.imgRef.current.naturalWidth", this.imgRef.current.naturalWidth);

    if (this.imgRef.current.naturalWidth > this.imgRef.current.naturalHeight) this.setState({ landscape: true });
    else if (this.imgRef.current.naturalWidth < this.imgRef.current.naturalHeight) this.setState({ portrait: true });
  }

  componentDidUpdate() {
    if (this.imgRef.current.naturalWidth > this.imgRef.current.naturalHeight && !this.state.landscape) this.setState({ landscape: true });
    else if (this.imgRef.current.naturalWidth < this.imgRef.current.naturalHeight && !this.state.portrait)
      this.setState({ portrait: true });
  }

  render() {
    const { currentIndex, index, picItem } = this.props;
    const { portrait, landscape } = this.state;

    return (
      <img
        ref={this.imgRef}
        className={classnames("mobileSlideshowImageItem", {
          showMobileSlideshowImageItem: currentIndex === index,
          landscape: landscape,
          portrait: portrait,
        })}
        src={picItem.src}
        alt={`mobileSlideshowImg${currentIndex}`}
      ></img>
    );
  }
}

export default MobileSlideshowImage;
