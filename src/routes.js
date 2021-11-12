import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './Main.js';
import Whoweare from './pages/Whoweare.js';
import Howitworks from './pages/Howitworks.js';
import Benefits from './pages/Benefits.js';
import Contact from './pages/Contact.js';
import Login from './pages/Login.js';
import Sponsor from './pages/Sponsor';
import LoanRequest from './pages/LoanRequest.js';
import LoansInProcess from './pages/LoansInProcess.js';
import LoansPending from './pages/LoansPending';
import LoansApproved from './pages/LoansApproved.js';
import LoansRejected from './pages/LoansRejected.js';

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/" exact component={Main} />
        <Route path = "/main" component={Main} />
        <Route path="/whoweare" component={Whoweare} />
        <Route path="/howitworks" component={Howitworks} />
        <Route path="/benefits" component={Benefits} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/sponsor" component={Sponsor} />
        <Route path="/loanrequest" component={LoanRequest} />
        <Route path="/inprocess" component={LoansInProcess} />
        <Route path="/pending" component={LoansPending} />
        <Route path="/approved" component={LoansApproved} />
        <Route path="/rejected" component={LoansRejected} />
      </Switch>
    </BrowserRouter>
  );
}