import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/reducer/useSlicer";
import Navbar from "./components/UI/Navbar";
import TemporaryDrawer from "./components/UI/Sidebar";
import Listing from "./components/Listing";

function App() {
  const user = useSelector(selectUser);

  return (
    <div className="App">
      <TemporaryDrawer />
      <Routes>
        <Route
          path="/"
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/login"
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/listing"
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <Listing />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          exact={true}
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* {user.isLoggedin ? <Route path="/dashboard" element={<Dashboard/>}/> : <Route path="/login" element={<Login/>}/>} */}
        {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
