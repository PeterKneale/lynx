import React from 'react';
import {Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap';
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import List from './List'
import Create from './Create'
import Edit from './Edit'
import Delete from './Delete'

const RenderToolbar = () => (
    <div className="card">
        <div className="card-block">
            <LinkContainer to="/users/create">
                <Button bsStyle="primary">Create new user</Button>
            </LinkContainer>
            &nbsp;
            <LinkContainer to="/users/invite">
                <Button bsStyle="primary">Invite new user</Button>
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
            <Route exact path="/users" name="List" component={List}/>
            <Route path="/users/create" name="Create" component={Create}/>
            <Route path="/users/edit/:id" name="Edit" component={Edit}/>
            <Route path="/users/delete/:id" name="Delete" component={Delete}/>
        </div>
    );
};

export default Layout;