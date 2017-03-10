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

    public function json_success(Response $response, $code, $content){
        $response = $response->withStatus($code)
            ->withHeader('Content-Type', 'application/json;charset=utf8');
        $response->getBody()->write($content);
        return $response;
    }

    public function json_message(Response $response, $code, $message){
        $response = $response->withStatus($code)
            ->withHeader('Content-Type', 'application/json;charset=utf8');
        $response->getBody()->write(["message" => $message]);
        return $response;
    }

    public function json_error(Response $response, $code, $content  = "Error processing request"){
        $response = $response->withStatus($code)
            ->withHeader('Content-Type', 'application/json;charset=utf8');
        $response->getBody()->write(json_encode(["error"=>$content]));
        return $response;
    }
}