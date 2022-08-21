import SaveRepository from "./SaveRepository";
import { save } from "./save";

export type SaveObject = {
  id: number;
};

export function getSaveData(id?: number): SaveObject {
  if (id === undefined) {
    const startingSystem = generateInitialGameState([10, 10]);
    return {
      id: Math.random() * new Date().getTime(),
    };
  }

  const sr = new SaveRepository(save);
  const saveData = sr.getById(id);
  return {
    id: saveData.id,
  };
}
/** In the absence of save data, generate a random world state */
export function generateInitialGameState(startingCoordinates) {
  //TODO:
}
