import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
                        <button type="submit" className="btn btn-sm btn-primary"><i className="fa fa-save"></i> Save</button>
                        <button type="reset" className="btn btn-sm btn-danger"><i className="fa fa-ban"></i> Reset</button>
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