export function notFoundHandler(request, response) {
  response.status(404).json({ success: false, message: 'Route not found' })
}

export function errorHandler(error, _request, response, _next) {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return response.status(400).json({
      success: false,
      message: 'Request body contains invalid JSON',
    })
  }

  console.error(error)
  return response.status(error.statusCode || 500).json({ success: false, message: 'Internal server error' })
}
