import { ThemeProvider } from "@mui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import {
  Home,
  AppBar,
  SignUpUser,
  SignInUser,
  AllUsers,
  PrivateRoute,
  EditProfile,
  Profile,
  MyCourses,
  NewCourse,
  Course,
  EditCourse,
  Enrollment,
} from "../src/components/allComponents/AllComponents";
import theme from "./theme";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/signup" component={SignUpUser} />
            <Route exact path="/signin" component={SignInUser} />
            <Route exact path="/user/:userId" component={Profile} />
            <Route exact path="/course/:courseId" component={Course} />

            <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute path="/teach/courses" component={MyCourses} />

            <PrivateRoute path="/teach/course/new" component={NewCourse} />
            <PrivateRoute
              exact
              path="/teach/course/edit/:courseId"
              component={EditCourse}
            />
            <PrivateRoute path="/teach/course/:courseId" component={Course} />
            <PrivateRoute path="/learn/:enrollmentId" component={Enrollment} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default hot(module)(App);
