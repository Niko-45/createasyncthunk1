import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook/redux'
import {
	addCategory,
	deleteCategory,
	editCategory,
	getCategories,
} from '../../api/categories'
import { TCategory } from '../../types/categories'

export default function Categories() {
	const { categories } = useAppSelector(({ categories }) => categories)
	const { categoriesLoading } = useAppSelector(({ categories }) => categories)
	const dispatch = useAppDispatch()
	const [modal, setModal] = useState(false)
	const [editName, setEditName] = useState('')
	const [idx, setIdx] = useState<number | null>(null)
	const [addModal, setAddModal] = useState(false)

	useEffect(() => {
		dispatch(getCategories())
	}, [dispatch])

	function handleEdit(category: TCategory) {
		setEditName(category.name)
		setIdx(category.id)
		setModal(true)
	}

	function handleSave() {
		if (idx !== null) {
			dispatch(editCategory({ editName, idx }))
			setModal(false)
			setEditName('')
		}
	}

	function handleAdd() {
		if (editName.trim()) {
			dispatch(addCategory(editName))
			setAddModal(false) // Close add modal after adding
			setEditName('') // Clear the input field
		}
	}

	return (
		<div className='w-[80%] m-auto my-5'>
			<h1 className='text-2xl font-semibold mb-4'>Page categories</h1>
			<ul>
				{categoriesLoading && (
					<div className='max-w-sm animate-pulse'>
						{[1, 2, 3].map((_, index) => (
							<div className='flex' key={index}>
								<div className='h-2.5 bg-gray-100 rounded-full dark:bg-gray-700 w-12 mb-4'></div>
								<div
									className='h-2.5 bg-gray-100 rounded-full dark:bg-gray-700 w-24 mb-4'
									key={String(Date.now())}
								></div>
							</div>
						))}
					</div>
				)}
				<button
					className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4'
					onClick={() => setAddModal(true)}
				>
					Add Category
				</button>

				{addModal && (
					<div className='fixed inset-0 bg-opacity-50 flex justify-center items-center'>
						<div className='bg-white p-6 rounded-lg shadow-md w-96'>
							<input
								type='text'
								value={editName}
								onChange={e => setEditName(e.target.value)}
								placeholder='Enter category name'
								className='border border-gray-300 p-2 w-full mb-4 rounded-md'
							/>
							<div className='flex justify-end gap-2'>
								<button
									className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600'
									onClick={handleAdd}
								>
									Add
								</button>
								<button
									className='bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400'
									onClick={() => setAddModal(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}

				{categories.map((category: TCategory) => (
					<li
						className='flex gap-4 w-[40%] items-center mb-4'
						key={category.id}
					>
						<p className='flex-1 text-lg'>
							{category.id} {category.name}
						</p>
						<button
							className='bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600'
							onClick={() => dispatch(deleteCategory(category.id))}
						>
							Delete
						</button>
						<button
							className='bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600'
							onClick={() => handleEdit(category)}
						>
							Edit
						</button>
					</li>
				))}
			</ul>

			{modal && (
				<div className='fixed inset-0   flex justify-center items-center'>
					<div className='bg-white p-6 rounded-lg shadow-md w-80'>
						<input
							type='text'
							value={editName}
							onChange={e => setEditName(e.target.value)}
							placeholder='Edit category name'
							className='border border-gray-300 p-2 w-full mb-4 rounded-md'
						/>
						<div className='flex justify-end gap-2'>
							<button
								className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
								onClick={handleSave}
							>
								Save
							</button>
							<button
								className='bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400'
								onClick={() => setModal(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
