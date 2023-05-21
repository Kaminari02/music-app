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
    })
  }),
  overrideExisting: false,
})

export const { useGetTracksQuery, useAddTrackMutation } = trackApi;