import {api} from '@/store/services/index';
import { IArtist } from '@/interfaces/IArtist';

const musicApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArtists: build.query<IArtist[], void>({
      query: () => `/artists`,
    }),
  }),
  overrideExisting: false,
})

export const { useGetArtistsQuery } = musicApi;