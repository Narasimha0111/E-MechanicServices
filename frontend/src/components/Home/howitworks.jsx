import React from 'react'
import {FaUserPlus} from 'react-icons/fa'
import {MdFindInPage} from 'react-icons/md'
import {IoMdSend} from 'react-icons/io'
const Howitworks = () => {
  return (
    <div className='howitworks'>
      <div className="container">
        <h3>How MechGo Works</h3>
        <div className="banner">
          
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>Users have to create their account using mail id and mentioning their role to continue to their regular activities.</p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Post a Request</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem inventore dolores cum soluta hic nihil?</p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>My Requests</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem inventore dolores cum soluta hic nihil?</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Howitworks