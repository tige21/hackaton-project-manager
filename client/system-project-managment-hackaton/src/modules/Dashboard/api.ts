import {baseApi} from "../../api/api.ts";
import {ITask, ITasksByStatuses} from "./type";

export const projectsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: (projectId: string, userId?: string) => `dashboard?projectId=${projectId}&userId=${userId}`,
        }),
        getTasks: builder.query<ITask[], void>({
            // query: (projectId: string, userId?: string) => `tasks?projectId=${projectId}&userId=${userId}`,
            query: () => `api/tasks`,
        }),
        getTasksByStatuses: builder.query<ITasksByStatuses, string>({
            query: (projectId: string) => `tasks/project/${projectId}/statuses`
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

export const { useGetDashboardQuery, useGetTasksQuery, useGetTasksByStatusesQuery } = projectsApi;