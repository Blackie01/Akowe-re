// ServiceTable.js
"use client";
import React from "react";
import "./roster.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const Roster = ({ services }: any) => {
  const parish: any = useSelector((state: RootState) => state.auth.parish);

  return (
    <section style={{marginTop: '2rem'}}>
      <h1 className="parishName">CCC {parish.toUpperCase()}</h1>
      <h4 className="serviceId">SERVICE ROSTER FOR JULY, 2024</h4>
      <section className="tableContainer">
        <table className="service-table">
          <thead>
            <tr>
              <th style={{border: '1px solid #007C7C', backgroundColor: '#007C7C'}}>DAY/DATE</th>
              <th style={{border: '1px solid #007C7C', backgroundColor: '#007C7C'}}>CONDUCTOR</th>
              <th style={{border: '1px solid #007C7C', backgroundColor: '#007C7C'}}>1ST BIBLE LESSON AND READER</th>
              <th style={{border: '1px solid #007C7C', backgroundColor: '#007C7C'}}>2ND BIBLE LESSON AND READER</th>
              <th style={{border: '1px solid #007C7C', backgroundColor: '#007C7C'}}>SERMONER</th>
            </tr>
          </thead>
          <tbody>
            {services &&
              services.map((service: any, index: number) => (
                <tr
                  key={index}
                  className={service.day === "Sunday" ? "sunday-row" : ""}
                >
                  <td style={{border: '1px solid #007C7C'}}>
                    <div>{service.day}</div>
                    <div className="bold">{service.date}</div>
                  </td>
                  <td style={{border: '1px solid #007C7C'}}>{service.conductor}</td>
                  <td style={{border: '1px solid #007C7C'}}>
                    <div className="bold">{service.first_lesson.lesson}</div>
                    <div>{service.first_lesson.reader}</div>
                  </td>
                  <td style={{border: '1px solid #007C7C'}}>
                    {service.second_lesson && (
                      <>
                        <div className="bold">
                          {service.second_lesson.lesson}
                        </div>
                        <div>{service.second_lesson.reader}</div>
                      </>
                    )}
                  </td>
                  <td style={{border: '1px solid #007C7C'}}>{service.preacher}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Roster;
