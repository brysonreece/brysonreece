<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\LevelSetList;
use Rector\Set\ValueObject\SetList;
use RectorLaravel\Rector\ArrayDimFetch\RequestVariablesToRequestFacadeRector;
use RectorLaravel\Rector\ArrayDimFetch\ServerVariableToRequestFacadeRector;
use RectorLaravel\Rector\ArrayDimFetch\SessionVariableToSessionFacadeRector;
use RectorLaravel\Rector\Class_\AddExtendsAnnotationToModelFactoriesRector;
use RectorLaravel\Rector\Class_\AnonymousMigrationsRector;
use RectorLaravel\Rector\Class_\ModelCastsPropertyToCastsMethodRector;
use RectorLaravel\Rector\Class_\PropertyDeferToDeferrableProviderToRector;
use RectorLaravel\Rector\Class_\RemoveModelPropertyFromFactoriesRector;
use RectorLaravel\Rector\Class_\ReplaceExpectsMethodsInTestsRector;
use RectorLaravel\Rector\Class_\UnifyModelDatesWithCastsRector;
use RectorLaravel\Rector\ClassMethod\AddGenericReturnTypeToRelationsRector;
use RectorLaravel\Rector\ClassMethod\MigrateToSimplifiedAttributeRector;
use RectorLaravel\Rector\Expr\AppEnvironmentComparisonToParameterRector;
use RectorLaravel\Rector\Expr\SubStrToStartsWithOrEndsWithStaticMethodCallRector\SubStrToStartsWithOrEndsWithStaticMethodCallRector;
use RectorLaravel\Rector\FuncCall\FactoryFuncCallToStaticCallRector;
use RectorLaravel\Rector\FuncCall\NowFuncWithStartOfDayMethodCallToTodayFuncRector;
use RectorLaravel\Rector\FuncCall\RemoveDumpDataDeadCodeRector;
use RectorLaravel\Rector\FuncCall\RemoveRedundantValueCallsRector;
use RectorLaravel\Rector\FuncCall\RemoveRedundantWithCallsRector;
use RectorLaravel\Rector\FuncCall\SleepFuncToSleepStaticCallRector;
use RectorLaravel\Rector\FuncCall\ThrowIfAndThrowUnlessExceptionsToUseClassStringRector;
use RectorLaravel\Rector\FuncCall\TypeHintTappableCallRector;
use RectorLaravel\Rector\If_\AbortIfRector;
use RectorLaravel\Rector\If_\ReportIfRector;
use RectorLaravel\Rector\If_\ThrowIfRector;
use RectorLaravel\Rector\MethodCall\AssertStatusToAssertMethodRector;
use RectorLaravel\Rector\MethodCall\AvoidNegatedCollectionFilterOrRejectRector;
use RectorLaravel\Rector\MethodCall\EloquentOrderByToLatestOrOldestRector;
use RectorLaravel\Rector\MethodCall\EloquentWhereRelationTypeHintingParameterRector;
use RectorLaravel\Rector\MethodCall\EloquentWhereTypeHintClosureParameterRector;
use RectorLaravel\Rector\MethodCall\FactoryApplyingStatesRector;
use RectorLaravel\Rector\MethodCall\JsonCallToExplicitJsonCallRector;
use RectorLaravel\Rector\MethodCall\RedirectBackToBackHelperRector;
use RectorLaravel\Rector\MethodCall\RedirectRouteToToRouteHelperRector;
use RectorLaravel\Rector\MethodCall\RefactorBlueprintGeometryColumnsRector;
use RectorLaravel\Rector\MethodCall\ReplaceWithoutJobsEventsAndNotificationsWithFacadeFakeRector;
use RectorLaravel\Rector\MethodCall\ResponseHelperCallToJsonResponseRector;
use RectorLaravel\Rector\MethodCall\ReverseConditionableMethodCallRector;
use RectorLaravel\Rector\MethodCall\ValidationRuleArrayStringValueToArrayRector;
use RectorLaravel\Rector\MethodCall\WhereToWhereLikeRector;
use RectorLaravel\Rector\Namespace_\FactoryDefinitionRector;
use RectorLaravel\Rector\PropertyFetch\ReplaceFakerInstanceWithHelperRector;
use RectorLaravel\Rector\StaticCall\CarbonSetTestNowToTravelToRector;
use RectorLaravel\Rector\StaticCall\DispatchToHelperFunctionsRector;
use RectorLaravel\Rector\StaticCall\EloquentMagicMethodToQueryBuilderRector;
use RectorLaravel\Rector\StaticCall\Redirect301ToPermanentRedirectRector;
use RectorLaravel\Rector\StaticCall\RequestStaticValidateToInjectRector;
use RectorLaravel\Rector\StaticCall\RouteActionCallableRector;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->paths([
        __DIR__.'/app',
        __DIR__.'/config',
        __DIR__.'/database',
        __DIR__.'/public',
        __DIR__.'/resources',
        __DIR__.'/routes',
        __DIR__.'/tests',
    ]);

    $rectorConfig->sets([
        SetList::DEAD_CODE,
        SetList::CODE_QUALITY,
        LevelSetList::UP_TO_PHP_82,
    ]);

    $rectorConfig->rules([
        AbortIfRector::class,
        AddExtendsAnnotationToModelFactoriesRector::class,
        AddGenericReturnTypeToRelationsRector::class,
        AnonymousMigrationsRector::class,
        AppEnvironmentComparisonToParameterRector::class,
        AssertStatusToAssertMethodRector::class,
        AvoidNegatedCollectionFilterOrRejectRector::class,
        CarbonSetTestNowToTravelToRector::class,
        DispatchToHelperFunctionsRector::class,
        EloquentMagicMethodToQueryBuilderRector::class,
        EloquentOrderByToLatestOrOldestRector::class,
        EloquentWhereRelationTypeHintingParameterRector::class,
        EloquentWhereTypeHintClosureParameterRector::class,
        FactoryApplyingStatesRector::class,
        FactoryDefinitionRector::class,
        FactoryFuncCallToStaticCallRector::class,
        JsonCallToExplicitJsonCallRector::class,
        MigrateToSimplifiedAttributeRector::class,
        ModelCastsPropertyToCastsMethodRector::class,
        NowFuncWithStartOfDayMethodCallToTodayFuncRector::class,
        PropertyDeferToDeferrableProviderToRector::class,
        Redirect301ToPermanentRedirectRector::class,
        RedirectBackToBackHelperRector::class,
        RedirectRouteToToRouteHelperRector::class,
        RefactorBlueprintGeometryColumnsRector::class,
        RemoveDumpDataDeadCodeRector::class,
        RemoveModelPropertyFromFactoriesRector::class,
        RemoveRedundantValueCallsRector::class,
        RemoveRedundantWithCallsRector::class,
        ReplaceExpectsMethodsInTestsRector::class,
        ReplaceFakerInstanceWithHelperRector::class,
        ReplaceWithoutJobsEventsAndNotificationsWithFacadeFakeRector::class,
        ReportIfRector::class,
        RequestStaticValidateToInjectRector::class,
        RequestVariablesToRequestFacadeRector::class,
        ResponseHelperCallToJsonResponseRector::class,
        ReverseConditionableMethodCallRector::class,
        RouteActionCallableRector::class,
        ServerVariableToRequestFacadeRector::class,
        SessionVariableToSessionFacadeRector::class,
        SleepFuncToSleepStaticCallRector::class,
        SubStrToStartsWithOrEndsWithStaticMethodCallRector::class,
        ThrowIfAndThrowUnlessExceptionsToUseClassStringRector::class,
        ThrowIfRector::class,
        TypeHintTappableCallRector::class,
        UnifyModelDatesWithCastsRector::class,
        ValidationRuleArrayStringValueToArrayRector::class,
        WhereToWhereLikeRector::class,
    ]);
};
