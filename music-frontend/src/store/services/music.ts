import {api} from '@/store/services/index';
import { IArtist } from '@/interfaces/IArtist';
import { IAlbum } from '@/interfaces/IAlbum';

const musicApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArtists: build.query<IArtist[], void>({
      query: () => `/artists`,
    }),
    getAlbums: build.query<IAlbum[], string | undefined>({
      query: (artistId) => `/albums?artist=${artistId}`
    })
  }),
  overrideExisting: false,
})

export const { useGetArtistsQuery, useGetAlbumsQuery } = musicApi;