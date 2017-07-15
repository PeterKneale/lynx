import React from 'react';
import {Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap';
import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import List from './List'
import Create from './Create'
import Edit from './Edit'

const RenderToolbar = () => (
    <div className="card">
        <div className="card-block">
            <ButtonGroup>
                <LinkContainer to="/users/create">
                    <Button bsStyle="primary">Create new user</Button>
                </LinkContainer>
            </ButtonGroup>
        </div>
    </div>
)

const Layout = props => {
    return (
        <Grid>
            <Row>
                <Col md={12}>
                    {RenderToolbar()}
                </Col>
            </Row>
            <Route exact path="/users" name="List" component={List}/>
            <Route path="/users/create" name="Create" component={Create}/>
            <Route path="/users/edit" name="Edit" component={Edit}/>
        </Grid>
    );
};

export default Layout;