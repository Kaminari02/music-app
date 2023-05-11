import {api} from '@/store/services/index';
import { IArtist } from '@/interfaces/IArtist';
import { IAlbum } from '@/interfaces/IAlbum';
import { ITrack } from '@/interfaces/ITrack';
import { ITrackHistory } from '@/interfaces/ITrackHistory';

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
    }),
    saveTrack: build.mutation<ITrackHistory, string>({
      query: (id) => ({
        url: "/track_history",
        method: "post",
        body: {id: id},
        invalidatesTags: ['History'],
      }),
    }),
    getTrackHistory: build.query<ITrackHistory[], void>({
      query: () => `/track_history`,
      providesTags: () => [{type: 'History', id: 'LIST'}]
    }),
  }),
  overrideExisting: false,
})

export const { useGetArtistsQuery, useGetAlbumsQuery, useGetTracksQuery, useSaveTrackMutation, useGetTrackHistoryQuery } = musicApi;