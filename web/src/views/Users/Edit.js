import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';

const Edit = props => {
    return (
        <div className="card card-accent-info">
            <div className="card-header">
                Edit a User
            </div>
            <div className="card-block">
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className="form-control" id="firstname" placeholder="Enter first name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" id="lastname" placeholder="Enter last name"/>
                </div>
                <div className="card-footer">      
                    <LinkContainer to="/users">
                        <Button bsStyle="primary" bsSize="sm"><i className="fa fa-save"></i> Save</Button>
                    </LinkContainer>
                    <LinkContainer to="/users">
                        <Button>Cancel</Button>
                    </LinkContainer>
                </div>
            </div>
        </div>
    );
};

Edit.propTypes = {
};

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit)