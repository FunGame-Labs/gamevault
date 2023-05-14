import { Polybase } from '@polybase/client'
import { POLYBASE_SCHEMA } from './schema.mjs'

const main = async () => {
  const db = new Polybase({
    defaultNamespace: 'gamevault-v1',
  })

  const res = await db.applySchema(POLYBASE_SCHEMA)
  return
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
