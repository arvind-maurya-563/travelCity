import { Routes, Route } from "react-router-dom";
import { Footer } from "../Components/Footer/Footer";
import { Navbar } from "../Components/Navbar/Navbar";
import { MainHomePage } from "../Pages/Home_page";
import { HotelsListPage } from "../Pages/HotelListPage";
import MainHotelPage from "../Pages/MainHotelPage";
import { PaymentPage } from "../Pages/Payment_page";
import { SignInPage } from "../Pages/SignIn_page";
import { SignUpPage } from "../Pages/SignUp_page";

import { Carbook } from '../Components/Carbook/Carbook'
import { Carsection } from "../Pages/Carsection";
import { Reserv } from "../Components/ReserveCar/Reserv";


export function RoutesPage() {
    return (
        
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainHomePage/> }></Route>
                <Route path="/hotels" element={<HotelsListPage /> }></Route>
                <Route path="/hotels/:id" element={<MainHotelPage />} ></Route>
                <Route path="/signUp" element={<SignUpPage />}></Route>
                <Route path="/signIn" element={<SignInPage />} ></Route>
                <Route path="/payment" element={<PaymentPage />}></Route>
                <Route path='/carlist' element={<Carsection/>}></Route>
                <Route path='/carreserve/:id' element={<Reserv/>}></Route>
                {/* <Route path='/carreserve/:id' element={<Reserv/>}></Route> */}
            </Routes>
            <Footer />
        </div>
        
    );
}
