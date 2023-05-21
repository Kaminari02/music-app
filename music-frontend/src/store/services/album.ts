import {api} from '@/store/services/index';
import { IAlbum } from '@/interfaces/IAlbum';

const albumApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAlbums: build.query<IAlbum[], string | undefined>({
      query: (artistId) => `/albums?artist=${artistId}`
    }),
  }),
  overrideExisting: false,
})

export const {  useGetAlbumsQuery } = albumApi;