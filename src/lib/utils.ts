import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { binding } from "cf-bindings-proxy";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPokemonImage(id: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export const db = binding<D1Database>("DB");
