import type { ComponentResolverObject } from 'unplugin-vue-components'
import { describe, expect, it } from 'vitest'

import { AntdvNextResolver } from '../src'

describe('antdvNextResolver components', () => {
  it('component name matching', async () => {
    const resolver = AntdvNextResolver() as ComponentResolverObject
    expect(resolver.resolve('ARadio')).toStrictEqual({ name: 'Radio', from: 'antdv-next' })
    expect(resolver.resolve('ATableColumn')).toStrictEqual({ name: 'TableColumn', from: 'antdv-next' })
    expect(resolver.resolve('AAutoCompleteOption')).toStrictEqual({ name: 'AutoCompleteOption', from: 'antdv-next' })
    expect(resolver.resolve('ARadio2')).toBeFalsy()
  })
})
