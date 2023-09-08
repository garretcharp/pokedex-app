/* eslint-disable @next/next/no-img-element */
import { getPokemonImage } from "@/lib/utils";
import { getPokedex, getPokemonList } from "@/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PokemonCatchReleaseForm from "@/components/CatchReleaseForm";
import Link from "next/link";

export const runtime = "edge";
export const revalidate = 3600;

export default async function Home() {
  const [pokemon, pokedex] = await Promise.all([
    getPokemonList(),
    getPokedex()
  ])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
      {pokemon.map((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        if (!id) return null;

        const isCaught = !!pokedex.find(pokemon => pokemon.id.toString() === id);

        return (
          <Card className="flex flex-col items-center" key={id}>
            <CardHeader>
              <CardTitle className="font-bold text-4xl">{pokemon.name}</CardTitle>
            </CardHeader>

            <CardContent className="">
              <img src={getPokemonImage(id)} alt={pokemon.name} className="w-full" />
            </CardContent>

            <CardFooter className="flex flex-col">
              <Link href={`/pokemon/${id}`} className="bg-blue-500 text-white rounded-lg px-5 py-2">View Details</Link>

              <Separator className="my-4" />

              <PokemonCatchReleaseForm id={id} caught={isCaught} />
            </CardFooter>
          </Card>
        )
      })}
    </div>
  );
}
