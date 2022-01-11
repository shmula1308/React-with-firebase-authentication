import React from "react";
import { Route, Routes } from "react-router-dom";
import { ACCOUNT, ADMIN, SIGN_UP, SIGN_IN, LANDING, HOME, PASSWORD_FORGET } from "../../constants/routes";
// import * as Routes from "../../constants/routes"; you coul also do this, since exports are not as defautlt * say import everything in an object name Routes
import LandingPage from "../Landing/index";
import SignUpPage from "../SignUp/index";
import SignInPage from "../SignIn/index ";
import PassworForgetPage from "../PasswordForget/index";
import HomePage from "../Home/index";
import AccountPage from "../Account/index";
import AdminPage from "../Admin/index";
import Navigation from "../Navigation";

//SDK stands for Software development kit

// If you need to Redirect use Navigate component in router 6. use it inside an element property
// Also even if you have only a single Route you have to wrap it with Routes
// Even when you render just an html inside a Route, you have to pass it asn an element property
// also add path="/welcome/*" in order to load the Route that contains the nested Route, but not with exact match "/*" --> this is replacing exact [18:31] --> continue watching https://www.youtube.com/watch?v=zEQiNFAwDGo

const App = () => {
  return (
    <div>
      <Navigation />
      <hr />
      {/* Navigation contains <Link/> components that point to="/a-path". Once clicked Route component sbelow render a certain page that matches that path */}
      <Routes>
        <Route path={LANDING} element={<LandingPage />} />
        <Route path={SIGN_UP} element={<SignUpPage />} />
        <Route path={SIGN_IN} element={<SignInPage />} />
        <Route path={PASSWORD_FORGET} element={<PassworForgetPage />} />
        <Route path={HOME} element={<HomePage />} />
        <Route path={ACCOUNT} element={<AccountPage />} />
        <Route path={ADMIN} element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;
