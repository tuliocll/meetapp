import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Meetups from './pages/Meetups';
import Meetup from './pages/Meetup';
import Profile from './pages/Profile';

export default (isSined = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                Sign: createSwitchNavigator({
                    SignIn,
                    SignUp,
                }),
                App: createBottomTabNavigator(
                    {
                        Dashboard: createSwitchNavigator(
                            {
                                Dashboard,
                                Meetup,
                            },
                            {
                                backBehavior: 'order',
                                navigationOptions: {
                                    tabBarLabel: 'Meetups',
                                    tabBarIcon: ({ tintColor }) => (
                                        <Icon
                                            name="event"
                                            size={20}
                                            color={tintColor}
                                        />
                                    ),
                                },
                            }
                        ),
                        Meetups: {
                            screen: Meetups,
                            navigationOptions: {
                                tabBarLabel: 'Inscrições',
                                tabBarIcon: ({ tintColor }) => (
                                    <Icon
                                        name="person"
                                        size={20}
                                        color={tintColor}
                                    />
                                ),
                            },
                        },

                        Profile: {
                            screen: Profile,
                            navigationOptions: {
                                tabBarLabel: 'Meu perfil',
                                tabBarIcon: ({ tintColor }) => (
                                    <Icon
                                        name="person"
                                        size={20}
                                        color={tintColor}
                                    />
                                ),
                            },
                        },
                    },
                    {
                        tabBarOptions: {
                            keyboardHidesTabBar: true,
                            activeTintColor: '#fff',
                            inactiveTintColor: 'rgba(255,255,255,0.7)',
                            style: {
                                backgroundColor: '#2b1a2f',
                                borderTopColor: '#0000',
                            },
                        },
                    }
                ),
            },
            {
                initialRouteName: isSined ? 'App' : 'Sign',
            }
        )
    );
