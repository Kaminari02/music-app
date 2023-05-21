import {api} from '@/store/services/index';
import { ITrack } from '@/interfaces/ITrack';

const trackApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTracks: build.query<ITrack[], string | undefined>({
      query: (albumId) => `tracks?album=${albumId}`
    }),
  }),
  overrideExisting: false,
})

export const { useGetTracksQuery } = trackApi;