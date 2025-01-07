import {ClientConfig} from '@sanity/client'
import type {ContentSourceMap} from '@sanity/client/csm'
import type {ContentSourceMapDocuments} from '@sanity/client/csm'
import {ContentSourceMapParsedPath} from '@sanity/client/csm'
import {ContentSourceMapParsedPathKeyedSegment} from '@sanity/client/csm'
import type {InitializedClientConfig} from '@sanity/client'
import {ObservableSanityClient} from '@sanity/client'
import type {RawQueryResponse} from '@sanity/client'
import {Requester} from 'get-it'
import type {ResolveStudioUrl} from '@sanity/client/csm'
import {SanityClient} from '@sanity/client'
import {StudioBaseRoute} from '@sanity/client/csm'
import {StudioBaseUrl} from '@sanity/client/csm'
import {StudioUrl} from '@sanity/client/csm'

/**
 * @public
 * @deprecated -- use `ClientConfig` instead
 */
export declare interface ClientStegaConfig extends ClientConfig {}

export {ContentSourceMap}

export {ContentSourceMapParsedPath}

export {ContentSourceMapParsedPathKeyedSegment}

/** @public */
export declare type ContentSourceMapQueryResponse =
  | RawQueryResponse<unknown>
  | Pick<RawQueryResponse<unknown>, 'result' | 'resultSourceMap'>

/**
 * @deprecated -- Use `import {createClient} from '@sanity/client'` instead
 * @public
 */
export declare const createClient: (config: ClientConfig) => SanityClient

/**
 * @internal
 */
export declare function encodeIntoResult<Result>(
  result: Result,
  csm: ContentSourceMap,
  encoder: Encoder,
): Result

/**
 * @internal
 */
export declare type Encoder = (context: {
  sourcePath: ContentSourceMapParsedPath
  sourceDocument: ContentSourceMapDocuments[number]
  resultPath: ContentSourceMapParsedPath
  value: string
}) => string

/** @public */
export declare type FilterDefault = (props: {
  /**
   * The path to the value in the source document, for example if you queried for a document like this:
   * `*[_type == "author"][0]{"slug": slug.current}`
   * Then the `sourcePath` for `result.slug` would be `['slug', 'current']`.
   *
   */
  sourcePath: ContentSourceMapParsedPath
  /**
   * If `sourcePath` alone isn't enough to tell you if it's safe to contain stega strings, then you can use `sourceDocument`
   * for additional metadata.
   * It'll always have a `_type` property, which can be used to trace it to the Studio Schema that were used initially.
   * It also has `_id` to help you debug and look at the whole document when troubleshooting.
   * Finally, if the document origins in a Cross Dataset Reference you'll also have `_projectId` and `_dataset` properties to help you trace it.
   */
  sourceDocument: ContentSourceMapDocuments[number]
  /**
   * If you don't colocate your Studio Schemas with your GROQ queries it might be hard to make sense of `sourcePath`,
   * as it operates on the original shape of a document.
   * In that case `resultPath` can be used, as it mirrors the path to the value in the result.
   * For example in a query like this:
   * `*[_type == "author"][0]{"slug": slug.current}`
   * The `resultPath` for `result.slug` would be `['slug']`, while `sourcePath` will be `['slug', 'current']`.
   */
  resultPath: ContentSourceMapParsedPath
  /**
   * You can also use your own string validation logic to determine if it's safe.
   */
  value: string
  /**
     * If you want to keep the default filtering behavior, but only override it for a specific path, you can use `filterDefault` to do that.
     * For example, here all "icon" documents in a Page Builder skips encoding:
     * ```ts
     {
     filter: (props) => {
     switch (props.sourceDocument._type) {
     case 'icon':
     return false
     default:
     return props.filterDefault(props)
     }
     }
     }
     * ```
     */
  filterDefault: FilterDefault
}) => boolean

/**
 * @public
 * @deprecated -- use `InitializedClientConfig` instead
 */
export declare interface InitializedClientStegaConfig extends InitializedClientConfig {}

/** @public */
export declare type InitializedStegaConfig = Omit<StegaConfig, StegaConfigRequiredKeys> &
  Required<Pick<StegaConfig, StegaConfigRequiredKeys>>

/** @public */
export declare type Logger =
  | typeof console
  | Partial<
      Pick<typeof console, 'debug' | 'error' | 'groupCollapsed' | 'groupEnd' | 'log' | 'table'>
    >

/**
 * @deprecated -- Use `import {ObservableSanityClient} from '@sanity/client'` instead
 * @public
 */
export declare class ObservableSanityStegaClient extends ObservableSanityClient {}

/**
 * @deprecated -- Use `import {requester} from '@sanity/client'` instead
 * @public
 */
export declare const requester: Requester

export {ResolveStudioUrl}

/**
 * @deprecated -- Use `import {SanityClient} from '@sanity/client'` instead
 * @public
 */
export declare class SanityStegaClient extends SanityClient {}

/**
 * Can take a `result` JSON from a `const {result} = client.fetch(query, params, {filterResponse: false})`
 * and remove all stega-encoded data from it.
 * @public
 */
export declare function stegaClean<Result = unknown>(result: Result): Result

/** @public */
export declare interface StegaConfig {
  /**
     * Enable or disable stega encoded strings in query results
     * ```ts
     {
     enabled: process.env.VERCEL_ENV !== 'production'
     }
     * ```
     * @defaultValue `false`
     */
  enabled?: boolean
  /**
   * Where the Studio is hosted.
   * If it's embedded in the app, use the base path for example `/studio`.
   * Otherwise provide the full URL to where the Studio is hosted, for example: `https://blog.sanity.studio`.
   *
   */
  studioUrl?: StudioUrl | ResolveStudioUrl
  filter?: FilterDefault
  /**
   * Specify a `console.log` compatible logger to see debug logs, which keys are encoded and which are not.
   */
  logger?: Logger
  /**
   * Set to `true` to omit cross dataset reference specific data from encoded strings
   */
  omitCrossDatasetReferenceData?: boolean
}

/** @public */
export declare type StegaConfigRequiredKeys = Extract<keyof StegaConfig, 'enabled'>

/**
 * Uses `@vercel/stega` to embed edit info JSON into strings in your query result.
 * The JSON payloads are added using invisible characters so they don't show up visually.
 * The edit info is generated from the Content Source Map (CSM) that is returned from Sanity for the query.
 * @public
 */
export declare function stegaEncodeSourceMap<Result = unknown>(
  result: Result,
  resultSourceMap: ContentSourceMap | undefined,
  config: InitializedStegaConfig,
): Result

export {StudioBaseRoute}

export {StudioBaseUrl}

export {StudioUrl}

/**
 * Can take a `result` JSON from a `const {result} = client.fetch(query, params, {filterResponse: false})`
 * and remove all stega-encoded data from it.
 * @alpha
 * @deprecated Use `stegaClean` instead
 */
export declare const vercelStegaCleanAll: typeof stegaClean

export * from '@sanity/client'

export {}
