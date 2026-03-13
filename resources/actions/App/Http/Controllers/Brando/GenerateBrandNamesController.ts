import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Brando\GenerateBrandNamesController::__invoke
* @see app/Http/Controllers/Brando/GenerateBrandNamesController.php:15
* @route '//brando.bryson.test/generations'
*/
const GenerateBrandNamesController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: GenerateBrandNamesController.url(options),
    method: 'post',
})

GenerateBrandNamesController.definition = {
    methods: ["post"],
    url: '//brando.bryson.test/generations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Brando\GenerateBrandNamesController::__invoke
* @see app/Http/Controllers/Brando/GenerateBrandNamesController.php:15
* @route '//brando.bryson.test/generations'
*/
GenerateBrandNamesController.url = (options?: RouteQueryOptions) => {
    return GenerateBrandNamesController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Brando\GenerateBrandNamesController::__invoke
* @see app/Http/Controllers/Brando/GenerateBrandNamesController.php:15
* @route '//brando.bryson.test/generations'
*/
GenerateBrandNamesController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: GenerateBrandNamesController.url(options),
    method: 'post',
})

export default GenerateBrandNamesController