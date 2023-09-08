/* eslint-disable @next/next/no-img-element */
import { getPokemonImage } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPokemon, isPokemonCaught } from "@/actions";
import PokemonCatchReleaseForm from "@/components/CatchReleaseForm";

export const runtime = "edge";
export const revalidate = 0;

export default async function ViewPokemon({ params: { id } }: { params: { id: string } }) {
  const [pokemon, isCaught] = await Promise.all([
    getPokemon(id),
    isPokemonCaught(id),
  ]);

  return (
    <Card className="flex flex-col items-center">
      <CardHeader>
        <CardTitle className="font-bold text-6xl">{pokemon.name}</CardTitle>
      </CardHeader>

      <CardContent className="">
        <img src={getPokemonImage(pokemon.id.toString())} alt={pokemon.name} className="max-w-[25vw] w-full" />
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

        <div>
          <h2>Moves:</h2>
          <div className="flex flex-wrap gap-1">
            {pokemon.moves.map((move) => (
              <Badge key={move.move.name}>
                {move.move.name}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <PokemonCatchReleaseForm id={pokemon.id.toString()} caught={isCaught} />
      </CardFooter>
    </Card>
  );
}
