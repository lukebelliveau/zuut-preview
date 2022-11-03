import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import MainHeader from './main/MainHeader';

export default function LogoOnlyLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
