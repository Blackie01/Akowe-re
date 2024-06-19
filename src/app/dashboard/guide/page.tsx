import React from "react";
import styles from "./guide.module.css";

const Guide = () => {
  return (
    <section style={{ marginTop: "2rem" }} className={styles.overallContainer}>
      <div>
        <h2 className={styles.divHeaders}>Welcome to <span>Akowe</span></h2>
        <p className={styles.divText}>Here&apos;s a guide to get you started.</p>
      </div>

      <div>
        <h3 className={styles.divHeaders}>What it is:</h3>
        <p className={styles.divText}>
          Akowe is the all-round algorithm-powered tool for your Secretary
          duties in the Celestial Church
        </p>
      </div>

      <div>
        <h3 className={styles.divHeaders}>What it can do:</h3>
        <p className={styles.divText}>
          For now, Akowe can help you generate your officiation roster in few
          minutes. <br />
          Others features are coming soon.
        </p>
      </div>

      <div>
        <h3 className={styles.divHeaders}>How to use it:</h3>
        <ul className={styles.divText}>
          <li>Go to &apos;Officiators&apos; in the menu </li>
          <li>Click on &apos;Add officiation entry&apos; button</li>
          <li>Enter the name and rank of officiator</li>
          <li>
            Choose at least one permission (what they can do) for the officiator
          </li>
          <li>
            Enforcements (specifying a duty for an officiator) are optional
          </li>
          <li>Click on &apos;Save Entry&apos;</li>
          <li>
            Don&apos;t panic at the compulsory requirements you see. Just read and
            follow them
          </li>
        </ul>
      </div>

      <div>
        <h3 className={styles.divHeaders}>How enforcements work:</h3>
        <ul className={styles.divText}>
          <li>Select a date (July 2024 only for now)</li>
          <li>Choose the officiation type to enforce for the officiator</li>
          <li>Click on &apos;Save Enforcement&apos;</li>
          <li>Then, you can &apos;Save Entry&apos;</li>
        </ul>
      </div>

      <div>
        <h3 className={styles.divHeaders}>Compulsory requirements</h3>
        <ol className={styles.divText}>
          <li>Roster can only be generated for July 2024</li>
          <li>You must make a minimum of 5 entries to generate roster</li>
          <li>You must select each of the permissions at least once</li>
          <li>Not following 2 and 3 will disable roster generation button</li>
        </ol>
      </div>

      <div>
        <h3 className={styles.divHeaders}>Generating Roster</h3>
        <ul className={styles.divText}>
          <li>
            After following all compulsory requirements, click &apos;Generate Roster&apos;
          </li>
          <li>
            If there is an issue with your entries, you&apos;ll get an error message.
            Click the reload button.
          </li>
          <li>If successful, your roster will be generated and displayed</li>
          <li>Click on the download button to download as pdf</li>
          <li>
            You can then leave a feedback on your experience with Akowe, if you
            want
          </li>
        </ul>
      </div>

      <div>
        <h4 className={styles.divHeaders}>Thank you for using Akowe</h4>
        <p className={styles.divText}>More features coming soon</p>
      </div>

      <div>
        <p className={styles.divText}>
          Built by{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/aanuoluwapo-ayodeji-995904261/"
          >
            Aanuoluwapo
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/oludamola-oni-76bb00161/"
          >
            Oludamola
          </a>
        </p>
      </div>
    </section>
  );
};

export default Guide;
