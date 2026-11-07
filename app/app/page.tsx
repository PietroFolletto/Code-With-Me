import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AppHome() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-code text-xs text-accentDim mb-2">login funcionando</p>
        <h1 className="font-display text-2xl text-textPrimary mb-2">
          E aí, {user.user_metadata?.full_name || user.email}!
        </h1>
        <p className="text-textMuted text-sm">
          Aqui entra a trilha de exercícios — próxima etapa do projeto.
        </p>
      </div>
    </main>
  );
}
