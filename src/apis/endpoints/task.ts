import { AxiosResponse } from 'axios'
import {
  MutationFunction,
  MutationOptions,
  QueryFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import request from '../request'
import { QueryOptions } from '../types'

export type Task = {
  id: number
  name: string
  isComplete: boolean
}

export enum TaskFilterEnum {
  ALL = 'all',
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete',
}

export type TaskCreate = Omit<Task, 'id'>

type TaskResponse = {
  get: AxiosResponse<Task[]>
  getOne: AxiosResponse<Task>
  create: AxiosResponse<Task>
  makeComplete: AxiosResponse<Task>
}

// for get action
type TaskQueryKey = {
  get: ['getTasks', string]
  getOne: ['getTaskDetail', number]
}

// for mutation action
type TaskVariables = {
  create: TaskCreate
  makeComplete: Task
}

type TaskAPI = {
  get: QueryFunction<TaskResponse['get'], TaskQueryKey['get']>
  getOne: QueryFunction<TaskResponse['getOne'], TaskQueryKey['getOne']>
  create: MutationFunction<TaskResponse['create'], TaskVariables['create']>
  makeComplete: MutationFunction<
    TaskResponse['makeComplete'],
    TaskVariables['makeComplete']
  >
}

const task: TaskAPI = {
  get: ({ queryKey: [, filter] }) => {
    if (filter === TaskFilterEnum.COMPLETED)
      return request.get(`/tasks?isComplete=true`)
    if (filter === TaskFilterEnum.INCOMPLETE)
      return request.get(`/tasks?isComplete=false`)
    return request.get(`/tasks`)
  },
  getOne: ({ queryKey: [, id] }) => request.get(`tasks/${id}`),
  create: data => request.post('tasks', data),
  makeComplete: data =>
    request.put(`tasks/${data?.id}`, {
      name: data?.name,
      isComplete: data?.isComplete,
    }),
}

export const useGetTaskQuery = (
  filter: string,
  options?: QueryOptions<TaskResponse['get'], TaskQueryKey['get']>,
) => useQuery(['getTasks', filter], task.get, options)

export const useGetTaskDetailQuery = (
  id: number,
  options?: QueryOptions<TaskResponse['getOne'], TaskQueryKey['getOne']>,
) => useQuery(['getTaskDetail', id], task.getOne, options)

export const useCreateTaskMutation = (
  options?: MutationOptions<
    TaskResponse['create'],
    unknown,
    TaskVariables['create']
  >,
) => useMutation(['createTask'], task.create, options)

export const useMakeCompleteTaskMutation = (
  options?: MutationOptions<
    TaskResponse['makeComplete'],
    unknown,
    TaskVariables['makeComplete']
  >,
) => useMutation(['deleteTask'], task.makeComplete, options)
