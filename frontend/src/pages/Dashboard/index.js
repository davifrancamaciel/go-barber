import React from 'react';
import api from '~/services/api'
// import { Wrapper } from './styles';

function Dashboard() {
    // console.tron('dash')
    api.get('appointments')
  return <h1>Dashboard</h1>;
}

export default Dashboard;