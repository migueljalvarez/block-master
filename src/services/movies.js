import { db } from "../config/firebase/firebaseConfig";

const findAll = async () => {
  const movies = await db.collection("/Movies").get();
  const list = [];
  movies.forEach((movie) => {
    list.push({
      id: movie.id,
      ...movie.data(),
    });
  });
  return list;
};

const findById = async (id)=> {
  const movie = await db.doc(`/Movies/${id}`).get();
  return movie.data()
}
export default { findAll, findById };
