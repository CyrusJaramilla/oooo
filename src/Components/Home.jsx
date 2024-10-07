import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import hh from './hh.jpg'; 
import { useAuth } from '../AuthFiles/AuthContext';
import Add from './Add'; 

const Home = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [bsitItems, setBsitItems] = useState([{ path: "/citextension", name: "CIT EXTENSION" }]);
  const [bsedItems, setBsedItems] = useState([{ path: "/coedextension", name: "COED EXTENSION" }]);
  const [bseItems, setBseItems] = useState([{ path: "/coeextension", name: "COE EXTENSION" }]);
  const [casItems, setCasItems] = useState([{ path: "/coasextension", name: "COAS EXTENSION" }]);

  const [isBsitOpen, setIsBsitOpen] = useState(bsitItems.some(item => location.pathname.includes(item.path)));
  const [isBsedOpen, setIsBsedOpen] = useState(bsedItems.some(item => location.pathname.includes(item.path)));
  const [isBseOpen, setIsBseOpen] = useState(bseItems.some(item => location.pathname.includes(item.path)));
  const [isCasOpen, setIsCasOpen] = useState(casItems.some(item => location.pathname.includes(item.path)));

  const toggleBsitDropdown = () => setIsBsitOpen(!isBsitOpen);
  const toggleBsedDropdown = () => setIsBsedOpen(!isBsedOpen);
  const toggleBseDropdown = () => setIsBseOpen(!isBseOpen);
  const toggleCasDropdown = () => setIsCasOpen(!isCasOpen);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const addBsitItem = () => {
    const itemName = prompt("Enter the name of the new CIT item:");
    if (itemName) {
      const newItem = { path: `/cit-${itemName.toLowerCase()}`, name: itemName };
      setBsitItems([...bsitItems, newItem]);
    }
  };

  const addBsedItem = () => {
    const itemName = prompt("Enter the name of the new BSED item:");
    if (itemName) {
      const newItem = { path: `/bsed-${itemName.toLowerCase()}`, name: itemName };
      setBsedItems([...bsedItems, newItem]);
    }
  };

  const addBseItem = () => {
    const itemName = prompt("Enter the name of the new BSE item:");
    if (itemName) {
      const newItem = { path: `/bse-${itemName.toLowerCase()}`, name: itemName };
      setBseItems([...bseItems, newItem]);
    }
  };

  const addCasItem = () => {
    const itemName = prompt("Enter the name of the new CAS item:");
    if (itemName) {
      const newItem = { path: `/cas-${itemName.toLowerCase()}`, name: itemName };
      setCasItems([...casItems, newItem]);
    }
  };

  const [showAddEntry, setShowAddEntry] = useState(false);
  const toggleAddEntry = () => setShowAddEntry(!showAddEntry);

  return (
    <div className='home-container'>
      <div className='sidebar'>
        <a href="/base" className='j'>
          <img src={hh} alt="Logo" />
        </a>
        <hr className='flex' />
        <ul className='column'>
          <li className='nav-item'>
            <NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'link active-link' : 'link')}>
              <i className="fa fa-dashboard" aria-hidden="true" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className='nav-item' onClick={toggleBsitDropdown}>
            <div className='link'>
              <i className="fa fa-desktop" aria-hidden="true" />
              <span>CIT</span>
              <i className={`fa fa-chevron-${isBsitOpen ? 'up' : 'down'}`} />
              <i className="fa fa-plus" onClick={addBsitItem} style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
            {isBsitOpen && (
              <ul className='dropdown'>
                {bsitItems.map((item, index) => (
                  <li key={index}>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className='nav-item' onClick={toggleBsedDropdown}>
            <div className='link'>
              <i className="fa fa-graduation-cap" aria-hidden="true" />
              <span>COED</span>
              <i className={`fa fa-chevron-${isBsedOpen ? 'up' : 'down'}`} />
              <i className="fa fa-plus" onClick={addBsedItem} style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
            {isBsedOpen && (
              <ul className='dropdown'>
                {bsedItems.map((item, index) => (
                  <li key={index}>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className='nav-item' onClick={toggleBseDropdown}>
            <div className='link'>
              <i className="fa fa-calculator" aria-hidden="true" />
              <span>COE</span>
              <i className={`fa fa-chevron-${isBseOpen ? 'up' : 'down'}`} />
              <i className="fa fa-plus" onClick={addBseItem} style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
            {isBseOpen && (
              <ul className='dropdown'>
                {bseItems.map((item, index) => (
                  <li key={index}>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className='nav-item' onClick={toggleCasDropdown}>
            <div className='link'>
              <i className="fa fa-flask" aria-hidden="true" />
              <span>CAS</span>
              <i className={`fa fa-chevron-${isCasOpen ? 'up' : 'down'}`} />
              <i className="fa fa-plus" onClick={addCasItem} style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
            {isCasOpen && (
              <ul className='dropdown'>
                {casItems.map((item, index) => (
                  <li key={index}>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className='nav-item'>
            <div className='link' onClick={toggleAddEntry}>
              <span>ADD</span>
              <i 
                className="fa fa-plus" 
                style={{ marginLeft: '10px', cursor: 'pointer' }} 
              />
            </div>
          </li>

          <li className='logout'>
            <button onClick={handleLogout}>Logout</button>    
          </li>
        </ul>
      </div>

      <div className="content">
        {children}
        {showAddEntry && <Add />} 
      </div>
    </div>
  );
}

export default Home;
