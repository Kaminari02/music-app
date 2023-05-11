import { api } from "./index";
import { IUser } from "@/interfaces/IUser";
import { UserForm } from "@/interfaces/UserForm";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IUser, UserForm>({
      query: (body) => ({
        url: "/auth/signup",
        method: "post",
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;

export default authApi;
