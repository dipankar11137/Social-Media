import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CreateAccount from "./Components/Login/CreateAccount";
import Login from "./Components/Login/Login";
import RequireAuth from "./Components/Login/RequireAUth";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Inquires from "./Components/Pages/Dashboard/Inquire/Inquires";
import ShowAllQueries from "./Components/Pages/Dashboard/ShowAllQueries/ShowAllQueries";
import Home from "./Components/Pages/Home/Home";
// import QuizSection from "./Components/Pages/Quiz/QuizSection";
import Navbar from "./Components/Share/Navbar";
import NotFound from "./Components/Share/NotFound";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inputText, setInputText] = useState('');
   const [searchGet, setSearchGet] = useState([]);

     useEffect(() => {
       const handleScroll = () => {
         const scrollTop =
           window.pageYOffset || document.documentElement.scrollTop;
         setIsScrolled(scrollTop > 0);
       };

       window.addEventListener('scroll', handleScroll);

       return () => {
         window.removeEventListener('scroll', handleScroll);
       };
     }, []);
  return (
    <div>
      {/* <CreateAccount /> */}
      <div
        className={`fixed  bg-white w-full shadow-md top-0 ${
          isScrolled ? ' fixed top-0 z-50 duration-1000' : ''
        }`}
      >
        <Navbar setSearchGet={setSearchGet} />
      </div>

      <Routes>
        <Route path="/" element={<Home searchGet={searchGet} />}></Route>
       
        <Route path="/createAccount" element={<CreateAccount />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />}></Route>

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<ShowAllQueries />} />
          <Route path="inquire" element={<Inquires />} />
          {/* <Route path="bookings" element={<Bookings />} />
          <Route path="manageDoctor" element={<ManageDoctors />} />
          <Route path="editDoctor/:id" element={<EditDoctor />} />
          <Route path="manageContact" element={<ManageContacts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contact" element={<Contact />} /> */}
        </Route>
      </Routes>
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
