import { App, createRoot } from '@kubb/react'
import { OperationGenerator as Generator } from '@kubb/swagger'
import { Oas } from '@kubb/swagger/components'

import { OperationSchema } from './components/OperationSchema.tsx'

import type { OperationMethodResult, OperationsByMethod } from '@kubb/swagger'
import type { Operation } from '@kubb/swagger/oas'
import { Operations } from './components/Operations.tsx'
import type { FileMeta, PluginOptions } from './types.ts'

export class OperationGenerator extends Generator<PluginOptions['resolvedOptions'], PluginOptions> {
  async all(operations: Operation[], _operationsByMethod: OperationsByMethod): OperationMethodResult<FileMeta> {
    const { pluginManager, oas, plugin, mode } = this.context

    const root = createRoot({
      logger: pluginManager.logger,
    })

    const templates = {
      operations: Operations.templates,
      ...this.options.templates,
    }

    root.render(
      <App pluginManager={pluginManager} plugin={plugin} mode={mode}>
        <Oas oas={oas} operations={operations} getOperationSchemas={(...props) => this.getSchemas(...props)}>
          {templates.operations && <Operations.File templates={templates.operations} />}
        </Oas>
      </App>,
    )

    return root.files
  }

  async operation(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    const { oas, pluginManager, plugin, mode } = this.context

    const root = createRoot({
      logger: pluginManager.logger,
    })
    root.render(
      <App pluginManager={pluginManager} plugin={{ ...plugin, options }} mode={mode}>
        <Oas oas={oas} operations={[operation]} getOperationSchemas={(...props) => this.getSchemas(...props)}>
          <Oas.Operation operation={operation}>
            <OperationSchema.File />
          </Oas.Operation>
        </Oas>
      </App>,
    )

    return root.files
  }

  async get(): OperationMethodResult<FileMeta> {
    return null
  }

  async post(): OperationMethodResult<FileMeta> {
    return null
  }

  async put(): OperationMethodResult<FileMeta> {
    return null
  }
  async patch(): OperationMethodResult<FileMeta> {
    return null
  }
  async delete(): OperationMethodResult<FileMeta> {
    return null
  }
}
