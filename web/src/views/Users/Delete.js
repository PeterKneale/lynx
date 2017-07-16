import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';
import {deleteUser} from '../../actions';

const Delete = props => {
    return (
        <div className="card card-accent-danger">
            <div className="card-header">
                Delete a User
            </div>
            <div className="card-block">
                Are you sure you want to delete this user?
            </div>
            <div className="card-footer">
                <LinkContainer to="/users" onClick={deleteUser(1)}>
                    <Button bsStyle="danger" bsSize="sm"><i className="fa fa-dot-circle-o"></i> Delete</Button>
                </LinkContainer>
                <LinkContainer to="/users">
                    <Button bsStyle="info" bsSize="sm">Cancel</Button>
                </LinkContainer>
            </div>
        </div>
    );
};

Delete.propTypes = {
};

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete)