import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {listUsers} from '../../actions'
import {LinkContainer} from 'react-router-bootstrap';
import {Row, Button, Glyphicon  } from 'react-bootstrap';

const List = ({users, total, onRefresh}) => (
  <div className="panel panel-info">
    <div className="panel-heading">Users</div>
      <div class="panel-body">
        <Button bsStyle="primary" bsSize="small" onClick={() => onRefresh()}>Refresh</Button>
      </div>  
    {RenderTable(users, total)}
  </div>
);

const RenderTable = (users, total) => (
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
                <LinkContainer to={"/users/edit/" + user.id}>
                  <Button bsStyle="info" bsSize="small">Edit</Button>
                </LinkContainer>
                &nbsp;
                <LinkContainer to={"/users/delete/" + user.id}>
                  <Button bsStyle="danger" bsSize="small">Delete</Button>
                </LinkContainer>
              </td>
            </tr>
        })}
    </tbody>
  </table>
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
  onRefresh: PropTypes.func
};

const mapStateToProps = (state) => {
  return {users: state.usersReducer.users, total: state.usersReducer.total}
}

const mapDispatchToProps = (dispatch) => ({
  onRefresh: () => { dispatch(listUsers()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(List)