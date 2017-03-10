<?php

namespace app\controller;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class GameController extends AbstractController
{

    public function play(Request $request, Response $response, $args){
    	echo "true";
    }

}