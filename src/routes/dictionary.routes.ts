import { Router } from 'express'
import User from '../models/User'
import auth from '../middleware/auth.middleware'

const { check, validationResult } = require('express-validator')

const router = Router()

router.post('/:dictionary',
  [
    auth,
    check('words.*.englishWord', 'Нет поля').exists(),
    check('words.*.russianWord', 'Нет поля').exists(),
    check('words.*.transcript', 'Нет поля').exists()
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Не корректные данные'
        })
      }
      User.findById(req.user.id, async (err: any, user: any) => {
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

        const paramDictionary = req.params.dictionary
        const dictionary = user.dictionary[paramDictionary]

        if (!dictionary) return res.status(404).json({ message: 'Словарь не найден' })

        const filterDictionary = req.body.words
          .filter(({ russianWord }: any) => !user.dictionary[paramDictionary]
            .find((el: any) => el.russianWord === russianWord))
        
        user.dictionary[paramDictionary] = [...user.dictionary[paramDictionary], ...filterDictionary]

        user.save((error: any, result: any) => {
          if (error) return res.status(400).json({ message: error })
          return res.status(200).json({ message: result })
        })

      }, { new: true })

    } catch (e) {
      console.log('e', e)
      res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
    }
  })

router.delete('/:dictionary',
  [
    auth,
    check('words.*.englishWord', 'Нет поля').exists(),
    check('words.*.russianWord', 'Нет поля').exists(),
    check('words.*.transcript', 'Нет поля').exists()
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Не корректные данные' })
      }
      User.findById(req.user.id, async (err: any, user: any) => {
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

        const paramDictionary = req.params.dictionary
        const dictionary = user.dictionary[paramDictionary]

        if (!dictionary) return res.status(404).json({ message: 'Словарь не найден' })

        user.dictionary[paramDictionary] = user.dictionary[paramDictionary]
          .filter(({ _id }: any) => !req.body.words.find((el: any) => el._id === _id.toString()))

        user.save((error: any, result: any) => {
          if (error) return res.status(400).json({ message: error })
          return res.status(201).json({ message: result })
        })

      }, { new: true })

    } catch (e) {
      console.log('e', e)
      res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
    }
  })

router.get('/:dictionary',
  auth,
  async (req: any, res: any) => {
    try {
      const user = await User.findOne({ _id: req.user.id })

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }
      // @ts-ignore
      const dictionary = user?.dictionary[req.params.dictionary]

      if (!dictionary) {
        return res.status(404).json({ message: 'Словарь не найден' })
      }
      if (req.query._limit) {
        dictionary.length = req.query._limit
        return res.status(200).json(dictionary)
      }
      return res.status(200).json(dictionary)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
    }
  })

export default router
