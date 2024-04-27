'use client'

import React from "react";
import "./sidebar.css";
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
  ];

  const parish = useSelector((state: RootState) => state.auth.parish)

  return (
    <section className="overallContainer">
      <Link
        style={{ textDecoration: "none", color: "#fff" }}
        href="/"
        className="sidebarLogo"
      >
        Akowe
      </Link>
      <div className="menuItems">
        {menuItems && menuItems.map((menu, index) => (
          <div key={index}>
            <Link style={{ textDecoration: "none" }} href={menu.url}>
              <p className="menu">{menu.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="parishContainer">
       <span><IconMapPin/></span> <p>{parish}</p>
      </div>
    </section>
  );
};

export default SideBar;
