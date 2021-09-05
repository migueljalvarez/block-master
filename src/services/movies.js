import { db } from "../config/firebase/firebaseConfig";
const collection = "Movies";

let firtsDocument = null;
let lastDocument = null;

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
        isSearch: true,
      },
    });
  });
};

const findAll = (dispatch, types) => {
  return db
    .collection(`/${collection}`)
    .orderBy("year", "desc")
    .limit(20)
    .onSnapshot((snapshot) => {
      const movies = [];
      lastDocument = snapshot.docs[snapshot.docs.length - 1];
      firtsDocument = snapshot.docs[0];
      snapshot.forEach((movie) => {
        movies.push({
          id: movie.id,
          ...movie.data(),
        });
      });
      dispatch({
        type: types.movieList,
        payload: movies,
      });
    });
};

const findByRate = (dispatch, types, opt) => {
  switch (opt.action) {
    case "top":
      return db
        .collection(`/${collection}`)
        .where("rate", ">", 5)
        .limit(20)
        .onSnapshot((snapshot) => {
          const movies = [];
          lastDocument = snapshot.docs[snapshot.docs.length - 1];
          firtsDocument = snapshot.docs[0];
          snapshot.forEach((movie) => {
            movies.push({
              id: movie.id,
              ...movie.data(),
            });
          });

          dispatch({
            type: types.moviesTop,
            payload: movies,
          });
        });
    case "least":
      return db
        .collection(`/${collection}`)
        .where("rate", "<=", 5)
        .limit(20)
        .onSnapshot((snapshot) => {
          const movies = [];
          lastDocument = snapshot.docs[snapshot.docs.length - 1];
          firtsDocument = snapshot.docs[0];
          snapshot.forEach((movie) => {
            movies.push({
              id: movie.id,
              ...movie.data(),
            });
          });
          dispatch({
            type: types.moviesLeast,
            payload: movies,
          });
        });
    case "nextPage":
      return db
        .collection(`/${collection}`)
        .where("rate", ">", 5)
        .limit(20)
        .orderBy("rate", "asc")
        .startAfter(lastDocument)
        .onSnapshot((snapshot) => {
          const movies = [];
          snapshot.forEach((movie) => {
            movies.push({
              id: movie.id,
              ...movie.data(),
            });
          });
          dispatch({
            type: types.moviesLeast,
            payload: movies,
          });
        });
    case "prevPage":
      return db
        .collection(`/${collection}`)
        .where("rate", "<=", 5)
        .limit(20)
        .orderBy("rate", "asc")
        .startAfter(lastDocument)
        .onSnapshot((snapshot) => {
          const movies = [];
          snapshot.forEach((movie) => {
            movies.push({
              id: movie.id,
              ...movie.data(),
            });
          });
          dispatch({
            type: types.moviesLeast,
            payload: movies,
          });
        });
    default:
      break;
  }
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

const next = (dispatch, types) => {
  return db
    .collection(`/${collection}`)
    .orderBy("year", "desc")
    .startAfter(lastDocument)
    .limit(20)
    .onSnapshot((snapshot) => {
      const movies = [];
      snapshot.forEach((movie) => {
        movies.push({
          id: movie.id,
          ...movie.data(),
        });
      });
      dispatch({
        type: types.movieList,
        payload: movies,
      });
    });
};
const previous = (dispatch, types) => {
  return db
    .collection(`/${collection}`)
    .orderBy("year", "desc")
    .startAfter(firtsDocument)
    .startAt(firtsDocument)
    .limit(20)
    .onSnapshot((snapshot) => {
      const movies = [];
      snapshot.docs.forEach((movie) => {
        movies.push({
          id: movie.id,
          ...movie.data(),
        });
      });
      dispatch({
        type: types.movieList,
        payload: movies,
      });
    });
};

const Movies = {
  findAll,
  findById,
  create,
  update,
  search,
  next,
  previous,
  findByRate,
};
export default Movies;
