const parseFormData = (postData: string): { [key: string]: string } => {
  // NOTE: デバッグ用なので production では消していい
  console.debug('postData:', postData)

  const params = postData.split('&')
  const parsedData: { [key: string]: string } = {}

  params.forEach((param) => {
    const [key, value] = param.split('=')
    if (key && value !== undefined) {
      // + を半角スペースに変換してから decodeURIComponent でデコード
      parsedData[key] = decodeURIComponent(value.replace(/\+/g, ' '))
    }
  })

  // NOTE: デバッグ用なので production では消していい
  console.debug('parsedData:', parsedData)

  return parsedData
}

export { parseFormData }
