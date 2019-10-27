import React from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Route from './Route';

import '~/styles/animation.css';

import SingnIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Perfil from '../pages/Profile';
import NovoEditar from '../pages/NewEdit';
import Detalhes from '../pages/Detail';

export default function Routes() {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Switch location={location}>
                    <Route path="/" exact component={SingnIn} />
                    <Route path="/register" exact component={SignUp} />

                    <Route path="/dashboard" isPrivate component={Dashboard} />
                    <Route path="/profile" isPrivate component={Perfil} />
                    <Route
                        path="/meetapp/:id?"
                        isPrivate
                        component={NovoEditar}
                    />
                    <Route path="/detail/:id" isPrivate component={Detalhes} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
}
