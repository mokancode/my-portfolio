import React, { Component } from 'react';
import classnames from 'classnames';
import './PDFIcon.css';

class PDFIcon extends Component {
    render() {
        return (
            <div className="pdfIcon">
                <img src="/images/pdfIcon.png" alt="pdfIcon"></img>
                <p>PDF</p>
            </div>
        );
    }
}

export default PDFIcon;