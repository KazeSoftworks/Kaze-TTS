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
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path={PATH_HOME} element={<App />}>
					<Route index element={<Home />} />
					<Route path={PATH_SETTINGS} element={<Settings />}>
						<Route index element={<VoiceSettings />} />
						<Route path={PATH_SETTINGS_FILTER} element={<VoiceSettings />} />
						<Route path="*" element={<Navigate to={PATH_SETTINGS} />} />
					</Route>
				</Route>
				<Route path={PATH_TWITCH} element={<Twitch />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
