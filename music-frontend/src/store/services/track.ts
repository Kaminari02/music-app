import {api} from '@/store/services/index';
import { ITrack } from '@/interfaces/ITrack';
import { IPostTrack } from '@/interfaces/IPostTrack';

const trackApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTracks: build.query<ITrack[], string | undefined>({
      query: (albumId) => `tracks?album=${albumId}`,
      providesTags: ['Track']
    }),
    addTrack: build.mutation<ITrack, IPostTrack>({
        query: (body) => ({
          url: `/tracks`,
          method: 'post',
          body
        }),
        invalidatesTags: ['Track'],
    }),
    updateTrack: build.mutation<ITrack, { id: string; body: ITrack }>(
        {
          query({id, body}) {
            return {
              url: `/tracks/${id}/publish`,
              method: "put",
              body
            };
          },
          invalidatesTags: ["Track"]
        }
    ),
    deleteTrack: build.mutation<ITrack , string >({
        query:(id) => ({
               url:`/tracks/${id}`,
               method:'delete',
        }),
        invalidatesTags:['Track']
    }),
  }),
  overrideExisting: false,
})

export const { useGetTracksQuery, useAddTrackMutation, useUpdateTrackMutation, useDeleteTrackMutation } = trackApi;