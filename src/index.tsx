import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '@routes/Home';
import store from '@features/store';
// import reportWebVitals from '@reportWebVitals';
import Twitch from '@routes/Twitch';
import NotFound from '@routes/NotFound';
import App from '@container/App';
import {
	PATH_HOME,
	PATH_TWITCH,
	PATH_SETTINGS,
	PATH_SETTINGS_FILTER,
} from '@utils/constants';
import Settings from '@routes/Settings';
import VoiceSettings from '@routes/VoiceSettings';
import FilterSettings from '@routes/FilterSettings';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path={PATH_HOME} element={<App />}>
					<Route index element={<Home />} />
					<Route path={PATH_SETTINGS} element={<Settings />}>
						<Route index element={<VoiceSettings />} />
						<Route path={PATH_SETTINGS_FILTER} element={<FilterSettings />} />
						<Route path="*" element={<Navigate to={PATH_SETTINGS} />} />
					</Route>
				</Route>
				<Route path={PATH_TWITCH} element={<Twitch />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
