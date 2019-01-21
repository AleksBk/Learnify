import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import CoursesList from './components/CoursesList';
import CourseDetails from './components/CourseDetails';
import CourseItem from './components/CourseItem';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/login' component={ Login } />
    <Route path='/courseslist' component={ CoursesList } />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
    <Route path='/courses/:courseId?/item/:courseItemName?' component={ CourseItem } />
    <Route exact path='/courses/:id?' component={ CourseDetails } />
</Layout>;
