"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SairButton() {
  const router = useRouter();

  async function sair() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={sair}
      className="focus-ring rounded-lg border border-line px-3 py-1.5 text-xs text-textMuted transition-colors hover:text-textPrimary"
    >
      Sair
    </button>
  );
}
