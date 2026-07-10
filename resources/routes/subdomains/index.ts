import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web.php:19
* @route 'https://links.bryson.test'
*/
export const links = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: links.url(options),
    method: 'get',
})

links.definition = {
    methods: ["get","head"],
    url: 'https://links.bryson.test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:19
* @route 'https://links.bryson.test'
*/
links.url = (options?: RouteQueryOptions) => {
    return links.definition.url + queryParams(options)
}

/**
* @see routes/web.php:19
* @route 'https://links.bryson.test'
*/
links.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: links.url(options),
    method: 'get',
})

/**
* @see routes/web.php:19
* @route 'https://links.bryson.test'
*/
links.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: links.url(options),
    method: 'head',
})

/**
* @see routes/web.php:23
* @route 'https://recall.bryson.test'
*/
export const recall = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recall.url(options),
    method: 'get',
})

recall.definition = {
    methods: ["get","head"],
    url: 'https://recall.bryson.test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:23
* @route 'https://recall.bryson.test'
*/
recall.url = (options?: RouteQueryOptions) => {
    return recall.definition.url + queryParams(options)
}

/**
* @see routes/web.php:23
* @route 'https://recall.bryson.test'
*/
recall.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recall.url(options),
    method: 'get',
})

/**
* @see routes/web.php:23
* @route 'https://recall.bryson.test'
*/
recall.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recall.url(options),
    method: 'head',
})

/**
* @see routes/web.php:27
* @route 'https://pomelo.bryson.test'
*/
export const pomelo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pomelo.url(options),
    method: 'get',
})

pomelo.definition = {
    methods: ["get","head"],
    url: 'https://pomelo.bryson.test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:27
* @route 'https://pomelo.bryson.test'
*/
pomelo.url = (options?: RouteQueryOptions) => {
    return pomelo.definition.url + queryParams(options)
}

/**
* @see routes/web.php:27
* @route 'https://pomelo.bryson.test'
*/
pomelo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pomelo.url(options),
    method: 'get',
})

/**
* @see routes/web.php:27
* @route 'https://pomelo.bryson.test'
*/
pomelo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pomelo.url(options),
    method: 'head',
})

/**
* @see routes/web.php:33
* @route 'https://brando.bryson.test'
*/
export const brando = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brando.url(options),
    method: 'get',
})

brando.definition = {
    methods: ["get","head"],
    url: 'https://brando.bryson.test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:33
* @route 'https://brando.bryson.test'
*/
brando.url = (options?: RouteQueryOptions) => {
    return brando.definition.url + queryParams(options)
}

/**
* @see routes/web.php:33
* @route 'https://brando.bryson.test'
*/
brando.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brando.url(options),
    method: 'get',
})

/**
* @see routes/web.php:33
* @route 'https://brando.bryson.test'
*/
brando.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: brando.url(options),
    method: 'head',
})

const subdomains = {
    links: Object.assign(links, links),
    recall: Object.assign(recall, recall),
    pomelo: Object.assign(pomelo, pomelo),
    brando: Object.assign(brando, brando),
}

export default subdomains