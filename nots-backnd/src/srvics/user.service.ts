import { poolPromise } from '../config/sql.config'
import { User } from '../interfaces/user.interface'
import bcrypt from 'bcrypt'
import * as sql from 'mssql'

export class UserService {
  public async registerUser(user: User): Promise<void> {
    const pool = await poolPromise
    const hashedPassword = await bcrypt.hash(user.password, 10)

    await pool.request()
      .input('username', sql.NVarChar, user.username)
      .input('password', sql.NVarChar, hashedPassword)
      .execute('RegisterUser')
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    const pool = await poolPromise
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .execute('LoginUser')

    return result.recordset.length ? result.recordset[0] : null
  }
}
