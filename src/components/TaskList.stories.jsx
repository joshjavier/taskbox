import TaskList from "./TaskList";
import * as TaskStories from './Task.stories'

import { Provider } from "react-redux";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { updateTaskState } from "../lib/store";

// A super-simple mock of the state of the store
export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null
}

// A super-simple mock of a redux store
const MockStore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState
          }
        }).reducer
      }
    })}
  >
    {children}
  </Provider>
)

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/
}

export const Default = {
  decorators: [
    story => <MockStore taskboxState={MockedState}>{story()}</MockStore>
  ]
}

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedtasks = [
        ...MockedState.tasks.slice(0, 5),
        { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' }
      ]

      return (
        <MockStore taskboxState={{ ...MockedState, tasks: pinnedtasks }}>{story()}</MockStore>
      )
    }
  ]
}

export const Loading = {
  decorators: [
    (story) => (
      <MockStore
        taskboxState={{ ...MockedState, status: 'loading' }}
      >
        {story()}
      </MockStore>
    )
  ]
}

export const Empty = {
  decorators: [
    (story) => (
      <MockStore
        taskboxState={{
          ...MockedState,
          tasks: []
        }}
      >
        {story()}
      </MockStore>
    )
  ]
}
