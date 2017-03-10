<?php

namespace app\controller;

use Interop\Container\ContainerInterface;

class AbstractController
{
    protected $container;

    /**
     * APIController constructor.
     * @param $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }
}