/* eslint-disable @next/next/no-img-element */
import z from "zod";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { getPokemonImage } from "@/lib/utils";

export const runtime = "edge";
export const revalidate = 3600;

const PokemonListSchema = z.object({
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
})

async function getPokemonList() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000").then((res) => {
    if (res.status !== 200) throw new Error("Failed to fetch");

    return res.json();
  });

  return PokemonListSchema.parse(data).results;
}

export default async function Home() {
  const pokemon = await getPokemonList();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
      {pokemon.map((item) => {
        const id = item.url.split('/').filter(Boolean).pop();

        if (!id) return null;

        return (
          <div key={item.name} className="p-3">
            <h2>Pokemon: {item.name}</h2>

            <div className="max-w-[200px] max-h-[200px]">
              <AspectRatio ratio={1}>
                <img src={getPokemonImage(id)} alt={item.name} className="w-full" />
              </AspectRatio>
            </div>
          </div>
        )
      })}
    </div>
  );
}
