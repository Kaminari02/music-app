import {api} from '@/store/services/index';
import { IArtist } from '@/interfaces/IArtist';
import { IAlbum } from '@/interfaces/IAlbum';
import { ITrack } from '@/interfaces/ITrack';

const musicApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArtists: build.query<IArtist[], void>({
      query: () => `/artists`,
    }),
    getAlbums: build.query<IAlbum[], string | undefined>({
      query: (artistId) => `/albums?artist=${artistId}`
    }),
    getTracks: build.query<ITrack[], string | undefined>({
      query: (albumId) => `tracks?album=${albumId}`
    })
  }),
  overrideExisting: false,
})

export const { useGetArtistsQuery, useGetAlbumsQuery, useGetTracksQuery } = musicApi;