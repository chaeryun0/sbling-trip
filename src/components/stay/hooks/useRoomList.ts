import { useEffect, useState } from 'react'
import apiAxios from '@api/apiAxios'
import { Room } from '@models/room'
import { ApiResponse } from '@models/api'

const useRoomList = (staySeq: string) => {
  const [rooms, setRooms] = useState<Room[] | null>(null)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await apiAxios.get<ApiResponse<Room>>('room/info', {
          params: {
            staySeq,
          },
        })

        setRooms(data.result)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }

    fetchRooms()
  }, [staySeq])

  return { rooms }
}

export default useRoomList