import { Request, Response } from 'express'
import { UserService } from '../srvics/user.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../interfaces/user.interface'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: User = req.body
      const existingUser = await this.userService.getUserByUsername(user.username)
      if (existingUser) {
        res.status(400).send('Username already exists')
        return
      }
      await this.userService.registerUser(user)
      res.status(201).send('User registered successfully')
    } catch (error:any) {
      res.status(500).send(error.message)
    }
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body
      const user = await this.userService.getUserByUsername(username)
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).send('Invalid username or password')
        return
      }
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
      })
      res.json({ token })
    } catch (error:any) {
      res.status(500).send(error.message)
    }
  }
}
