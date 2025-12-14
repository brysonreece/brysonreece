<?php

function prybar($object): mixed
{
    return new class($object)
    {
        public $reflected;

        public function __construct(public $object)
        {
            $this->reflected = new ReflectionClass($this->object);
        }

        public function &__get($name)
        {
            $getProperty = (fn &() => $this->{$name});

            $getProperty = $getProperty->bindTo($this->object, $this->object::class);

            return $getProperty();
        }

        public function __set($name, $value)
        {
            $setProperty = function () use ($name, &$value) {
                $this->{$name} = $value;
            };

            $setProperty = $setProperty->bindTo($this->object, $this->object::class);

            $setProperty();
        }

        public function __call($name, $params)
        {
            $method = $this->reflected->getMethod($name);

            return $method->invoke($this->object, ...$params);
        }
    };
}
