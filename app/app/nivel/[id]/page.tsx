import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getNivel } from "@/lib/trilha";
import NivelPlayer from "@/components/NivelPlayer";

export default async function NivelPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const id = Number(params.id);
  const nivel = getNivel(id);
  if (!nivel) notFound();

  if (id > 1) {
    const { data: anterior } = await supabase
      .from("progresso")
      .select("concluido")
      .eq("user_id", user.id)
      .eq("nivel_id", id - 1)
      .maybeSingle();

    if (!anterior?.concluido) redirect("/app");
  }

  return <NivelPlayer nivel={nivel} />;
}
