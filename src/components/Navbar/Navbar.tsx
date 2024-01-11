import React from 'react';

const Navbar = React.memo((): JSX.Element => {
  return (
    <div className="Navbar">
      <div className="Navbar-Left">
        <a href="/" className="Navbar-Left-Icon">
          Crypto-Converter-App
        </a>
      </div>
      <div className="Navbar-Right">
        {/*    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/services">Services</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu> */}
      </div>
    </div>
  );
});

export default Navbar;
