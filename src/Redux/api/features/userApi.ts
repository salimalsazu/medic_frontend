import { tagTypes } from "../../tag-types";
import { baseApi } from "../../api/baseApi";
const USER_API = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: `${USER_API}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateUserInfo: build.mutation({
      query: ({ id, body }) => ({
        url: `${USER_API}/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `${USER_API}/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getMyProfile: build.query({
      query: () => ({
        url: `${USER_API}/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateMyProfile: build.mutation({
      query: (data) => ({
        url: `${USER_API}/update-my-profile`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateMyUserInfo: build.mutation({
      query: (data) => ({
        url: `${USER_API}/update-my-email-password`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserInfoMutation,
  useDeleteUserMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateMyUserInfoMutation,
} = userApi;