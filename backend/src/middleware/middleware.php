<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Illuminate\Database\Eloquent\ModelNotFoundException as NotFound;

function CORS(Request $req, Response $resp, callable $next) {
    $origin = $req->getHeader('origin');
    $origin = '*';
    $resp = $resp->withHeader('Access-Control-Allow-Origin',$origin )
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    return $next($req, $resp);
}