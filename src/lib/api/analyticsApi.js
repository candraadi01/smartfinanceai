import { axiosClient } from './axiosClient'
import { unwrapApiResponse } from '../utils/apiResponse'

export async function getSummary() {
  const response = await axiosClient.get('/analytics/summary')
  return unwrapApiResponse(response)
}
