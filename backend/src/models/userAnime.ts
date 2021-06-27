import { Schema, model } from 'mongoose';

const userAnimeSchema = new Schema({
  mal_id: Number,
  username: String,
  statistics: {
    total_anime: Number,
    episodes_watched: Number,
    genres: [
      {
        name: String,
        count: Number,
        animes: [
          {
            name: String,
            image: String
          }
        ]
      }
    ]
  }
})

export const userAnime = model('', userAnimeSchema);