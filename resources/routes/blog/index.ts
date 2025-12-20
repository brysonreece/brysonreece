import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web/app.php:8
* @route '//bryson.test/blog/posts'
*/
export const posts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: posts.url(options),
    method: 'get',
})

posts.definition = {
    methods: ["get","head"],
    url: '//bryson.test/blog/posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web/app.php:8
* @route '//bryson.test/blog/posts'
*/
posts.url = (options?: RouteQueryOptions) => {
    return posts.definition.url + queryParams(options)
}

/**
* @see routes/web/app.php:8
* @route '//bryson.test/blog/posts'
*/
posts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: posts.url(options),
    method: 'get',
})

/**
* @see routes/web/app.php:8
* @route '//bryson.test/blog/posts'
*/
posts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: posts.url(options),
    method: 'head',
})

const blog = {
    posts: Object.assign(posts, posts),
}

export default blog