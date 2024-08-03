import React,{useContext,useEffect} from 'react'
import './App.css';
import {Context} from './main'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Auth/login'
import Register from './components/Auth/register'
import Navbar from './components/Layout/navbar'
import Footer from './components/Layout/footer'
import Home from './components/Home/home'
import MyRequests from './components/Request/myRequests'
import Requests from './components/Request/Requests'
import PostReq from './components/Request/postReq'
import MyServices from './components/Service/myServices'
import UpdateRequest from './components/Request/UpdateRequest.jsx';
import Notfound from './components/NotFound/notfound'
import Verified_users from './components/User/Verified_users.jsx';
import RequestDetails from './components/Request/RequestDetails.jsx'
import ActiveRequests from './components/Request/ActiveRequests.jsx'
import UpdateService from './components/Service/UpdateService.jsx';
import CompletedRequests from './components/Request/CompletedRequests.jsx';
import Completed_Services from './components/Service/Completed_Services.jsx';
import axios from 'axios'
import Users from './components/User/Users.jsx'
import {Toaster} from 'react-hot-toast'




const App = () => {

  const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        // console.log(response.json());
        setUser(response.data.user);
        // setUser(response.json())
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  },[isAuthorized]);




  return (
    <>
    <Toaster/>
    <Router>
    <Navbar />
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/req/getAll' element={<Requests />}></Route>
        <Route path='/req/:id' element={<RequestDetails />}></Route>
        <Route path='/upreq/:id' element={<UpdateRequest />}></Route>
        <Route path='/req/post' element={<PostReq/ >}></Route>
        <Route path='/myreq' element={<MyRequests />}></Route>
        <Route path='/myserv' element={<MyServices />}></Route>
        <Route path='/upser/:id' element={<UpdateService />}></Route>
        <Route path='/actreq' element={<ActiveRequests />}></Route>
        <Route path='/actusers' element={<Verified_users/>}></Route>
        <Route path='/ComReq' element={<CompletedRequests/>}></Route>
        <Route path='/ComSer' element={<Completed_Services/>}/>
        <Route path='/getUsers' element={<Users/>}></Route>
        <Route path='*' element={<Notfound />}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App