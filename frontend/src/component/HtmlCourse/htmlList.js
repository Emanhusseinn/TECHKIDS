import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './htmlData';
import './htmlList.css';

import axios from 'axios';

/********************************************************/
function HtmlList() {
  // false means it's not showing
  const [ sidebar, setSidebar   ] = useState(false);
  const [ id ,     setId        ] = useState();
  const [lesson , setLesson     ] = useState([]);
  const showSidebar = () => setSidebar(!sidebar);
  
  
  const getLesson = async() => {
    try {
    const retrevd = await axios.get("http://localhost:8000/course/html/"+id)  
    setLesson(retrevd.data)
    console.log("lesson id ="+id)
     console.log(lesson)
     
    } catch (error) {
      alert(error)
    }
  };

  return (
    <>
      
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' >
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars' onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={(event)=>{setId(event.currentTarget.dataset.id)}} data-id={item.id} >
                  <Link to={item.path} >
                    
                    <span onClick={getLesson}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="courseBox">
          <h1>{lesson.Titles}</h1>
          <p>{lesson.Desceriptions}</p>
          <iframe width="600" height="400" src={lesson.Videos}frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>  
                 
      
    </>
  );
}

export default HtmlList;
