import { QueryBuilder } from 'knex'

// Turns it into a Promise, and also cast the result type
export function knexToPromise<A>(knexQueryBuilder: QueryBuilder): Promise<A> {
  return new Promise((resolve, reject) => {
    knexQueryBuilder.then(
      a => {
        resolve(a as A)
      },
      err => {
        reject(err)
      },
    )
  })
}
