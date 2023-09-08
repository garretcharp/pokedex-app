export const runtime = "edge";
export const revalidate = 3600;

export default async function ViewPokemon({ params: { id } }: { params: { id: string } }) {
  return (
    <h1>View Pokemon {id}</h1>
  );
}
