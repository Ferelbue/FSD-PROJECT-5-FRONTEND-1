
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { LogOut } from '../LogOut/LogOut';
import { Profile } from '../Profile/Profile';
import { Appointments } from '../Appointments/Appointments';
import { NewAppointment } from '../NewAppointment/NewAppointment';
import { Services } from '../Services/Services';
import { Users } from '../Users/Users';
import { ProfileById } from '../ProfileById/ProfileById';
import { AppointmentsById } from '../AppointmentsById/AppointmentsById';

export const Body = () => {

    return(
        <Routes>
            <Route path="*" element={<Navigate to={"/"} replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/newAppointment" element={<NewAppointment />} />
            <Route path="/services" element={<Services />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profileById/:userId" element={<ProfileById/>} />
            <Route path="/appointmentsById/:userId" element={<AppointmentsById/>} />
        </Routes>
    )
}
