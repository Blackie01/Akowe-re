"use client";

import React, { useState, useRef, useEffect } from "react";
import SideBar from "./layout/sidebar";
import styles from "./dashboard.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IconMenu2, IconX } from "@tabler/icons-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const username = useSelector((state: RootState) => state.auth.name);

  const [openMenu, setOpenMenu] = useState<Boolean>(false);
  console.log("open menu", openMenu);

  const handleHamburger = () => {
    setOpenMenu(!openMenu);
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = openMenu
        ? "translateX(-100vw)"
        : "translateX(0)";
    }
  };

  useEffect(() => {}, [openMenu]);

  return (
    <section className={styles.overallDashboard}>
      <div className={styles.sidebarContainer} ref={sidebarRef}>
        <SideBar />
      </div>

      <div className={styles.canvas}>
        <div className={styles.dashboardHeader}>
          <p>Hello, {username || "user"}</p>
          <div className={styles.hamburger} onClick={handleHamburger}>
            {openMenu ? <IconX /> : <IconMenu2 />}
          </div>
        </div>
        <div style={{backgroundColor: '#fff'}}>{children}</div>
      </div>
    </section>
  );
};

export default DashboardLayout;
