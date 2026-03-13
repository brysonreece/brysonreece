import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pomelo\ImageVariationController::store
* @see app/Http/Controllers/Pomelo/ImageVariationController.php:18
* @route '//pomelo.bryson.test/variations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//pomelo.bryson.test/variations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pomelo\ImageVariationController::store
* @see app/Http/Controllers/Pomelo/ImageVariationController.php:18
* @route '//pomelo.bryson.test/variations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pomelo\ImageVariationController::store
* @see app/Http/Controllers/Pomelo/ImageVariationController.php:18
* @route '//pomelo.bryson.test/variations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pomelo\ImageVariationController::status
* @see app/Http/Controllers/Pomelo/ImageVariationController.php:33
* @route '//pomelo.bryson.test/variations/{batchId}'
*/
export const status = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '//pomelo.bryson.test/variations/{batchId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pomelo\ImageVariationController::status
* @see app/Http/Controllers/Pomelo/ImageVariationController.php:33
* @route '//pomelo.bryson.test/variations/{batchId}'
*/
status.url = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batchId: args }
    }

    if (Array.isArray(args)) {
        args = {
            batchId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batchId: args.batchId,
    }

    return status.definition.url
            .replace('{batchId}', parsedArgs.batchId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pomelo\ImageVariationController::status
* @see app/Http/Controllers/Pomelo/ImageVariationController.php:33
* @route '//pomelo.bryson.test/variations/{batchId}'
*/
status.get = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pomelo\ImageVariationController::status
* @see app/Http/Controllers/Pomelo/ImageVariationController.php:33
* @route '//pomelo.bryson.test/variations/{batchId}'
*/
status.head = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

const ImageVariationController = { store, status }

export default ImageVariationController