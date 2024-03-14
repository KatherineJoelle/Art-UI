import { Entity, engine } from "@dcl/sdk/ecs";

export interface ArtworkData {
  entity: Entity;
  artworkId: number;
  title: string;
  description: string; 
  visible: boolean;
}

export const artworkData: ArtworkData[] = []


export function addArtworkData(entity: Entity, artworkId: number, title: string, description: string, visible: boolean) {
  artworkData.push({ entity, artworkId, title, description, visible });
}

// components.ts

// Create a map to store artwork IDs associated with entities
export const ArtworkIdMap = new Map<Entity, number>();

// Function to set artwork ID for an entity
export function setArtworkId(entity: Entity, artworkId: number) {
  ArtworkIdMap.set(entity, artworkId);
}

// Function to get artwork ID for an entity
export function getArtworkId(entity: Entity): number | undefined {
  return ArtworkIdMap.get(entity);
}
