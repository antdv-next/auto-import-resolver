import type { ComponentResolver } from 'unplugin-vue-components'
import componentMap from './components'
import icons from './icons'
import proComponentMap from './pro-components'

export interface AntdvNextResolverOptions {
  /**
   * Automatically import [@antdv-next/pro](https://github.com/antdv-next/antdv-next-pro) components.
   *
   * requires package `@antdv-next/pro`
   *
   * @default false
   */
  pro?: boolean | AntdvNextProResolverOptions
  /**
   * Set the components or icons that do not require automatic import.
   *
   * @default []
   */
  exclude?: FilterPattern
  /**
   * Automatically import [@antdv-next/icons](https://www.antdv-next.com/components/icon-cn) icons library.
   *
   * requires package `@antdv-next/icons`
   *
   * @default false
   */
  resolveIcons?: boolean
}

export interface AntdvNextProResolverOptions {
  /** Only resolve the listed Pro components. */
  include?: FilterPattern
  /** Do not resolve the listed Pro components. */
  exclude?: FilterPattern
}

export type FilterPattern = ReadonlyArray<string | RegExp> | string | RegExp | null

function matchesFilter(name: string, filter?: FilterPattern): boolean {
  if (!filter)
    return false

  if (typeof filter === 'string')
    return name === filter

  if (filter instanceof RegExp)
    return !!name.match(filter)

  if (Array.isArray(filter)) {
    for (const item of filter) {
      if (name === item || name.match(item))
        return true
    }
  }
  return false
}

function isExclude(name: string, exclude?: FilterPattern): boolean {
  return matchesFilter(name, exclude)
}

/**
 * Resolver for [Antdv Next](https://antdv-next.com)
 */
export function AntdvNextResolver(options?: AntdvNextResolverOptions): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      const opts = Object.assign({}, options)

      if (isExclude(name, opts.exclude)) {
        return
      }

      if (opts.resolveIcons && icons.includes(name)) {
        return {
          name,
          from: '@antdv-next/icons',
        }
      }

      if (opts.pro) {
        const proImportName = proComponentMap[name]
        if (proImportName) {
          const proOptions = typeof opts.pro === 'object' ? opts.pro : undefined
          const included = !proOptions?.include
            || matchesFilter(name, proOptions.include)
            || matchesFilter(proImportName, proOptions.include)
          const globallyExcluded = isExclude(proImportName, opts.exclude)
          const proExcluded = isExclude(name, proOptions?.exclude)
            || isExclude(proImportName, proOptions?.exclude)

          if (globallyExcluded) {
            return
          }

          if (included && !proExcluded) {
            return {
              name: proImportName,
              from: '@antdv-next/pro',
            }
          }
        }
      }

      const importName = componentMap[name]
      if (importName) {
        if (isExclude(importName, opts.exclude)) {
          return
        }

        return {
          name: importName,
          from: 'antdv-next',
        }
      }
    },
  }
}
