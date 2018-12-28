import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import CoursesList from './components/CoursesList';
import CourseDetails from './components/CourseDetails';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/courseslist' component={ CoursesList } />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
    <Route path='/courses/:id?' component={ CourseDetails } />
</Layout>;
