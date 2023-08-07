import PageNav from '../components/PageNav';

import styles from './PageNotFound.module.css';

export default function PageNotFound() {
  return (
    <main className={styles["not-found"]}>
      <PageNav />
      <h1>Page not found 😢</h1>
    </main>
  );
}
