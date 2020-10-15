export const getEnv = () => {
  // sit, pre, prexg 三个环境2017/12/18
  // local dev , exp: testsit.cnsuning.com
  if (process.env.NODE_ENV === 'development') {
    return 'sit'
  }

  // prod
  const re = /^dcdmadmin(\w*).cnsuning.com$/g
  const res = re.exec(window.location.hostname)
  if (!res) {
    console.log('无法从域名检测到环境信息, cant get env'); // eslint-disable-line
    return ''
  }
  return res[1]
}
