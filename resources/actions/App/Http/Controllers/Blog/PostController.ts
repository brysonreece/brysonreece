import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Blog\PostController::index
* @see app/Http/Controllers/Blog/PostController.php:23
* @route '//bryson.test/blog/posts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '//bryson.test/blog/posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Blog\PostController::index
* @see app/Http/Controllers/Blog/PostController.php:23
* @route '//bryson.test/blog/posts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Blog\PostController::index
* @see app/Http/Controllers/Blog/PostController.php:23
* @route '//bryson.test/blog/posts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Blog\PostController::index
* @see app/Http/Controllers/Blog/PostController.php:23
* @route '//bryson.test/blog/posts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Blog\PostController::store
* @see app/Http/Controllers/Blog/PostController.php:44
* @route '//bryson.test/blog/posts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '//bryson.test/blog/posts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Blog\PostController::store
* @see app/Http/Controllers/Blog/PostController.php:44
* @route '//bryson.test/blog/posts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Blog\PostController::store
* @see app/Http/Controllers/Blog/PostController.php:44
* @route '//bryson.test/blog/posts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Blog\PostController::update
* @see app/Http/Controllers/Blog/PostController.php:56
* @route '//bryson.test/blog/posts/{post}'
*/
export const update = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '//bryson.test/blog/posts/{post}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Blog\PostController::update
* @see app/Http/Controllers/Blog/PostController.php:56
* @route '//bryson.test/blog/posts/{post}'
*/
update.url = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: args.post,
    }

    return update.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Blog\PostController::update
* @see app/Http/Controllers/Blog/PostController.php:56
* @route '//bryson.test/blog/posts/{post}'
*/
update.put = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Blog\PostController::destroy
* @see app/Http/Controllers/Blog/PostController.php:72
* @route '//bryson.test/blog/posts/{post}'
*/
export const destroy = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '//bryson.test/blog/posts/{post}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Blog\PostController::destroy
* @see app/Http/Controllers/Blog/PostController.php:72
* @route '//bryson.test/blog/posts/{post}'
*/
destroy.url = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: args.post,
    }

    return destroy.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Blog\PostController::destroy
* @see app/Http/Controllers/Blog/PostController.php:72
* @route '//bryson.test/blog/posts/{post}'
*/
destroy.delete = (args: { post: string | number } | [post: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const PostController = { index, store, update, destroy }

export default PostController