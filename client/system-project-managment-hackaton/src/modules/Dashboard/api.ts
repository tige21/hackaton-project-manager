import {baseApi} from "../../api/api.ts";

export const projectsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: (projectId: string, userId?: string) => `dashboard?projectId=${projectId}&userId=${userId}`,
        }),
        getTasks: builder.query({
            // query: (projectId: string, userId?: string) => `tasks?projectId=${projectId}&userId=${userId}`,
            query: () => `tasks`,
        }),
        addProject: builder.mutation({
            query: (newProject) => ({
                url: 'projects',
                method: 'POST',
                body: newProject,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetDashboardQuery, useGetTasksQuery } = projectsApi;