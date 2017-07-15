import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {listUsers} from '../../actions'
import {LinkContainer} from 'react-router-bootstrap';
import {Row, Col, Button, ButtonGroup, Panel } from 'react-bootstrap';

const List = ({users, total, onRefresh}) => (
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
          {RenderTable(users, total)}
        </div>
        <div className="card-footer"></div>
      </div>
);


const RenderTable = (users, total) => (
  <div>
    {RenderStats(total)}
    <Row>
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Registered</th><th>Role</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td></tr>
          <tr><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td></tr>
          <tr><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td></tr>
          <tr><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td><td>xxxxxxxxxx</td></tr>
        </tbody>
      </table>
    </Row>
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
      <div className="callout callout-warning">
        <small className="text-muted">Active Users</small><br/>
        <strong className="h4">{total /2}</strong>
      </div>
    </div>
    <div className="col-sm-2">
      <div className="callout callout-primary">
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
  onRefresh: () => {
    dispatch(listUsers())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List)