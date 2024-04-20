import { Router } from 'express'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import { Group } from '../../entities/Group'
import { Task, TaskEvent } from '../../types/Tasks'

export const taskHandlerRouter = Router()

taskHandlerRouter.post('/', async (req, res) => {
  const task = req.body as Task
  switch (task.event) {
    case TaskEvent.SEND_CHANNEL_MESSAGE: {
      const group = await Group.findOneOrFail({ id: task.data.groupID })
      const client = new GroupDiscordClient(group)
      await client.messageChannel(task.data.channelID, task.data.embed, task.data.message)
      return res.json()
    }
    case TaskEvent.DM_USER: {
      const group = await Group.findOneOrFail({ id: task.data.groupID })
      const client = new GroupDiscordClient(group)
      await client.dmUser(task.data.userID, task.data.embed, task.data.message)
      return res.json()
    }
  }
})
