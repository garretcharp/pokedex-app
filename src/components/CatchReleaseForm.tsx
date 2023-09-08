'use client';
import { catchPokemon, releasePokemon } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PokemonCatchReleaseForm({ id, caught, reload }: { id: string, caught: boolean, reload?: boolean }) {
  const [isCaught, setIsCaught] = useState(caught);
  const router = useRouter()

  return (
    <form action={async (data) => {
      if (isCaught) {
        await releasePokemon(data);
        setIsCaught(false);
      } else {
        await catchPokemon(data);
        setIsCaught(true);
      }

      if (reload) {
        router.refresh();
      }
    }}>
      <input type="hidden" name="id" value={id} />
      <button className="bg-blue-500 text-white rounded-lg px-5 py-2">
      {!isCaught ? "Catch Pokemon" : "Release Pokemon"}
      </button>
    </form>
  );
}
