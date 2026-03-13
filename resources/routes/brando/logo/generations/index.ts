import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Brando\GenerateLogoController::__invoke
* @see app/Http/Controllers/Brando/GenerateLogoController.php:18
* @route '//brando.bryson.test/logo/generations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//brando.bryson.test/logo/generations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Brando\GenerateLogoController::__invoke
* @see app/Http/Controllers/Brando/GenerateLogoController.php:18
* @route '//brando.bryson.test/logo/generations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Brando\GenerateLogoController::__invoke
* @see app/Http/Controllers/Brando/GenerateLogoController.php:18
* @route '//brando.bryson.test/logo/generations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Brando\GenerateLogoController::status
* @see app/Http/Controllers/Brando/GenerateLogoController.php:35
* @route '//brando.bryson.test/logo/generations/{batchId}'
*/
export const status = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '//brando.bryson.test/logo/generations/{batchId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Brando\GenerateLogoController::status
* @see app/Http/Controllers/Brando/GenerateLogoController.php:35
* @route '//brando.bryson.test/logo/generations/{batchId}'
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
* @see \App\Http\Controllers\Brando\GenerateLogoController::status
* @see app/Http/Controllers/Brando/GenerateLogoController.php:35
* @route '//brando.bryson.test/logo/generations/{batchId}'
*/
status.get = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Brando\GenerateLogoController::status
* @see app/Http/Controllers/Brando/GenerateLogoController.php:35
* @route '//brando.bryson.test/logo/generations/{batchId}'
*/
status.head = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

const generations = {
    store: Object.assign(store, store),
    status: Object.assign(status, status),
}

export default generations