import {api} from '@/store/services/index';
import { IArtist } from '@/interfaces/IArtist';

const artistApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArtists: build.query<IArtist[], void>({
      query: () => `/artists`,
      providesTags: ['Artist']
    }),
    addArtist: build.mutation<IArtist, FormData>({
      query: (body) => ({
        url: `/artists`,
        method: 'post',
        body
      }),
      invalidatesTags: ['Artist'],
    })
  }),
  overrideExisting: false,
})

export const { useGetArtistsQuery, useAddArtistMutation} = artistApi;