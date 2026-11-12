"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthShell from "@/components/AuthShell";

// Mude para true quando o login com Google estiver configurado no Supabase.
const GOOGLE_ATIVO = false;

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setError(
        error.message.includes("already registered")
          ? "Esse e-mail já tem conta."
          : error.message.includes("at least")
          ? "A senha precisa ter pelo menos 6 caracteres."
          : error.message.includes("invalid")
          ? "Esse e-mail não parece válido. Confira se digitou certo."
          : "Não deu pra criar a conta agora. Tenta de novo em instantes."
      );
      return;
    }

    // Sem confirmação por e-mail, o Supabase já devolve a sessão: entra direto.
    if (data.session) {
      router.push("/app");
      router.refresh();
      return;
    }

    setSent(true);
  }

  async function handleGoogleSignup() {
    setError(null);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  if (sent) {
    return (
      <AuthShell
        eyebrow="quase lá"
        title="Confirma seu e-mail."
        subtitle=""
        footer={
          <Link href="/login" className="text-textOnLight font-medium underline underline-offset-4">
            Voltar pro login
          </Link>
        }
      >
        <p className="text-sm text-[#4A4766] leading-relaxed">
          Mandamos um link de confirmação pra <strong className="text-textOnLight">{email}</strong>.
          Clica nele pra ativar sua conta e começar a trilha.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="criar conta"
      title="Comece sua trilha."
      subtitle="Leva menos de um minuto."
      footer={
        <p>
          Já tem conta?{" "}
          <Link href="/login" className="text-textOnLight font-medium underline underline-offset-4">
            Entrar
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-medium text-[#4A4766]">
            Nome
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus-ring rounded-lg border border-[#B9B7C9] bg-white px-3.5 py-2.5 text-sm text-textOnLight placeholder:text-[#7E7B98]"
            placeholder="Como podemos te chamar"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-[#4A4766]">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-ring rounded-lg border border-[#B9B7C9] bg-white px-3.5 py-2.5 text-sm text-textOnLight placeholder:text-[#7E7B98]"
            placeholder="voce@email.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-medium text-[#4A4766]">
            Senha
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring rounded-lg border border-[#B9B7C9] bg-white px-3.5 py-2.5 text-sm text-textOnLight"
            placeholder="mínimo 6 caracteres"
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
          {loading ? "Criando..." : "Criar conta"}
        </button>

        {GOOGLE_ATIVO && (
          <>
        <div className="flex items-center gap-3 my-1">
          <span className="h-px flex-1 bg-[#B9B7C9]" />
          <span className="text-xs text-[#7E7B98]">ou</span>
          <span className="h-px flex-1 bg-[#B9B7C9]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="focus-ring rounded-lg border border-[#B9B7C9] bg-white py-2.5 text-sm font-medium text-textOnLight"
        >
          Continuar com Google
        </button>
          </>
        )}
      </form>
    </AuthShell>
  );
}
