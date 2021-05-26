import React, { Component } from 'react'
import './ProjectOrganizer.scss';
import classnames from 'classnames';
import isEmpty from '../../validation/is-empty';
import MountainIcon1 from '../SVGs/MountainIcon/MountainIcon1';
import { connect } from 'react-redux';
import { showMiscWorkItemSlideshow } from '../../actions/stylesActions';

export class ProjectOrganizer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        
        this.return_W_Item_Pos = this.props.return_W_Item_Pos;

    }

    componentDidUpdate() {
        const { withinRange, miniWorkItemLoaded } = this.state;

        if (withinRange && miniWorkItemLoaded !== true) {
            this.setState({ miniWorkItemLoaded: true });
        }

    }

    render() {

        const { miniWorkItemLoaded } = this.state;
        const { workItem, descriptionOfWork, projectOrganizer, miscTextFinished } = this.props;

        return (
            <div className={classnames("miniWorkItemDiv projectOrganizerDiv", {
                "miniWorkItemDivShow": true
            })}
                onClick={function (e) {
                    e.stopPropagation();
                    this.return_W_Item_Pos(null, null, workItem, true);  // "return" means "send to parent component"
                    // this.props.showMiscWorkItemSlideshow(true);
                }.bind(this)}
            >

                <div className="mountainIconWrapper"><MountainIcon1 /></div>
                <div className="mountainIconWrapper"><MountainIcon1 /></div>

                <h1>Project Organizer</h1>
                {!isEmpty(descriptionOfWork) ?
                    <p className="miniWorkDescription">{descriptionOfWork}</p>
                    : null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        navbar: state.navbar,
        styles: state.styles,
    }
}

export default connect(mapStateToProps, { showMiscWorkItemSlideshow })(ProjectOrganizer);
// export default ProjectOrganizer;