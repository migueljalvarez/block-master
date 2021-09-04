import Movies from "../services/movies.js"
import MoviesCollection from "../utils/MoviesCollection.js"

const bulkCreate = (collection)=>{
  collection.forEach(element => {
    Movies.create(element).then((data)=>{
      console.log(data)
    })
  });
}
bulkCreate(MoviesCollection)