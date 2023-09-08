/* eslint-disable @next/next/no-img-element */
import z from "zod";
import { getPokemonImage } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { db } from "@/bindings";
import { revalidatePath } from "next/cache";

export const runtime = "edge";
export const revalidate = 0;

const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
      }),
      is_hidden: z.boolean(),
    })
  ),
  moves: z.array(
    z.object({
      move: z.object({
        name: z.string(),
      }),
    })
  ),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string(),
      }),
    })
  ),
})

async function getPokemon(id: string) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
    if (res.status !== 200) throw new Error("Failed to fetch");

    return res.json();
  });

  return PokemonSchema.parse(data);
}

async function isPokemonCaught(id: string) {
  const data = await db.prepare('SELECT * FROM Pokedex WHERE id = ?').bind(Number(id)).first();

  console.log({ data })

  return !!data
}

async function catchPokemon(form: FormData) {
  "use server";
  const id = form.get("id");

  if (typeof id !== "string") throw new Error("Invalid ID");

  const pokemon = await getPokemon(id);

  await db.prepare('INSERT INTO Pokedex (id, name, abilities, types) VALUES (?, ?, ?, ?)').bind(
    pokemon.id,
    pokemon.name,
    JSON.stringify(pokemon.abilities),
    JSON.stringify(pokemon.types),
  ).run()

  revalidatePath(`/pokemon/${id}`)
  revalidatePath(`/pokedex`)
}

async function releasePokemon(form: FormData) {
  "use server";
  const id = form.get("id");

  if (typeof id !== "string") throw new Error("Invalid ID");
  else if (Number.isNaN(Number(id))) throw new Error("Invalid ID");

  await db.prepare('DELETE FROM Pokedex WHERE id = ?').bind(Number(id)).run()

  revalidatePath(`/pokemon/${id}`)
  revalidatePath(`/pokedex`)
}

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

        <form action={isCaught ? releasePokemon : catchPokemon}>
          <input type="hidden" name="id" value={pokemon.id} />
          <button className="bg-blue-500 text-white rounded-lg px-5 py-2">
            {!isCaught ? "Catch Pokemon" : "Release Pokemon"}
          </button>
        </form>
      </CardFooter>
    </Card>
  );
}
