import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../../hooks/auth.hooks';
import OwnerDashboard from './owner.dashboard';
import UserDashboard from './user.dashboard';
import AdminDashboard from './admin.dashboard';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { data: user, isLoading } = useLoggedInUser();

    useEffect(() => {
        console.log(user, isLoading);
        if (!user && !isLoading) {
            navigate('/sign-in');
        }
    }, [user, navigate, isLoading]);

    if (isLoading) return <h1>Loading...</h1>;

    return (
        <>
            {user.role === 'admin' && <AdminDashboard />}
            {user.role === 'user' && <UserDashboard />}
        </>
    );
};
export default DashboardPage;
