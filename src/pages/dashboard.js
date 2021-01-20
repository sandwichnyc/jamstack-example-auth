import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import Profile from '../components/profile';
import RouteBase from '../components/route-base';
import RouteSecret from '../components/route-secret';
import RouteLogin from '../components/route-login';
import IdentityModal from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';
import PrivateRoute from '../components/private-route';

const Dashboard = ({ location }) => {
    const [ isVisible, setIsVisible ] = useState(false);

    useEffect(() => {
        if (location.pathname.match(/^\/dashboard\/?$/)) {
            navigate('/dashboard/login', {replace: true});
        }
    }, []);

    const showModal = () => setIsVisible(true);

    return (
        <Layout>
            <Profile showModal={showModal} />
            <Router>
                <RouteLogin path="/dashboard/login" showModal={showModal} />
                <PrivateRoute path="/dashboard/base" component={RouteBase} />
                <PrivateRoute path="/dashboard/secret" component={RouteSecret} />
            </Router>
            <IdentityModal
                showDialog={isVisible}
                onCloseDialog={() => setIsVisible(false)}
            />
        </Layout>
    );
};

export default Dashboard;
