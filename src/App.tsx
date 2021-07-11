import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./App.css";

import Exam4training from "./screen/Exam4training";
import Examtopics from "./screen/Examtopics";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/" >AWS Question and Ansewers</Link>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to="/AWS-MCQ/exam4training">Exam4training</Link></li>
                <li><Link to="/AWS-MCQ/examtopics/1">Examtopics</Link></li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route path="/AWS-MCQ/exam4training">
              <Exam4training />
            </Route>
            <Route path="/AWS-MCQ/examtopics/:id">
              <Examtopics />
            </Route>
            <Route path="/">
              <p>AWS Question and Ansewer</p>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
