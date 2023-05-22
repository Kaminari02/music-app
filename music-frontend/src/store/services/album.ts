import {api} from '@/store/services/index';
import { IAlbum } from '@/interfaces/IAlbum';

const albumApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAlbums: build.query<IAlbum[], void>({
        query: () => `/albums`,
        providesTags: ['Album']
    }),
    getAlbumsByArtist: build.query<IAlbum[], string | undefined>({
      query: (artistId) => `/albums?artist=${artistId}`,
      providesTags: ['Album']
    }),
    addAlbum: build.mutation<IAlbum, FormData>({
        query: (body) => ({
          url: `/albums`,
          method: 'post',
          body
        }),
        invalidatesTags: ['Album'],
    }),
    updateAlbum: build.mutation<IAlbum, { id: string; body: IAlbum }>(
        {
          query({id, body}) {
            return {
              url: `/albums/${id}/publish`,
              method: "put",
              body
            };
          },
          invalidatesTags: ["Album"]
        }
      ),
  }),
  overrideExisting: false,
})

export const {  useGetAlbumsQuery, useGetAlbumsByArtistQuery, useAddAlbumMutation, useUpdateAlbumMutation } = albumApi;