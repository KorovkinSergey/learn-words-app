import { Router } from 'express'
import User from '../models/User'
import auth from '../middleware/auth.middleware'

const { check, validationResult } = require('express-validator')

const router = Router()

const dictionaryValidation = [
	auth,
	check('words.*.english', 'Нет поля').exists(),
	check('words.*.russian', 'Нет поля').exists(),
	check('words.*.transcript', 'Нет поля').exists(),
]
// получить список словарей
router.get('/', auth, async (req: any, res: any) => {
	try {
		const user = await User.findOne({ _id: req.user.id })

		if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

		const dictionary = user.dictionary.map(({ title, basic, _id }: any) => ({ title, basic, _id }))

		return res.status(200).json(dictionary)
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
	}
})

// добавить новый словарь
router.post('/', [...dictionaryValidation], async (req: any, res: any) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array(), message: 'Не корректные данные' })
		}
		User.findById(req.user.id, async (err: any, user: any) => {
			if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

			const { title, words } = req.body

			const candidateDictionary = user.dictionary.find((item: any) => item.title === title)

			if (candidateDictionary) return res.status(400).json({ message: 'Такой словарь уже существует' })

			user.dictionary.push({ title, words, basic: false, countRepeat: 0 })

			user.save((error: any, result: any) => {
				if (error) return res.status(400).json({ message: error })
				return res.status(200).json({ message: result })
			})

		})

	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
	}
})

// получить слова из словаря
router.get('/:id/words', auth, async (req: any, res: any) => {
	try {
		const user = await User.findOne({ _id: req.user.id })

		if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

		const dictionary = user.dictionary.find((item: any) => item._id.toString() === req.params.id)

		if (!dictionary) return res.status(404).json({ message: 'Словарь не найден' })

		if (dictionary.words.length > req.query._limit) {
			dictionary.words.length = req.query._limit
			return res.status(200).json(dictionary)
		}
		return res.status(200).json(dictionary)
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
	}
})

// Добавить слова в словарь
router.post('/:id/words', [...dictionaryValidation], async (req: any, res: any) => {
	try {
		User.findById(req.user.id, async (err: any, user: any) => {
			if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

			const dictionary = user.dictionary.find((item: any) => item._id.toString() === req.params.id)

			if (!dictionary) return res.status(404).json({ message: 'Словарь не найден' })

			const { words } = req.body

			user.dictionary = user.dictionary.map((item: any) => item._id.toString() === req.params.id ? {
				...item,
				words: [
					...item.words,
					...words.filter(({ russian }: any) => !dictionary.words.find((el: any) => el.russian === russian))],
			} : item)

			user.save((error: any, result: any) => {
				if (error) return res.status(400).json({ message: error })
				return res.status(200).json({ message: result })
			})

		})

	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
	}
})

// удалить слова из словаря
router.delete('/:id/words', [...dictionaryValidation], async (req: any, res: any) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array(), message: 'Не корректные данные' })
		}
		User.findById(req.user.id, async (err: any, user: any) => {
			if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

			const { words } = req.body
			const { id } = req.params

			const candidateDictionary = user.dictionary.find((item: any) => item._id.toString() === id)

			if (!candidateDictionary) return res.status(400).json({ message: 'Словарь не найден' })

			user.dictionary = user.dictionary.map((item: any) => {
				if (item._id.toString() === id) {
					return {
						...item,
						words: item.words.filter(({ _id }: any) => !words.find((el: any) => el._id === _id.toString())),
					}
				}
				return item
			})

			user.save((error: any, result: any) => {
				if (error) return res.status(400).json({ message: error })
				return res.status(201).json({ message: result })
			})

		})

	} catch (e) {
		console.log('e', e)
		res.status(500).json({ message: 'Что-то пошло не так, попробуй снова' })
	}
})

export default router
