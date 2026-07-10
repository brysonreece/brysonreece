import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Blog\ImageController::store
* @see app/Http/Controllers/Blog/ImageController.php:16
* @route 'https://bryson.test/blog/images'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: 'https://bryson.test/blog/images',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Blog\ImageController::store
* @see app/Http/Controllers/Blog/ImageController.php:16
* @route 'https://bryson.test/blog/images'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Blog\ImageController::store
* @see app/Http/Controllers/Blog/ImageController.php:16
* @route 'https://bryson.test/blog/images'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const images = {
    store: Object.assign(store, store),
}

export default images