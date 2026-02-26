"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}

function SignInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError("Nesprávný e-mail nebo heslo.");
          } else if (error.message.includes("Email not confirmed")) {
            setError("E-mail nebyl potvrzen. Zkontrolujte svou schránku.");
          } else {
            setError(error.message);
          }
          return;
        }
        router.push(redirect);
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
          },
        });
        if (error) {
          if (error.message.includes("already registered")) {
            setError("Tento e-mail je již zaregistrován. Přihlaste se.");
          } else {
            setError(error.message);
          }
          return;
        }
        setSuccess(
          "Registrace úspěšná! Zkontrolujte svůj e-mail a potvrďte účet."
        );
      }
    } catch {
      setError("Nastala neočekávaná chyba. Zkuste to znovu.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm rounded-2xl border border-border bg-surface1 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-center font-syne text-2xl font-bold text-text-primary">
          {isLogin ? "Přihlášení" : "Registrace"}
        </h1>
        <p className="mt-2 text-center text-sm text-text-muted">
          {isLogin
            ? "Přihlaste se pro přístup k dashboardu"
            : "Vytvořte si účet zdarma"}
        </p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-text-muted">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="vas@email.cz"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-muted">Heslo</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder={isLogin ? "Vaše heslo" : "Minimálně 6 znaků"}
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isLoading
              ? "Načítám..."
              : isLogin
              ? "Přihlásit se"
              : "Zaregistrovat se"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setSuccess(null);
            }}
            className="text-sm text-text-muted hover:text-accent"
          >
            {isLogin
              ? "Nemáte účet? Zaregistrujte se"
              : "Již máte účet? Přihlaste se"}
          </button>
        </div>

        {!isLogin && (
          <p className="mt-4 text-center text-xs text-text-muted">
            Registrací souhlasíte s{" "}
            <Link href="/podminky-sluzby" className="text-accent hover:underline">
              Podmínkami služby
            </Link>{" "}
            a{" "}
            <Link
              href="/ochrana-osobnich-udaju"
              className="text-accent hover:underline"
            >
              Ochranou osobních údajů
            </Link>
            .
          </p>
        )}
      </motion.div>
    </div>
  );
}
