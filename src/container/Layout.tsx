import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
