import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import BusinessAcc from "./pages/BusinessAcc";


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/header" element={<Header />} />
					<Route path='/businessacc' element={<BusinessAcc/>}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
