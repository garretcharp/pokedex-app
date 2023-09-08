/* eslint-disable @next/next/no-img-element */
import { getPokemonImage } from "@/lib/utils";
import { getPokedex } from "@/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PokemonCatchReleaseForm from "@/components/CatchReleaseForm";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const runtime = "edge";
export const revalidate = 0;

export default async function Pokedex() {
  const pokemon = await getPokedex();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
      {pokemon.map((pokemon) => {
        return (
          <Card className="flex flex-col items-center" key={pokemon.id}>
            <CardHeader>
              <CardTitle className="font-bold text-4xl">{pokemon.name}</CardTitle>
            </CardHeader>

            <CardContent className="">
              <img src={getPokemonImage(pokemon.id.toString())} alt={pokemon.name} className="w-full" />
            </CardContent>

            <CardFooter className="flex flex-col items-start">
              <div>
                <h2>Types:</h2>
                <div className="flex flex-wrap gap-1">
                  {pokemon.types.map((type) => (
                    <Badge key={type.type.name}>
                      {type.type.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h2>Abilities:</h2>
                <div className="flex flex-wrap gap-1">
                  {pokemon.abilities.filter(ability => !ability.is_hidden).map((ability) => (
                    <Badge key={ability.ability.name}>
                      {ability.ability.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <PokemonCatchReleaseForm id={pokemon.id.toString()} caught={true} reload={true} />
            </CardFooter>
          </Card>
        )
      })}
    </div>
  );
}
