export const sleep = (callback: () => void, timeout: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(() => {
      callback()
      resolve(undefined)
    }, timeout)
  })
