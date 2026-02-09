"use client";

import { useState } from "react";
import LangSwitch from "../components/LangSwitch";
import { useLang } from "../components/LanguageProvider";
import { dict } from "../lib/i18n";

export default function LoginPage() {
  const { lang } = useLang();
  const t = dict[lang];

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
        // ✅ логін успішний → cookie поставлена сервером
        window.location.href = "/dashboard";
      } else {
        alert(data?.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      alert("Network error. Try again.");
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <LangSwitch />
      </div>

      <h1>{t.loginTitle}</h1>
      <p>{t.loginSubtitle}</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 320, marginTop: 16 }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        No account? <a href="/register">Create one</a>
      </p>
    </main>
  );
}
