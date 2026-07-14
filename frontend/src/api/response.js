export function unwrapResource(response) {
  return response?.data?.data ?? response?.data
}

