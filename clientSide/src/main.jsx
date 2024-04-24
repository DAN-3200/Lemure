import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Design from './pages/Design'

function Base() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<Design />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Base />
	</React.StrictMode>
)
