import React, { useEffect } from 'react'
import { useAppContext } from '../components/AppContext';
import { useNavigate } from 'react-router-dom';

//Components
import WebcamStream from '../components/WebcamStream';
import SocketTestComponent from '../components/SocketTest';

const AdminDashboard = () => {
  const { loggedInUser } = useAppContext();
  const navigate = useNavigate();

  console.log(loggedInUser)

  useEffect(() => {
    const checkUserRole = () => {
      if (loggedInUser?.role !== 'dm') {
        navigate('/');
      }
    };

    checkUserRole();
  }, [loggedInUser, navigate]);

  return (
    <div>AdminDashboard

      <SocketTestComponent />
    </div>
  )
}

export default AdminDashboard