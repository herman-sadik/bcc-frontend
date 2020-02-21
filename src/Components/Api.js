export default async (setStatus, setData) => {

  setStatus('pending')

  let data
  const { WavesKeeper } = window;
  let status = true

  const authData = { data: {} };

  if (!WavesKeeper) {
    setStatus('0')
  } else {
    await WavesKeeper.auth(authData).then(authData => {
      data = authData
    }).catch(err => {
      status = false
      setStatus(err.code)
    })
    await WavesKeeper.publicState(authData).then(authData => {
      data.state = authData
    }).catch(err => {
      status = false
      if (err.code) {
        setStatus(err.code)
      }
    })

    if (status) {
      setData(data)
      setStatus('true')
    }
  }
}