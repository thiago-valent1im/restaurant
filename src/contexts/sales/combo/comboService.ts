import Combo from "./comboModel";
import { CreateComboRequest } from "./comboType";

export async function createCombo(data: CreateComboRequest) {
  const combo = await Combo.create(data);
  return combo;
}

export async function getAllCombos() {
  return await Combo.find();
}

export async function hasCombos(
  combos: {
    comboId: string;
    selections: {
      sectionId: string;
      productId: string;
      price: number;
    }[];
  }[],
) {
  const result = await Combo.find({
    $or: combos.map((combo) => ({
      _id: combo.comboId,
      $and: combo.selections.map((selection) => ({
        sections: {
          $elemMatch: {
            _id: selection.sectionId,
            options: {
              $elemMatch: {
                productId: selection.productId,
                price: selection.price,
              },
            },
          },
        },
      })),
    })),
  });

  if (result.length !== combos.length) {
    throw new Error("Some combos were not found or have an invalid price");
  }

  return result;
}
