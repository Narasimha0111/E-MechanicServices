import React from 'react'
import {
  MdCleaningServices,
  MdOutlineTimer ,
  MdElectricCar,
  MdOutlineWindPower ,
  MdWorkspacePremium ,
} from "react-icons/md";
import { FaFilter,FaOilCan,FaCarBattery} from "react-icons/fa";
import { GiCarWheel} from "react-icons/gi";
import {PiHeadlights} from 'react-icons/pi';
import {BsFillFuelPumpFill} from 'react-icons/bs';


const PopularCategory = () => {
  const categories = [
    {
      id: 1,
      title: "Periodic Services",
      subTitle: "305 Active Services",
      icon: <MdOutlineTimer  />,
    },
    {
      id: 2,
      title: "Deep All Round Spa",
      subTitle: "500 Active Services",
      icon: <MdCleaningServices />,
    },
    {
      id: 3,
      title: "Premium Top Wash",
      subTitle: "200 Active Services",
      icon: <MdWorkspacePremium  />,
    },
    {
      id: 4,
      title: "AC service & repair",
      subTitle: "1000+ Active Services",
      icon: <MdOutlineWindPower  />,
    },
    {
      id: 5,
      title: "Tyres & wheel care",
      subTitle: "150 Active Services",
      icon: <GiCarWheel />,
    },
    {
      id: 6,
      title: "Car Inspections",
      subTitle: "867 Active Services",
      icon: <MdCleaningServices />,
    },
    {
      id: 7,
      title: "Fuel Emergency",
      subTitle: "50 Active Services",
      icon: <BsFillFuelPumpFill />,
    },
    {
      id: 8,
      title: "WindShields & Lights",
      subTitle: "80 Active Services",
      icon: <PiHeadlights />,
    },
    {
      id: 9,
      title: "Breaks & Batteries",
      subTitle: "160 Active Services",
      icon: <FaCarBattery />,
    },
    {
      id: 10,
      title: "Oil Exchange & Break Fluid Check",
      subTitle: "210 Active Services",
      icon: <FaOilCan />,
    },
    {
      id: 11,
      title: "Air Filter",
      subTitle: "120 Active Services",
      icon: < FaFilter />,
    },{
      id: 12,
      title: "Electric Services",
      subTitle: "180 Active Services",
      icon: <MdElectricCar />,
    },
  ];
  return (
    <div className='categories'>
      <h3>POPULAR CATEGORIES</h3>
      <div className='banner'>
      {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default PopularCategory