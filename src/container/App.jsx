import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';
import '@scss/App.scss';
import SideMenu from '@components/SideMenu/SideMenu';

const App = () => {
	return (
		<>
			<Header />
			<div className="content-container">
				<Outlet />
				<SideMenu />
			</div>
			<Footer />
		</>
	);
};

export default App;
