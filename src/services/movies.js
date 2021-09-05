import { db } from "../config/firebase/firebaseConfig";
const collection = "Movies";

const search = (search, dispatch, types) => {
  return db.collection(`/${collection}`).onSnapshot((snapshot) => {
    const list = [];
    snapshot.forEach((movie) => {
      list.push({
        id: movie.id,
        ...movie.data(),
      });
    });
    const regexp = new RegExp(search, "i");
    const movies = list.filter((movie) => regexp.test(movie.name));
    dispatch({
      type: types.search,
      payload: movies,
    });
    dispatch({
      type: types.searchTitle,
      payload: {
        isSearch: true
      }
    });
  });
};

const findByRate = async (field, op, value) => {
  const movies = await db
    .collection(`/${collection}`)
    .where(field, op, value)
    .limit(20)
    .get();
  const list = [];
  movies.forEach((movie) => {
    list.push({
      id: movie.id,
      ...movie.data(),
    });
  });
  return list;
};

const findAll = async () => {
  const movies = await db
    .collection(`/${collection}`)
    .orderBy("year", "desc")
    .limit(20)
    .get();
  const list = [];
  movies.forEach((movie) => {
    list.push({
      id: movie.id,
      ...movie.data(),
    });
  });
  return list;
};

const findById = async (id) => {
  const movie = await db.doc(`/${collection}/${id}`).get();
  return movie.data();
};

const create = async (data) => {
  try {
    const movie = await db.collection(`/${collection}`).add({
      name: data.name,
      description: data.description,
      gender: data.gender,
      duration: data.duration,
      year: Number(data.year),
      rate: Number(data.rate),
      imageUrl: data.imageUrl,
      trailerUrl: data.trailerUrl,
    });

    const doc = await movie.get();
    const result = {
      id: movie.id,
      ...doc.data(),
    };
    return result;
  } catch (error) {
    return error;
  }
};

const update = async (id, data) => {
  const movie = db.doc(`/${collection}/${id}`);
  return movie
    .update({
      name: data.name,
      description: data.description,
      gender: data.gender,
      duration: data.duration,
      year: parseInt(data.year),
      rate: parseFloat(data.rate),
      imageUrl: data.imageUrl,
      trailerUrl: data.trailerUrl,
    })
    .then(async () => {
      const doc = await movie.get();
      const result = {
        id: doc.id,
        ...doc.data(),
      };
      return result;
    })
    .catch((error) => error);
};
const Movies = {
  findAll,
  findById,
  create,
  update,
  findByRate,
  search,
};
export default Movies;
