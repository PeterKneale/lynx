import React from 'react';
import {Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap';
import {ButtonToolbar, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import List from './List'
import Create from './Create'
import Edit from './Edit'
import Delete from './Delete'

const RenderToolbar = () => (
    <div className="panel panel-info">
        <div className="panel-body">
            <LinkContainer to="/users/create">
                <Button bsStyle="primary" bsSize="small">Create new user</Button>
            </LinkContainer>
            &nbsp;&nbsp;
            <LinkContainer to="/users/invite">
                <Button bsStyle="primary" bsSize="small">Invite new user</Button>
            </LinkContainer>
        </div>
    </div>
)

const Layout = props => {
    return (
        <div>
            <Row>
                <Col md={12}>
                    {RenderToolbar()}
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Route exact path="/users" name="List" component={List}/>
                    <Route path="/users/create" name="Create" component={Create}/>
                    <Route path="/users/edit/:id" name="Edit" component={Edit}/>
                    <Route path="/users/delete/:id" name="Delete" component={Delete}/>
                </Col>
            </Row>
        </div>
    );
};

export default Layout;