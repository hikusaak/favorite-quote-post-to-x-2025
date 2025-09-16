const parseFormData = (postData: string): { [key: string]: string } => {
  // NOTE: デバッグ用なので production では消していい
  console.debug('postData:', postData)

  const decodedData = decodeURIComponent(postData)
  const params = decodedData.split('&')
  const parsedData: { [key: string]: string } = {}

  params.forEach((param) => {
    const [key, value] = param.split('=')
    parsedData[key] = value
  })

  // NOTE: デバッグ用なので production では消していい
  console.debug('parsedData:', parsedData)

  return parsedData
}

export { parseFormData }
