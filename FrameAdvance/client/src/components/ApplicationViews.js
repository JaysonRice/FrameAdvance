import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./reviewPosts/HomePage";
import { PostReviewForm } from "./reviewPosts/AddReviewForm";
import ReviewPostDetails from "./reviewPosts/ReviewPostDetails";
import UserPage from "./reviewPosts/UserPage";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? (
            <div>
              <HomePage />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/user/:id">
          {isLoggedIn ? (
            <div>
              <UserPage />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/newreview">
          {isLoggedIn ? (
            <div>
              <PostReviewForm />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/reviewpost/:id">
          {isLoggedIn ? (
            <div>
              <ReviewPostDetails />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
