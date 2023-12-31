import { api } from "@/store/services/index";
import { IArtist } from "@/interfaces/IArtist";

const artistApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArtists: build.query<IArtist[], void>({
      query: () => `/artists`,
      providesTags: ["Artist"],
    }),
    addArtist: build.mutation<IArtist, FormData>({
      query: (body) => ({
        url: `/artists`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Artist"],
    }),
    updateArtist: build.mutation<IArtist, { id: string; body: IArtist }>(
      {
        query({id, body}) {
          return {
            url: `/artists/${id}/publish`,
            method: "put",
            body
          };
        },
        invalidatesTags: ["Artist"]
      }
    ),
    deleteArtist: build.mutation<IArtist , string >({
        query:(id) => ({
               url:`/artists/${id}`,
               method:'delete',
        }),
        invalidatesTags:['Artist', 'Album' , 'Track']
    }),
  }),
  overrideExisting: false,
});

export const { useGetArtistsQuery, useAddArtistMutation, useUpdateArtistMutation, useDeleteArtistMutation } = artistApi;
