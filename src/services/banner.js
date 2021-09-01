import { db } from "../config/firebase/firebaseConfig";

const findAll = async () => {
  const banners = await db.collection("/Banner").get();
  const list = [];
  banners.forEach((banner) => {
    list.push({
      id: banner.id,
      ...banner.data(),
    });
  });
  return list;
};
export default { findAll };
