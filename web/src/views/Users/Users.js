import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { listUsers } from '../../actions'

const UsersList = ({users}) => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <i className="fa fa-align-justify"></i> Users
              </div>
            <div className="card-block">
              <table className="table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(function (user) {
                    <tr>
                      <td>user.Name</td>
                      <td>2012/01/01</td>
                      <td>Member</td>
                      <td>
                        <span className="badge badge-success">Active</span>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

UsersList.propTypes = {
  users: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        users: state.users.users
    }
}

const mapDispatchToProps = (dispatch) => ({
    onRefresh: () => { dispatch(listUsers()) }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersList)