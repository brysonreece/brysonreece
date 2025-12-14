<?php

function prybar($object): mixed
{
    return new class($object)
    {
        public $object;

        public $reflected;

        public function __construct($object)
        {
            $this->object = $object;
            $this->reflected = new ReflectionClass($object);
        }

        public function &__get($name)
        {
            $getProperty = function &() use ($name) {
                return $this->{$name};
            };

            $getProperty = $getProperty->bindTo($this->object, get_class($this->object));

            return $getProperty();
        }

        public function __set($name, $value)
        {
            $setProperty = function () use ($name, &$value) {
                $this->{$name} = $value;
            };

            $setProperty = $setProperty->bindTo($this->object, get_class($this->object));

            $setProperty();
        }

        public function __call($name, $params)
        {
            $method = $this->reflected->getMethod($name);

            return $method->invoke($this->object, ...$params);
        }
    };
}
