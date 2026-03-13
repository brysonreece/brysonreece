import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Brando\GenerateBrandNamesController::__invoke
* @see app/Http/Controllers/Brando/GenerateBrandNamesController.php:15
* @route '//brando.bryson.test/generations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//brando.bryson.test/generations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Brando\GenerateBrandNamesController::__invoke
* @see app/Http/Controllers/Brando/GenerateBrandNamesController.php:15
* @route '//brando.bryson.test/generations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Brando\GenerateBrandNamesController::__invoke
* @see app/Http/Controllers/Brando/GenerateBrandNamesController.php:15
* @route '//brando.bryson.test/generations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const generations = {
    store: Object.assign(store, store),
}

export default generations