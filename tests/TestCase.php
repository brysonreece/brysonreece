<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Inertia\Testing\AssertableInertia;

abstract class TestCase extends BaseTestCase
{
    /**
     * Setup the test environment.
     */
    protected function setUp(): void
    {
        parent::setUp();

        // Initialize Inertia testing assertions
        AssertableInertia::macro('component', function ($expected) {
            $this->where('component', $expected);

            return $this;
        });
    }
}
