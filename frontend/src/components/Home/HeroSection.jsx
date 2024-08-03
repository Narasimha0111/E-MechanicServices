import React, { useContext} from 'react';
import { FaServicestack, FaUsers, FaUserPlus } from "react-icons/fa";
import { Context } from '../../main';

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Services",
      icon: <FaServicestack />,
    },
    {
      id: 2,
      title: "2,34,200",
      subTitle: "Customers",
      icon: <FaUsers />,
    },
    {
      id: 3,
      title: "1,03,761",
      subTitle: "Mechanics",
      icon: <FaUserPlus />,
    },
  ];
  const {user} = useContext(Context);
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title" style={{color:user && user.role === 'Customer' ? 'black' : 'white' , backgroundImage: user && user.role === 'Customer' ? `url('/repair.jpeg')` : user && user.role === 'Mechanic' ? `url('/r.webp')` : `url('/car4.png')` }}>
            <h4>Keeping you on the <br/>
            road with service you<br/> can trust</h4>
            <p>- We use top quality auto parts brands,<br/> and are bent on making your road trips<br/> safe and comfortable! </p>
          </div>
         
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HeroSection