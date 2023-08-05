import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/FakeAuthContext';
import { ButtonType } from '../types/button';
import Button from '../components/Button';
import PageNav from '../components/PageNav';
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  useEffect(function() {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (!email || !password) return;

    login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={ButtonType.PRIMARY}>Login</Button>
        </div>
      </form>
    </main>
  );
}
