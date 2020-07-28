import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from './providers/UserProfileProvider';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/Header';
import { ReviewPostProvider } from './providers/ReviewPostProvider';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <ReviewPostProvider>
            <Header />
            <ApplicationViews />
          </ReviewPostProvider>
        </UserProfileProvider>
      </Router>
    </div>
  );
}

export default App;
