import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { listUsers } from '../../actions'

const UsersList = ({users, total, onRefresh}) => {
  return (
    <div className="animated fadeIn">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <i className="fa fa-align-justify"></i> Users
              <div className="float-right">
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={()=>onRefresh()}>
                  <i className="fa fa-refresh"></i> Refresh
                </button>
              </div>
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
                      <td>{user.Name}</td>
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
            <div className="card-footer">{total} Users</div>
          </div>
        </div>
      </div>
    </div>);
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  onRefresh: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        total: state.usersReducer.total
    }
}

const mapDispatchToProps = (dispatch) => ({
    onRefresh: () => { dispatch(listUsers()) }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersList)