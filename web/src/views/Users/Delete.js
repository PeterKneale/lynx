import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';

const Delete = props => {
    return (
        <div className="panel panel-danger">
            <div className="panel-heading">
                <h3 className="panel-title">Delete user</h3>
            </div>
            <div className="panel-body">
                Are you sure you want to delete this user?
            </div>
            <div className="panel-footer">
                <LinkContainer to="/users">
                    <Button bsStyle="danger" bsSize="sm"><i classNameName="fa fa-trash"></i> Delete</Button>
                </LinkContainer>
                <LinkContainer to="/users">
                    <Button>Cancel</Button>
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