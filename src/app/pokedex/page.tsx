export const runtime = "edge";
export const revalidate = 3600;

export default async function Pokedex() {
  return (
    <h1 className="text-2xl mb-4 font-bold">
      Hello pokedex!
    </h1>
  );
}
