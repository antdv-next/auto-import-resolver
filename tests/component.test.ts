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

  it('pro component name matching when enabled', () => {
    const resolver = AntdvNextResolver({ pro: true }) as ComponentResolverObject
    expect(resolver.resolve('AScrollbar')).toStrictEqual({ name: 'Scrollbar', from: '@antdv-next/pro' })
    expect(resolver.resolve('ApConfigProvider')).toStrictEqual({ name: 'ProConfigProvider', from: '@antdv-next/pro' })
  })

  it('pro components respect exclude rules', () => {
    const resolver = AntdvNextResolver({ pro: true, exclude: ['Scrollbar'] }) as ComponentResolverObject
    expect(resolver.resolve('AScrollbar')).toBeFalsy()
  })

  it('resolves antdv-next components when pro is enabled', () => {
    const resolver = AntdvNextResolver({ pro: true }) as ComponentResolverObject
    expect(resolver.resolve('ARadio')).toStrictEqual({ name: 'Radio', from: 'antdv-next' })
  })

  it('pro components support scoped include and exclude rules', () => {
    const resolver = AntdvNextResolver({
      pro: {
        include: ['Scrollbar'],
        exclude: ['AScrollbar'],
      },
    }) as ComponentResolverObject

    expect(resolver.resolve('AScrollbar')).toBeFalsy()
    expect(resolver.resolve('ApConfigProvider')).toBeFalsy()
    expect(resolver.resolve('ARadio')).toStrictEqual({ name: 'Radio', from: 'antdv-next' })
  })

  it('does not resolve pro components by default', () => {
    const resolver = AntdvNextResolver() as ComponentResolverObject
    expect(resolver.resolve('AScrollbar')).toBeFalsy()
  })
})
