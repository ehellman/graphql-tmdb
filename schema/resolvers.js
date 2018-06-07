const fetch = require('node-fetch')

const TMDB_API_PATH = 'https://api.themoviedb.org/3'

const resolvers = {
  Query: {
    movies: (root, args, context) => {
      // Wrapping a REST API with GraphQL is simple, you just describe the
      // result in the schema above, and call fetch in the resolver
      // See a complete tutorial: https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
      return fetch(
          `${TMDB_API_PATH}/search/movie?api_key=${
          context.secrets.TMDB_API_KEY
        }&query=${args.query}&include_adult=false`
        )
        .then(res => res.json())
        .then(({
          results
        }) => results)
    },
    config: (_, $, context) => {
      return fetch(
        `${TMDB_API_PATH}/configuration?api_key=${context.secrets.TMDB_API_KEY}`
      ).then(res => res.json())
    },
    movie: (root, args, context) => {
      return fetch(
        `${TMDB_API_PATH}/movie/${args.id}?api_key=${
          context.secrets.TMDB_API_KEY
        }`
      ).then(res => res.json())
    },
    popular: (root, args, context) => {
      return fetch(
          `${TMDB_API_PATH}/movie/popular/?api_key=${
          context.secrets.TMDB_API_KEY
        }`
        )
        .then(res => res.json())
        .then(({
          results
        }) => results)
        .catch(err => err)
    }
  },
  Movie: {
    relatedMovies: (root, args, context) => {
      console.log(root)
      return [
        "3214",
        true,
        4222
      ]
      // retun fetch('api').then(d => d.json())
    }
  }
}

module.exports = resolvers