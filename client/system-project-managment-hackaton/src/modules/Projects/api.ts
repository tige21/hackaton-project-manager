import { baseApi } from "../../api";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProjects: builder.query<IProject[], void>({
      query: () => "", // Assuming the API endpoint is `/projects`
    }),
    addProject: builder.mutation({
      query: (newProject: {
        name: string;
        description: string;
        startDate: string;
        endDate: string;
      }) => ({
        url: "",
        method: "POST",
        body: newProject,
      }),
    }),
  }),
  overrideExisting: false, // Чтобы не перезаписать другие эндпоинты
});

export const { useGetUserProjectsQuery, useAddProjectMutation } = projectsApi;
