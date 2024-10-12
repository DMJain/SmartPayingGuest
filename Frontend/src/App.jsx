import { Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import SigninPage from './pages/sign-in';
import SignupPage from './pages/sign-up';
import HomePage from './pages/Homepage';
import ExplorePage from './pages/ExplorePage';
import PgDetailPage from './pages/PgDetailPage';
import CreatePage from './pages/CreatePage';
import BookingPage from './pages/bookingPage';
import AdminDashBoard from './pages/AdminDashBoard';
import UserDashBoard from './pages/UserDashBoard';
import ChatPage from './pages/ChatPage';

import './App.css';
import OnSuccess from './pages/bookingPage/onSuccess';

function App() {
    return (
        <>  

            <Navbar />

            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/sign-in" element={<SigninPage />} />
                    <Route path="/sign-up" element={<SignupPage />} />
                    <Route path="/ad/:id" element={<PgDetailPage />} />
                    <Route path="/create-ad" element={<CreatePage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/admin" element={<AdminDashBoard />} />
                    <Route path="/user" element={<UserDashBoard />} />
                    <Route path="/success" element={<OnSuccess />} />
                    <Route path="/chat" element={<ChatPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
