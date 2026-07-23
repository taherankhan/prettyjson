import styles from "@/app/page.module.css";

/** Hero background — aurora wash + floating orbs, pure CSS */
export default function HeroBackground() {
    return (
        <div className={styles.heroBg} aria-hidden="true">
            <div className={styles.heroAmbient} />
            <div className={styles.heroAurora} />
            <div className={styles.orb1} />
            <div className={styles.orb2} />
            <div className={styles.orb3} />
        </div>
    );
}
