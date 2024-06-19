'use client'

import React, { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
// import Intro from "../customComponents/intro";
import { useDispatch } from "react-redux";
import { setAuthDetails } from "../redux/authSlice";
import Loading from "@/app/components/loader";


const Login = () => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const introContainer = document.getElementById("showIntro");
  //     introContainer.style.display = "none";
  //   }, 4000);
  //   return () => clearTimeout(timer);
  // }, []);

  const router = useRouter()
  const dispatch = useDispatch();
  const [username, setUsername] = useState<any>();
  const [parish, setParish] = useState<any>()
  const [email, setEmail] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(false)

  const handleLogin = (e: any) => {
    setLoading(!loading)
    e.preventDefault();
    dispatch(setAuthDetails({ name: username, parish: parish, email: email } as { name: any; parish: any; email: any; } & void));
    router.push("/dashboard/guide");
  };
  return (
    <section className={styles.overallLoginContainer}>
      {/* <div id="showIntro" className={styles.introContainer}>
        <Intro />
      </div> */}
      <div className={styles.loginContainer}>
        <div className={styles.pageTitle}>
          <p className={styles.logo}>Akowe</p>
          <p>Gain access</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            onChange={(e: any) => setUsername(e.target.value)}
            type="text"
            placeholder="Your name"
          />
           <input
            onChange={(e: any) => setParish(e.target.value)}
            type="text"
            placeholder="Your parish"
          />
          <input
            onChange={(e: any) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email address"
          />
          <button className={styles.submit} onSubmit={handleLogin}>
            {loading? <Loading width={"1rem"} height={"1rem"}/> : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
