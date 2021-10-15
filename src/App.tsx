import React from 'react';
import './App.scss';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import Home from './pages/home/home';
import pageNotFound from './pages/notFound/pageNotFound';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='*' component={pageNotFound} />
			</Switch>
		</Router>
	);
}

export default App;
