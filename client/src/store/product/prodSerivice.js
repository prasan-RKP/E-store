import { prodInstance } from "../../lib/prodInstance.js";

// ================= ACCESSORIES =================

export const fetchAccsUser = async () => {
  const response = await prodInstance.get("/fetchAccess");
  return response.data;
};

// ================= MEN CLOTH =================

export const fetchingMenClothUser = async () => {
  const response = await prodInstance.get("/fetchMenCloth");
  return response.data;
};

// ================= WOMEN CLOTH =================

export const fetchingWomenClothUser = async () => {
  const response = await prodInstance.get("/fetchWomenCloth");
  return response.data;
};

// ================= FOOTWEAR =================

export const fetchingFootWearUser = async () => {
  const response = await prodInstance.get("/fetchFootwear");
  return response.data;
};
