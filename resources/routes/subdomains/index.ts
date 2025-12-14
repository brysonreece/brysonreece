import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:18
* @route '//links.bryson.test/'
*/
export const links = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: links.url(options),
    method: 'get',
})

links.definition = {
    methods: ["get","head"],
    url: '//links.bryson.test/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:18
* @route '//links.bryson.test/'
*/
links.url = (options?: RouteQueryOptions) => {
    return links.definition.url + queryParams(options)
}

/**
* @see routes/web.php:18
* @route '//links.bryson.test/'
*/
links.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: links.url(options),
    method: 'get',
})

/**
* @see routes/web.php:18
* @route '//links.bryson.test/'
*/
links.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: links.url(options),
    method: 'head',
})

/**
* @see routes/web.php:18
* @route '//links.bryson.test/'
*/
const linksForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: links.url(options),
    method: 'get',
})

/**
* @see routes/web.php:18
* @route '//links.bryson.test/'
*/
linksForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: links.url(options),
    method: 'get',
})

/**
* @see routes/web.php:18
* @route '//links.bryson.test/'
*/
linksForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: links.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

links.form = linksForm

const subdomains = {
    links: Object.assign(links, links),
}

export default subdomains