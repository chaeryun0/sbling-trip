import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { addStays, setCurrentStay, setStays } from '@redux/staySlice'
import apiAxios from '@api/apiAxios'
import { ListApiResponse, ItemApiResponse } from '@models/api'
import { Stay } from '@models/stay'

const useStayList = () => {
  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useDispatch()
  const { stays, currentStay } = useSelector((state: RootState) => state.stay)

  const formatLocation = (address: string) => {
    const [province, city] = address.split(' ', 2)
    const filteredProvince = province.slice(0, 2)
    return `${filteredProvince} / ${city}`
  }

  const removeParentheses = (str: string) =>
    str?.replace(/\((.*?)\)/g, '').trim()

  const formatStays = (data: Stay[]) =>
    data.map((stay) => ({
      ...stay,
      stayName: removeParentheses(stay.stayName),
      originalAddress: stay.address,
      formattedAddress: formatLocation(stay.address),
    }))

  const fetchStayList = async () => {
    try {
      const { data } = await apiAxios.get<ListApiResponse<Stay>>(
        `/stay/list?cursor=${currentPage}`,
      )

      if (currentPage === 0) {
        dispatch(setStays(formatStays(data.result)))
      } else {
        dispatch(addStays(formatStays(data.result)))
      }
    } catch (error) {
      console.error('Error fetching stay list:', error)
    }
  }

  const fetchCurrentStay = async (staySeq: number) => {
    try {
      const { data } = await apiAxios.get<ItemApiResponse<Stay>>(
        `/stay/info?staySeq=${staySeq}`,
      )
      dispatch(setCurrentStay(data.result))
    } catch (error) {
      console.error('Error fetching stay:', error)
    }
  }

  const loadMore = async () => {
    try {
      const nextPage = currentPage + 1
      const { data } = await apiAxios.get<ListApiResponse<Stay>>(
        `/stay/list?cursor=${nextPage}`,
      )

      dispatch(addStays(formatStays(data.result)))
      setCurrentPage(nextPage)
    } catch (error) {
      console.error('Error fetching more stays:', error)
    }
  }

  const toggleWish = async (staySeq: number, wishState: boolean) => {
    try {
      if (wishState) {
        await apiAxios.delete(`/wish/remove?staySeq=${staySeq}`)
      } else {
        await apiAxios.post(`/wish/add?staySeq=${staySeq}`)
      }
      await Promise.all([fetchCurrentStay(staySeq), fetchStayList()])
    } catch (error) {
      console.error('Failed to update wish state:', error)
    }
  }

  useEffect(() => {
    fetchStayList()
  }, [])

  return {
    stays,
    currentStay,
    fetchCurrentStay,
    loadMore,
    toggleWish,
  }
}

export default useStayList
