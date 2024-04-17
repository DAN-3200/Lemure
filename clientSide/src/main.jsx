import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Design from './pages/Design'
import App from './pages/App'

function Base() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<Design />}></Route>
				<Route path='/old' element={<App/>}></Route>
			</Routes>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Base />
	</React.StrictMode>
)
