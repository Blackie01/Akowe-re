import React, { useEffect, useState } from "react";
import "./intro.css";

export default function Intro() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const leftDiv = document.getElementById("left");
      const rightDiv = document.getElementById("right");
      if (leftDiv && rightDiv) {
        leftDiv.style.transform = "translateX(-100%)";
        rightDiv.style.transform = "translateX(100%)";
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCount((previousCount) => previousCount - 1);
    }, 1000);

    if (count === 0) {
      const counter = document.getElementById("counter");
      if (counter) {
        counter.style.opacity = '0';
      }
      return;
    }

    return () => clearInterval(timerInterval);
  }, [count]);

  return (
    <section className="pageContainer">
      <div id="left" className="page">
        AKO
        <sub id="counter" className="count">
          {count}
        </sub>
      </div>
      <div id="right" className="page">
        WE
      </div>
    </section>
  );
}
