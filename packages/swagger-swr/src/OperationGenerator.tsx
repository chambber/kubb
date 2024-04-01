import { App, createRoot } from '@kubb/react'
import { OperationGenerator as Generator } from '@kubb/swagger'
import { Oas } from '@kubb/swagger/components'

import { Mutation } from './components/Mutation.tsx'
import { Query } from './components/Query.tsx'

import type { KubbFile } from '@kubb/core'
import type { OperationMethodResult } from '@kubb/swagger'
import type { Operation } from '@kubb/swagger/oas'
import type { FileMeta, PluginOptions } from './types.ts'

export class OperationGenerator extends Generator<PluginOptions['resolvedOptions'], PluginOptions, FileMeta> {
  async all(): Promise<KubbFile.File | null> {
    return null
  }

  async operation(): Promise<KubbFile.File | null> {
    return null
  }

  async get(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    const { oas, pluginManager, plugin, mode } = this.context

    const root = createRoot({
      logger: pluginManager.logger,
    })

    if (!options.templates?.query || !options.templates?.queryOptions) {
      return []
    }

    root.render(
      <App pluginManager={pluginManager} plugin={{ ...plugin, options }} mode={mode}>
        <Oas oas={oas} operations={[operation]} getOperationSchemas={(...props) => this.getSchemas(...props)}>
          <Oas.Operation operation={operation}>
            <Query.File
              templates={{
                query: options.templates.query,
                queryOptions: options.templates.queryOptions,
              }}
            />
          </Oas.Operation>
        </Oas>
      </App>,
    )

    return root.files
  }

  async post(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    const { oas, pluginManager, plugin, mode } = this.context

    const root = createRoot({
      logger: pluginManager.logger,
    })

    if (!options.templates?.mutation) {
      return []
    }

    root.render(
      <App pluginManager={pluginManager} plugin={{ ...plugin, options }} mode={mode}>
        <Oas oas={oas} operations={[operation]} getOperationSchemas={(...props) => this.getSchemas(...props)}>
          <Oas.Operation operation={operation}>
            <Mutation.File templates={options.templates.mutation} />
          </Oas.Operation>
        </Oas>
      </App>,
    )

    return root.files
  }

  async put(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    return this.post(operation, options)
  }
  async patch(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    return this.post(operation, options)
  }
  async delete(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    return this.post(operation, options)
  }
}
