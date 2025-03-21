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

export const deleteCategory = createAsyncThunk(
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
	editName: string
	idx: number
}
export const editCategory = createAsyncThunk<any, EditCategoryPayload>(
	'categories/editCategory',
	async ({ editName, idx }, { dispatch }) => {
		try {
			const response = await axiosRequest.put(`/categories`, {
				id: idx,
				name: editName,
			})
			dispatch(getCategories())
			return response.data
		} catch (error) {
			console.error(error)
		}
	}
)
export const addCategory = createAsyncThunk(
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
