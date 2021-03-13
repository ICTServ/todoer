import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskItem } from '../../components'
import { getAllTasks } from '../../store/actions/taskActions'
import { TaskList, TaskListHeading } from './TaskContainerStyles'
import { format } from 'date-fns'
import { ThemeContext } from '../../App'

export const TaskContainer = ({
  project,
  isComplete,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  sortOptions,
  setDashboardTasks,
  setTasksLoading,
  currentTaskForm = '',
  setCurrentTaskForm = null,
}) => {
  const [taskData, setTaskData] = useState(null)
  const [projectTaskList, setProjectTaskList] = useState(null)
  const [overdueTasks, setOverdueTasks] = useState(null)

  const dispatch = useDispatch()

  const taskList = useSelector(state => state.taskList)
  const { loading: loadingTasks, tasks: allTasks } = taskList

  useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  const fetchData = () => {
    allTasks && setTaskData(allTasks[project?.title])
  }

  useEffect(() => {
    !loadingTasks && fetchData()
  }, [loadingTasks, project, allTasks])

  useEffect(() => {
    const tasksToSort = []
    const tasksToNotSort = []
    const { option, direction } = sortOptions

    taskData?.forEach(task => {
      sortOptions && task[option]
        ? tasksToSort.push(task)
        : tasksToNotSort.push(task)
    })

    switch (option) {
      case 'description':
        tasksToSort.sort((a, b) =>
          a[option].toLowerCase().localeCompare(b[option].toLowerCase())
        )
        break
      case 'dueDate':
        tasksToSort.sort((a, b) => new Date(a[option]) - new Date(b[option]))
        break
      default:
        tasksToSort.sort((a, b) => a[option] - b[option])
    }

    const data = tasksToSort.concat(tasksToNotSort)
    direction === 'desc' && data.reverse()

    setOverdueTasks(allTasks?.overdue)
    setProjectTaskList(data)
    setDashboardTasks(data)
  }, [taskData, sortOptions, project])

  const { darkTheme } = useContext(ThemeContext)

  useEffect(() => {
    console.log(darkTheme)
  }, [darkTheme])

  useEffect(() => {
    overdueTasks && setTasksLoading(false)
  }, [overdueTasks, setTasksLoading])

  return (
    <>
      {project?.title === 'today' &&
        overdueTasks?.some(task => !task.isComplete) && (
          <>
            <TaskListHeading>
              <h3>Overdue</h3>
            </TaskListHeading>
            <TaskList className='overdue'>
              {overdueTasks
                ?.filter(task => task.isComplete === isComplete)
                .map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    setTasksToComplete={setTasksToComplete}
                    setTasksToNotComplete={setTasksToNotComplete}
                    setIsUndoVisible={setIsUndoVisible}
                    clearTimer={clearTimer}
                    currentTaskForm={currentTaskForm}
                    setCurrentTaskForm={setCurrentTaskForm}
                    currentProject={project}
                  />
                ))}
            </TaskList>
            <TaskListHeading>
              <h3>Today ‧ {format(new Date(), 'iii do MMM')}</h3>
            </TaskListHeading>
          </>
        )}
      <TaskList>
        {projectTaskList
          ?.filter(task => task.isComplete === isComplete)
          .map(task => (
            <TaskItem
              key={task.id}
              task={task}
              setTasksToComplete={setTasksToComplete}
              setTasksToNotComplete={setTasksToNotComplete}
              setIsUndoVisible={setIsUndoVisible}
              clearTimer={clearTimer}
              currentTaskForm={currentTaskForm}
              setCurrentTaskForm={setCurrentTaskForm}
              currentProject={project}
            />
          ))}
      </TaskList>
    </>
  )
}
