import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web/guest.php:5
* @route '//bryson.test/'
*/
export const welcome = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: welcome.url(options),
    method: 'get',
})

welcome.definition = {
    methods: ["get","head"],
    url: '//bryson.test/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web/guest.php:5
* @route '//bryson.test/'
*/
welcome.url = (options?: RouteQueryOptions) => {
    return welcome.definition.url + queryParams(options)
}

/**
* @see routes/web/guest.php:5
* @route '//bryson.test/'
*/
welcome.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: welcome.url(options),
    method: 'get',
})

/**
* @see routes/web/guest.php:5
* @route '//bryson.test/'
*/
welcome.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: welcome.url(options),
    method: 'head',
})

/**
* @see routes/web/guest.php:8
* @route '//bryson.test/about'
*/
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '//bryson.test/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web/guest.php:8
* @route '//bryson.test/about'
*/
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see routes/web/guest.php:8
* @route '//bryson.test/about'
*/
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

/**
* @see routes/web/guest.php:8
* @route '//bryson.test/about'
*/
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

/**
* @see routes/web/guest.php:11
* @route '//bryson.test/career'
*/
export const career = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: career.url(options),
    method: 'get',
})

career.definition = {
    methods: ["get","head"],
    url: '//bryson.test/career',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web/guest.php:11
* @route '//bryson.test/career'
*/
career.url = (options?: RouteQueryOptions) => {
    return career.definition.url + queryParams(options)
}

/**
* @see routes/web/guest.php:11
* @route '//bryson.test/career'
*/
career.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: career.url(options),
    method: 'get',
})

/**
* @see routes/web/guest.php:11
* @route '//bryson.test/career'
*/
career.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: career.url(options),
    method: 'head',
})

/**
* @see routes/web/guest.php:14
* @route '//bryson.test/projects'
*/
export const projects = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projects.url(options),
    method: 'get',
})

projects.definition = {
    methods: ["get","head"],
    url: '//bryson.test/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web/guest.php:14
* @route '//bryson.test/projects'
*/
projects.url = (options?: RouteQueryOptions) => {
    return projects.definition.url + queryParams(options)
}

/**
* @see routes/web/guest.php:14
* @route '//bryson.test/projects'
*/
projects.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projects.url(options),
    method: 'get',
})

/**
* @see routes/web/guest.php:14
* @route '//bryson.test/projects'
*/
projects.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: projects.url(options),
    method: 'head',
})

/**
* @see routes/web/guest.php:17
* @route '//bryson.test/community'
*/
export const community = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: community.url(options),
    method: 'get',
})

community.definition = {
    methods: ["get","head"],
    url: '//bryson.test/community',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web/guest.php:17
* @route '//bryson.test/community'
*/
community.url = (options?: RouteQueryOptions) => {
    return community.definition.url + queryParams(options)
}

/**
* @see routes/web/guest.php:17
* @route '//bryson.test/community'
*/
community.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: community.url(options),
    method: 'get',
})

/**
* @see routes/web/guest.php:17
* @route '//bryson.test/community'
*/
community.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: community.url(options),
    method: 'head',
})

/**
* @see routes/web/guest.php:20
* @route '//bryson.test/uses'
*/
export const uses = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uses.url(options),
    method: 'get',
})

uses.definition = {
    methods: ["get","head"],
    url: '//bryson.test/uses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web/guest.php:20
* @route '//bryson.test/uses'
*/
uses.url = (options?: RouteQueryOptions) => {
    return uses.definition.url + queryParams(options)
}

/**
* @see routes/web/guest.php:20
* @route '//bryson.test/uses'
*/
uses.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uses.url(options),
    method: 'get',
})

/**
* @see routes/web/guest.php:20
* @route '//bryson.test/uses'
*/
uses.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: uses.url(options),
    method: 'head',
})

/**
* @see routes/web/guest.php:23
* @route '//bryson.test/links'
*/
export const links = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: links.url(options),
    method: 'get',
})

links.definition = {
    methods: ["get","head"],
    url: '//bryson.test/links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web/guest.php:23
* @route '//bryson.test/links'
*/
links.url = (options?: RouteQueryOptions) => {
    return links.definition.url + queryParams(options)
}

/**
* @see routes/web/guest.php:23
* @route '//bryson.test/links'
*/
links.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: links.url(options),
    method: 'get',
})

/**
* @see routes/web/guest.php:23
* @route '//bryson.test/links'
*/
links.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: links.url(options),
    method: 'head',
})

const guest = {
    welcome: Object.assign(welcome, welcome),
    about: Object.assign(about, about),
    career: Object.assign(career, career),
    projects: Object.assign(projects, projects),
    community: Object.assign(community, community),
    uses: Object.assign(uses, uses),
    links: Object.assign(links, links),
}

export default guest