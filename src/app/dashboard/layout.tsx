'use client'

import React from "react";
import SideBar from "./layout/sidebar";
import styles from './dashboard.module.css'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const DashboardLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  const username = useSelector((state: RootState) => state.auth.name)

  return (
    <section className={styles.overallDashboard}>
      <div className={styles.sidebarContainer}>
        <SideBar />
      </div>

      <div className={styles.canvas}>
        <div className={styles.dashboardHeader}><p>Hello, {username || 'user'}</p></div>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default DashboardLayout;
