"use client";

import { useState } from "react";
import { dict } from "../lib/i18n";

export default function LoginPage() {
  const t = dict;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (res.ok && data?.ok) {
        window.location.href = "/dashboard";
      } else {
        alert(data?.error || "Login failed");
      }
    } catch {
      setLoading(false);
      alert("Network error. Try again.");
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>{t.loginTitle}</h1>
      <p>{t.loginSubtitle}</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 320, marginTop: 16 }}>
        <input
          type="email"
          placeholder={t.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder={t.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? t.loading : t.signIn}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        {t.noAccount} <a href="/register">{t.createAccount}</a>
      </p>
    </main>
  );
}
