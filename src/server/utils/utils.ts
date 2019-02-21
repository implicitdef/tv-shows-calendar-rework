import * as Bluebird from 'bluebird'

export function bluebirdToNative<A>(bluebirdPromise: Bluebird<A>): Promise<A> {
  return new Promise((resolve, reject) => {
    bluebirdPromise.then(
      a => {
        resolve(a)
      },
      err => {
        reject(err)
      },
    )
  })
}
