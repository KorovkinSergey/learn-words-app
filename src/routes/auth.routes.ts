import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
import { check, validationResult } from 'express-validator'
import User from '../models/User'
import { defaultUserDictionary } from '../consts/defaultUserDictionary'

const router = Router()

router.post(
  '/register',
  [
    check('email', 'Не корректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 }),
    check('name', 'Нет имени').exists()
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Не корректные данные при регистрации' })
      }
      const { email, password, name } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) return res.status(400).json({ message: 'Такой пользователь уже существует' })

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword, name, dictionary: defaultUserDictionary })

      await user.save()

      res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
    }
  })

router.post('/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Не корректные данные при входе в систему'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: '24h' })

      res.json({
        token, user: {
          name: user.name,
          id: user.id,
          achievements:
          user.achievements,
          avatar: user.avatar,
        },
        dictionary: user.dictionary.filter(item => item.basic)
      })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
    }
  })

export default router
