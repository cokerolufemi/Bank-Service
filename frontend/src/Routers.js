import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProctectedRoutes";
import ErrorPage from "./components/ErrorPage";



function Routers() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route path="/" element={<Register />} />
				<Route path="/login" element={<Login />} />
                <Route path="*" element={<ErrorPage/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default Routers;