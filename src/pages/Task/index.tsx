import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useQueryClient } from '@tanstack/react-query'
import {
  Task,
  useCreateTaskMutation,
  useGetTaskQuery,
  useMakeCompleteTaskMutation,
} from '../../apis'
import Spinner from '../../components/Spinner'

const Tasks = () => {
  const [value, setValue] = useState('')
  const [filter, setFilter] = useState('all')
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { data: tasks, isLoading } = useGetTaskQuery(filter)

  const { mutate: createTask } = useCreateTaskMutation({
    onSuccess: () => {
      toast(t('task.create'), {
        position: 'top-right',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      queryClient.invalidateQueries(['getTasks'])
    },
  })

  const { mutate: makeCompleteTask } = useMakeCompleteTaskMutation({
    onSuccess: () => {
      toast(t('task.makeComplete'), {
        position: 'top-right',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      queryClient.invalidateQueries(['getTasks'])
    },
  })

  if (isLoading) return <Spinner />
  return (
    <div>
      <TaskInput
        type="text"
        placeholder={t('task.placeholder')}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <TaskButton
        type="button"
        onClick={() => {
          if (!value) {
            toast.error(t('task.blankValue'))
            return
          }
          setValue('')
          createTask({
            name: value,
            isComplete: false,
          })
        }}
      >
        {t('task.createBtn')}
      </TaskButton>
      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="ml-12"
      >
        <option value="all">{t('filter.all')}</option>
        <option value="completed">{t('filter.completed')}</option>
        <option value="incomplete">{t('filter.incomplete')}</option>
      </select>
      {tasks?.data.map((task: Task) => {
        return (
          <div
            className="flex justify-center items-center gap-10"
            key={task.id}
          >
            <li key={task.id} className="my-4 mx-8">
              <span className={`${task?.isComplete ? 'line-through' : ''}`}>
                {task.name}
              </span>
            </li>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={e =>
                makeCompleteTask({
                  id: task?.id,
                  name: task?.name,
                  isComplete: e.target.checked,
                })
              }
            />
          </div>
        )
      })}
    </div>
  )
}

export default Tasks

const TaskInput = styled.input.attrs({
  className:
    'w-1/2 px-2 py-1 my-4 mx-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300',
})``

const TaskButton = styled.button.attrs({
  className:
    'px-6 py-1 text-sm rounded shadow bg-emerald-100 hover:bg-emerald-200 text-emerald-500',
})``
