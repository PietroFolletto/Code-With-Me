"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthShell from "@/components/AuthShell";

// Mude para true quando o login com Google estiver configurado no Supabase.
const GOOGLE_ATIVO = false;

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos."
          : "Não deu pra entrar agora. Tenta de novo em instantes."
      );
      return;
    }

    router.push("/app");
    router.refresh();
  }

  async function handleGoogleLogin() {
    setError(null);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <AuthShell
      eyebrow="entrar"
      title="Bora treinar lógica."
      subtitle="Entre com sua conta pra continuar sua trilha."
      footer={
        <p>
          Novo por aqui?{" "}
          <Link href="/signup" className="text-textOnLight font-medium underline underline-offset-4">
            Criar conta
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-[#5B6270]">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-ring rounded-lg border border-[#DCD8CE] bg-white px-3.5 py-2.5 text-sm text-textOnLight placeholder:text-[#A7ADB8]"
            placeholder="voce@email.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-medium text-[#5B6270]">
            Senha
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring rounded-lg border border-[#DCD8CE] bg-white px-3.5 py-2.5 text-sm text-textOnLight"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-[#B4483A]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-2 rounded-lg bg-textOnLight py-2.5 text-sm font-medium text-white transition-opacity disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {GOOGLE_ATIVO && (
          <>
        <div className="flex items-center gap-3 my-1">
          <span className="h-px flex-1 bg-[#DCD8CE]" />
          <span className="text-xs text-[#A7ADB8]">ou</span>
          <span className="h-px flex-1 bg-[#DCD8CE]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="focus-ring flex items-center justify-center gap-2 rounded-lg border border-[#DCD8CE] bg-white py-2.5 text-sm font-medium text-textOnLight"
        >
          <GoogleIcon />
          Continuar com Google
        </button>
          </>
        )}
      </form>
    </AuthShell>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.94v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.16.28-1.7V4.97H.94A9 9 0 0 0 0 9c0 1.45.35 2.83.94 4.03l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .94 4.97l3.01 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}
