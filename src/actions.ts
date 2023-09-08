"use server";
import z from "zod";
import { db } from "@/bindings";

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

export async function getPokemon(id: string) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
    if (res.status !== 200) throw new Error("Failed to fetch");

    return res.json();
  });

  return PokemonSchema.parse(data);
}

export async function catchPokemon(form: FormData) {
  const id = form.get("id");

  if (typeof id !== "string") throw new Error("Invalid ID");

  const pokemon = await getPokemon(id);

  await db.prepare('INSERT INTO Pokedex (id, name, abilities, types) VALUES (?, ?, ?, ?)').bind(
    pokemon.id,
    pokemon.name,
    JSON.stringify(pokemon.abilities),
    JSON.stringify(pokemon.types),
  ).run()
}

export async function releasePokemon(form: FormData) {
  "use server";
  const id = form.get("id");

  if (typeof id !== "string") throw new Error("Invalid ID");
  else if (Number.isNaN(Number(id))) throw new Error("Invalid ID");

  await db.prepare('DELETE FROM Pokedex WHERE id = ?').bind(Number(id)).run()
}

export async function isPokemonCaught(id: string) {
  const data = await db.prepare('SELECT * FROM Pokedex WHERE id = ?').bind(Number(id)).first();

  console.log({ data })

  return !!data
}
