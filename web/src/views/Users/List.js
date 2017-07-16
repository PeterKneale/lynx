import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {listUsers, editUser, deleteUser} from '../../actions'
import {LinkContainer} from 'react-router-bootstrap';
import {Row, Col, Button, ButtonGroup, Panel } from 'react-bootstrap';
import history from './history';

const List = ({users, total, onRefresh, onEdit, onDelete}) => (
      <div className="card">
        <div className="card-header">
          <i className="fa fa-align-justify"></i> Users
          <div className="float-right">
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => onRefresh()}>
              <i className="fa fa-refresh"></i> Refresh
            </button>
          </div>
        </div>
        <div className="card-block">
          {RenderTable(users, total, onEdit, onDelete)}
        </div>
        <div className="card-footer"></div>
      </div>
);

const RenderTable = (users, total, onEdit, onDelete) => (
  <div>
      <table className="table table-bordered table-striped table-condensed">
        <thead>
          <tr><th>Id</th><th>Name</th><th>First Name</th><th>Last Name</th><th>Actions</th></tr>
        </thead>
        <tbody>
            { users.map(function (user) {
                return <tr key={user.id}>
                  <td>{user.id}</td><td>{user.Name}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm" onClick={()=>onEdit(user.id)}>Edit</button>
                    <button className="btn btn-outline-critical btn-sm" onClick={()=>onDelete(user.id)}>Delete</button>
                  </td>
                </tr>
            })}
        </tbody>
      </table>
  </div>
)

const RenderStats = (total) => (
  <Row>
    <div className="col-sm-2">
      <div className="callout callout-info">
        <small className="text-muted">Total Users</small><br/>
        <strong className="h4">{total}</strong>
      </div>
    </div>
    <div className="col-sm-2">
      <div className="callout callout-success">
        <small className="text-muted">Active Users</small><br/>
        <strong className="h4">{total /2}</strong>
      </div>
    </div>
    <div className="col-sm-2">
      <div className="callout callout-success">
        <small className="text-muted">Paid Users</small><br/>
        <strong className="h4">{total /3}</strong>
      </div>
    </div>
  </Row>
)


List.propTypes = {
  users: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  onRefresh: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

const mapStateToProps = (state) => {
  return {users: state.usersReducer.users, total: state.usersReducer.total}
}

const mapDispatchToProps = (dispatch) => ({
  onRefresh: () => { dispatch(listUsers()) },
  onEdit: (id) => { history.push('#/users/edit/' + id) },
  onDelete: (id) => { dispatch(deleteUser(id)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(List)