import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { Link } from 'react-router-dom';

const DelSidebar = () => {
  const sideMenu = [
    { title: 'Dashboard', icon: <SpaceDashboardIcon sx={{ fontSize: 30 }} />, path: 'DelDashboard' },
    { title: 'Orders', icon: <ShoppingBagIcon sx={{ fontSize: 30 }} />, path: 'DelOrderManagement' },
    { title: 'Earnings', icon: <AttachMoneyIcon sx={{ fontSize: 30 }} />, path: 'DelEarnings' },
    { title: 'Notification', icon: <NotificationsIcon sx={{ fontSize: 30 }} />, path: 'DelNotifications' },
    { title: 'Profile', icon: <PersonIcon sx={{ fontSize: 30 }} />, path: 'DelProfile' },
    { title: 'Setting', icon: <SettingsIcon sx={{ fontSize: 30 }} />, path: 'DelSettings' },
    { title: 'Support', icon: <SupportIcon sx={{ fontSize: 30 }} />, path: 'DelSupport' },
    { title: 'Logout', icon: <LogoutIcon sx={{ fontSize: 30 }} />, path: '/DelLogin' },
  ];

  return (
    <div className='mt-[78px] w-60 h-[520px] shadow-xl fixed z-10'>
      <ul className='flex flex-col gap-2 px-2 pt-4 w-full'>
        {sideMenu.map((item, index) => (
          <Link to={item.path} key={index}>
            <li className='flex gap-4 items-center text-center hover:bg-neutral-200 rounded-md p-3 w-full'>
              <span>{item.icon}</span>
              <span className='text-lg font-poppins'>{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DelSidebar;
