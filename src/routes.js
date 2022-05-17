import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './Main';
import Whoweare from './pages/Whoweare';
import Howitworks from './pages/Howitworks';
import Benefits from './pages/Benefits';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Sponsor from './pages/Sponsor';
import LoanRequest from './pages/LoanRequest';
import LoansInProcess from './pages/LoansInProcess';
import LoansPending from './pages/LoansPending';
import LoansApproved from './pages/LoansApproved';
// import LoansRejected from './pages/LoansRejected';
import TestUpload from './pages/TestUpload';

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/" exact component={Main} />
        <Route path = "/main" component={Main} />
        <Route path="/who-we-are" component={Whoweare} />
        <Route path="/how-it-works" component={Howitworks} />
        <Route path="/benefits" component={Benefits} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/sponsor" component={Sponsor} />
        <Route path="/loan-request" component={LoanRequest} />
        <Route path="/in-process" component={LoansInProcess} />
        <Route path="/pending" component={LoansPending} />
        <Route path="/approved" component={LoansApproved} />
        <Route path="/rejected" component={TestUpload} />
      </Switch>
    </BrowserRouter>
  );
}