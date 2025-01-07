import {Any} from '@sanity/client'
import {ClientPerspective} from '@sanity/client'
import {ContentSourceMap} from '@sanity/client'
import {ContentSourceMapDocument} from '@sanity/client'
import {ContentSourceMapDocumentBase} from '@sanity/client'
import {ContentSourceMapDocuments} from '@sanity/client'
import {ContentSourceMapDocumentValueSource} from '@sanity/client'
import {ContentSourceMapLiteralSource} from '@sanity/client'
import {ContentSourceMapMapping} from '@sanity/client'
import {ContentSourceMapMappings} from '@sanity/client'
import {ContentSourceMapPaths} from '@sanity/client'
import {ContentSourceMapRemoteDocument} from '@sanity/client'
import {ContentSourceMapSource} from '@sanity/client'
import {ContentSourceMapUnknownSource} from '@sanity/client'
import {ContentSourceMapValueMapping} from '@sanity/client'
import {SanityDocument} from '@sanity/client'

export {Any}

/**
 * Optimistically applies source documents to a result, using the content source map to trace fields.
 * Can be used to apply mutations to documents being edited in a Studio, or any mutation on Content Lake, to a result with extremely low latency.
 * @alpha
 */
export declare function applySourceDocuments<Result = unknown>(
  result: Result,
  resultSourceMap: ContentSourceMap | undefined,
  getCachedDocument: (
    sourceDocument: ContentSourceMapDocuments[number],
  ) => Partial<SanityDocument> | null | undefined,
  updateFn?: ApplySourceDocumentsUpdateFunction,
  perspective?: ClientPerspective,
): Result

/**
 * @alpha
 */
export declare type ApplySourceDocumentsUpdateFunction = <T = unknown>(
  changedValue: T,
  context: {
    cachedDocument: Partial<SanityDocument>
    previousValue: T
    sourceDocument: ContentSourceMapDocuments[number]
    sourcePath: ContentSourceMapParsedPath
  },
) => T

export {ClientPerspective}

export {ContentSourceMap}

export {ContentSourceMapDocument}

export {ContentSourceMapDocumentBase}

export {ContentSourceMapDocuments}

export {ContentSourceMapDocumentValueSource}

export {ContentSourceMapLiteralSource}

export {ContentSourceMapMapping}

export {ContentSourceMapMappings}

/** @alpha */
export declare type ContentSourceMapParsedPath = (
  | string
  | number
  | ContentSourceMapParsedPathKeyedSegment
)[]

/** @alpha */
export declare type ContentSourceMapParsedPathKeyedSegment = {
  _key: string
  _index: number
}

/**
 * @alpha
 * @deprecated use `ContentSourceMapParsedPath[number]` instead
 */
export declare type ContentSourceMapParsedPathSegment = ContentSourceMapParsedPath[number]

export {ContentSourceMapPaths}

export {ContentSourceMapRemoteDocument}

export {ContentSourceMapSource}

export {ContentSourceMapUnknownSource}

export {ContentSourceMapValueMapping}

/** @internal */
export declare function createEditUrl(
  options: CreateEditUrlOptions,
): `${StudioBaseUrl}${EditIntentUrl}`

/** @internal */
export declare interface CreateEditUrlOptions {
  baseUrl: string
  workspace?: string
  tool?: string
  id: string
  type: string
  path: ContentSourceMapParsedPath | string
  projectId?: string
  dataset?: string
}

/** @alpha */
export declare type EditIntentUrl =
  `/intent/edit/mode=presentation;id=${string};type=${string};path=${string}`

/** @alpha */
declare function fromString(path: string): Path

/** @internal */
declare function get<Result = unknown, Fallback = unknown>(
  obj: unknown,
  path: Path | string,
  defaultVal?: Fallback,
): Result | typeof defaultVal

/** @internal */
export declare function getPublishedId(id: string): string

/** @alpha */
export declare type IndexTuple = [number | '', number | '']

/** @internal */
declare function isIndexSegment(segment: PathSegment): segment is number

/** @internal */
declare function isIndexTuple(segment: PathSegment): segment is IndexTuple

/** @internal */
declare function isKeySegment(segment: PathSegment): segment is KeyedSegment

/**
 * @internal
 */
export declare function jsonPath(path: ContentSourceMapParsedPath): ContentSourceMapPaths[number]

/**
 * @internal
 */
export declare function jsonPathToStudioPath(path: ContentSourceMapParsedPath): Path

/** @alpha */
export declare type KeyedSegment = {
  _key: string
}

/**
 * @internal
 */
export declare function parseJsonPath(
  path: ContentSourceMapPaths[number],
): ContentSourceMapParsedPath

/** @alpha */
export declare type Path = PathSegment[]

/** @alpha */
export declare type PathSegment = string | number | KeyedSegment | IndexTuple

/** @internal */
declare const reKeySegment: RegExp

/**
 * @internal
 */
export declare function resolvedKeyedSourcePath(options: {
  keyedResultPath: ContentSourceMapParsedPath
  pathSuffix?: string
  sourceBasePath: string
}): ContentSourceMapParsedPath

/** @internal */
export declare function resolveEditInfo(
  options: ResolveEditInfoOptions,
): CreateEditUrlOptions | undefined

/** @alpha */
export declare interface ResolveEditInfoOptions {
  studioUrl: StudioUrl | ResolveStudioUrl
  resultSourceMap: ContentSourceMap
  resultPath: ContentSourceMapParsedPath
}

/** @alpha */
export declare function resolveEditUrl(
  options: ResolveEditUrlOptions,
): ReturnType<typeof createEditUrl> | undefined

/** @alpha */
export declare interface ResolveEditUrlOptions extends Omit<ResolveEditInfoOptions, 'resultPath'> {
  resultPath: StudioPathLike
}

/**
 * @internal
 */
export declare function resolveMapping(
  resultPath: ContentSourceMapParsedPath,
  csm?: ContentSourceMap,
):
  | {
      mapping: ContentSourceMapMapping
      matchedPath: string
      pathSuffix: string
    }
  | undefined

/** @alpha */
export declare type ResolveStudioUrl = (
  sourceDocument: ContentSourceMapDocuments[number],
) => StudioUrl

export {SanityDocument}

/** @alpha */
export declare type StudioBaseRoute = {
  baseUrl: StudioBaseUrl
  workspace?: string
  tool?: string
}

/** @alpha */
export declare type StudioBaseUrl =
  | `/${string}`
  | `${string}.sanity.studio`
  | `https://${string}`
  | string

declare namespace studioPath {
  export {
    isIndexSegment,
    isKeySegment,
    isIndexTuple,
    get,
    toString_2 as toString,
    fromString,
    KeyedSegment,
    IndexTuple,
    PathSegment,
    Path,
    reKeySegment,
  }
}
export {studioPath}

/**
 * Path syntax as used by the `sanity` package, you can give it a string:
 * `products[0].images[_key=="abc123"].asset._ref`
 * or an array:
 * `['products', 0, 'images', {_key: 'abc123'}, 'asset', '_ref']`
 * @alpha
 */
export declare type StudioPathLike = Path | string

/**
 * @internal
 */
export declare function studioPathToJsonPath(path: Path | string): ContentSourceMapParsedPath

/** @alpha */
export declare type StudioUrl = StudioBaseUrl | StudioBaseRoute

/** @alpha */
declare function toString_2(path: Path): string

/**
 * generic way to walk a nested object or array and apply a mapping function to each value
 * @internal
 */
export declare function walkMap(
  value: unknown,
  mappingFn: WalkMapFn,
  path?: ContentSourceMapParsedPath,
): unknown

/**
 * @internal
 */
export declare type WalkMapFn = (value: unknown, path: ContentSourceMapParsedPath) => unknown

export {}
