import {api} from '@/store/services/index';
import { ITrackHistory } from '@/interfaces/ITrackHistory';

const musicApi = api.injectEndpoints({
  endpoints: (build) => ({
    saveTrack: build.mutation<ITrackHistory, string>({
      query: (id) => ({
        url: "/track_history",
        method: "post",
        body: {id: id},
      }),
      invalidatesTags: ['History'],
    }),
    getTrackHistory: build.query<ITrackHistory[], void>({
      query: () => `/track_history`,
      providesTags: ['History']
    }),
  }),
  overrideExisting: false,
})

export const { useSaveTrackMutation, useGetTrackHistoryQuery } = musicApi;