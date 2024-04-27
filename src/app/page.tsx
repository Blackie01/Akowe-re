'use client'
import styles from "./page.module.css";
import Login from "./auth/login";

export default function Home() {
  return (
    <main className={styles.main}>
      <Login />
    </main>
  );
}
