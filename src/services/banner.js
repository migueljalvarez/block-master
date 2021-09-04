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
const create = async (data) => {
  try {
    const banner = await db.collection("/Banner").add({
      name: data.name,
      imageUrl: data.imageUrl,
      movieId: data.movieId,
    });

    const doc = await banner.get();
    const result = {
      id: banner.id,
      ...doc.data(),
    };
    return result;
  } catch (error) {
    return error;
  }
};
const Banner = { findAll, create };
export default Banner;
