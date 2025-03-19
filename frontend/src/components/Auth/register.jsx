// import React, { useContext, useState } from 'react'
// import { Context } from '../../main'
// import toast from 'react-hot-toast'
// import { Navigate,Link } from 'react-router-dom'
// import { FaRegUser,FaPencilAlt } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { FaPhoneFlip } from 'react-icons/fa6';
// import {RiLock2Fill} from 'react-icons/ri'
// import axios from 'axios';

// const Register = () => {
//   const [email,setEmail]=useState("")
//   const [password,setPassword]=useState("")
//   const [phone,setPhone]=useState("")
//   const [name,setName]=useState("")
//   const [role,setRole]=useState("")


//   const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context)

//   const handleRegister = async(e)=>{
//     e.preventDefault();
//     try {
//       const {data}=await axios.post('http://localhost:4000/api/v1/user/register',{name,email,password,phone,role},{withCredentials:true,headers:{'Content-Type':'application/json'}})
//       toast.success(data.message);
//       setName("");
//       setEmail("");
//       setPhone("");
//       setPassword("");
//       setRole("");
//       setIsAuthorized(true);
//       window.location.reload(); 
//     } catch (error) {
//       toast.error(error.response.data.message);
//       window.location.reload(); 
//       // console.log(error);
//     }
//   }

//   if(isAuthorized){
//     return <Navigate to={'/'}/>
//   }
//   return <>
//   <div className="authPage">
//       <div className="container">
//         <div className="left">
//       <div className="header">
//           <img src="/login2.jpg" alt="logo" />
//           <h3>Create a new account</h3>
//         </div>
//         <form>
//           <div className="inputTag">
//             <label>Register As </label>
//             <div>
//               <select value={role} onChange={(e)=>setRole(e.target.value)}>
//                 <option value="">Select Role</option>
//                 <option value="Customer">Customer</option>
//                 <option value="Mechanic">Mechanic</option>
//                 <option value="Admin">Admin</option>
//               </select>
//               <FaRegUser></FaRegUser>
//             </div>
//           </div>
//           <div className="inputTag">
//             <label>Name</label>
//             <div>
//               <input type="text" value={name} onChange={(e)=>setName(e.target.value)}
//               placeholder="Eg:Raja Sekhar" />
//               <FaPencilAlt></FaPencilAlt>
//             </div>
//           </div>
//           <div className="inputTag">
//             <label>Email Address</label>
//             <div>
//               <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
//               placeholder="Eg:raja@gmail.com" />
//               <MdOutlineMailOutline></MdOutlineMailOutline>
//             </div>
//           </div>
//           <div className="inputTag">
//             <label>Phone Number</label>
//             <div>
//               <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}
//               placeholder="Eg:7678836421" />
//               <FaPhoneFlip></FaPhoneFlip>
//             </div>
//           </div>
//           <div className="inputTag">
//             <label>Password</label>
//             <div>
//               <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}
//               placeholder="Password must contain 8 characters" />
//               <RiLock2Fill></RiLock2Fill>
//             </div>
//           </div>
//           <button onClick={handleRegister} type="submit">Register</button>
//           <Link to={'/login'}>Login Now</Link>
//         </form>
//         </div>

//         <div className="banner">
//           <img src="/register.png" alt="register" />
//         </div>
//       </div>
//     </div>
//   </>
// }

// export default Register
import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import { Navigate, Link } from 'react-router-dom';
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from 'react-icons/fa6';
import { RiLock2Fill } from 'react-icons/ri';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/user/register',
        { name, email, password, phone, role },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      toast.success(data.message);
      // Clear form fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="left">
            <div className="header">
              <img src="/login2.jpg" alt="logo" />
              <h3>Create a new account</h3>
            </div>
            <form onSubmit={handleRegister}>
              <div className="inputTag">
                <label>Register As</label>
                <div>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="Customer">Customer</option>
                    <option value="Mechanic">Mechanic</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <FaRegUser />
                </div>
              </div>
              <div className="inputTag">
                <label>Name</label>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eg: Raja Sekhar"
                  />
                  <FaPencilAlt />
                </div>
              </div>
              <div className="inputTag">
                <label>Email Address</label>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Eg: raja@gmail.com"
                  />
                  <MdOutlineMailOutline />
                </div>
              </div>
              <div className="inputTag">
                <label>Phone Number</label>
                <div>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Eg: 7678836421"
                  />
                  <FaPhoneFlip />
                </div>
              </div>
              <div className="inputTag">
                <label>Password</label>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password must contain 8 characters"
                  />
                  <RiLock2Fill />
                </div>
              </div>
              <button type="submit">Register</button>
              <Link to="/login">Login Now</Link>
            </form>
          </div>

          <div className="banner">
            <img src="/register.png" alt="register" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
