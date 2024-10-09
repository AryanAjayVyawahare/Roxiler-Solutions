import './App.css';
import React, { useState } from 'react';
import { Layout, Menu, Select } from 'antd';
import Transactions from './components/Transactions';
import Stats from './components/Stats';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '0 20px',
};

const navItems = [
  {
    key: 1,
    label: <NavLink to="/" style={navLinkStyle}>Transactions</NavLink>,
  },
  {
    key: 2,
    label: <NavLink to="/stats" style={navLinkStyle}>Stats</NavLink>,
  },
];

const options = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const App = () => {
  let [month, setMonth] = useState(3);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  return (
    <BrowserRouter>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <h1 style={headerTitleStyle}>Dashboard</h1>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={navItems}
            style={menuStyle}
          />
          <Select
            size="large"
            defaultValue={options[month]}
            onChange={handleMonthChange}
            style={selectStyle}
            options={options.map((text, i) => ({
              value: i,
              label: text,
            }))} 
          />
        </Header>
        <Content style={contentStyle}>
          <Routes>
            <Route path="/" element={
              <div style={componentStyle} className="hover-effect">
                <Transactions month={month} monthText={options[month]} />
              </div>
            } />
            <Route path="/stats" element={
              <div style={componentStyle} className="hover-effect">
                <Stats month={month} monthText={options[month]} />
              </div>
            } />
          </Routes>
        </Content>
        <Footer style={footerStyle}>
          Created by <strong>Aryan Vyawahare</strong>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};


const layoutStyle = {
  minHeight: '100vh',
  backgroundImage: 'url(https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#f0f2f5',
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#283593",
  padding: "0 20px",
};

const headerTitleStyle = {
  color: "#fff",
  margin: 0,
};

const menuStyle = {
  flex: 1,
  padding: "0 60px",
};

const selectStyle = {
  width: 200,
};

const contentStyle = {
  padding: "20px 48px",
  backgroundColor: "#f5f5f5",
  minHeight: 600,
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};


const componentStyle = {
  padding: '20px',
  borderRadius: '46px', 
  backgroundColor: '#ffffff', 
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', 
  transition: 'box-shadow 0.3s ease, transform 0.3s ease', 
};


const footerStyle = {
  textAlign: "center",
  backgroundColor: "#3949ab",
  color: "white",
  padding: "10px 0",
};

export default App;
