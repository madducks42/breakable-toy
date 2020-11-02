import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import CampgroundIndexContainer from './CampgroundIndexContainer'
import CampgroundShowContainer from './CampgroundShowContainer'
import NewCampgroundForm from './NewCampgroundForm'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={CampgroundIndexContainer}/>
        <Route exact path='/campgrounds' component={CampgroundIndexContainer} />
        <Route exact path='/campgrounds/new' component={NewCampgroundForm} />
        <Route exact path='/campgrounds/:id' component={CampgroundShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
