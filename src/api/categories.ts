/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosRequest } from '../utils/axiosRequest'

export const getCategories = createAsyncThunk(
	'categories/getCategories',
	async () => {
		try {
			const { data } = await axiosRequest.get('/categories')
			return data?.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)

export const deleteCategory = createAsyncThunk<void, number>(
	'categories/deleteCategory',
	async (categoryId, { dispatch }) => {
		try {
			await axiosRequest.delete(`/categories?id=${categoryId}`)
			dispatch(getCategories())
		} catch (error) {
			console.log(error)
		}
	}
)

interface EditCategoryPayload {
	id: number
	name: string
}
export const editCategory = createAsyncThunk<any, EditCategoryPayload>(
	'categories/editCategory',
	async ({ id, name }, { dispatch }) => {
		try {
			const response = await axiosRequest.put(`/categories`, {
				id,
				name,
			})
			dispatch(getCategories())
			return response.data
		} catch (error) {
			console.error(error)
		}
	}
)

export const addCategory = createAsyncThunk<void, string>(
	'category/addCategory',
	async (editName, { dispatch }) => {
		try {
			await axiosRequest.post(`/categories`, { name: editName })
			dispatch(getCategories())
		} catch (error) {
			console.log(error)
		}
	}
)
