"use client";

import React from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { IconMapPin } from "@tabler/icons-react";
import { RootState } from "@/app/redux/store";

const SideBar = () => {
  const menuItems = [
    {
      name: "Officiators",
      url: "/dashboard/officiators",
    },
    {
      name: "Feedback",
      url: "/dashboard/feedback",
    },
  ];

  const parish = useSelector((state: RootState) => state.auth.parish);

  return (
    <section className={styles.overallContainer}>
      <Link
        style={{ textDecoration: "none", color: "#fff" }}
        href="/"
        className={styles.sidebarLogo}
      >
        Akowe
      </Link>
      <div className={styles.menuItems}>
        {menuItems &&
          menuItems.map((menu, index) => (
            <div key={index}>
              <Link style={{ textDecoration: "none" }} href={menu.url}>
                <p className={styles.menu}>{menu.name}</p>
              </Link>
            </div>
          ))}
      </div>
      <div className={styles.parishContainer}>
        <span>
          <IconMapPin />
        </span>{" "}
        <p>{parish}</p>
      </div>
    </section>
  );
};

export default SideBar;
