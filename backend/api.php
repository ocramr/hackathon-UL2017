<?php
use app\AppInit;

require_once 'vendor/autoload.php';

use app\controller\GameController;

AppInit::bootEloquent('conf/conf.ini');

$configuration = [
    'settings'=>[
        'displayErrorDetails'=>true,
        'production'=>false],
];
$configuration['notAllowedHandler'] = function ($c) {
    return function ($request, $response, $methods) use ($c) {
        return $c['response']
            ->withStatus(405)
            ->withHeader('Allow', implode(', ', $methods))
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode(["Message"=>'Method must be one of: ' . implode(', ', $methods)]));
    };
};

$configuration['notFoundHandler'] = function ($c) {
    return function ($request, $response){
        return $response->withStatus(404)
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode(["Message"=>'URI not found']));
    };
};

$c = new \Slim\Container($configuration);
$app = new Slim\App($c);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
})->add('CORS');

$app->group('/game', function (){

    $this->post('/play', GameController::class. ':play')->setName('play');
    $this->post('/finish', GameController::class. ':finish')->setName('finish');
    $this->put('/joinGame/{id}', GameController::class. ':joinGame')->setName('joinGame');
    $this->get('/rankings', GameController::class. ':rankings')->setName('rankings');


})->add('CORS');

$app->get('/games', GameController::class. ':allGames')->setName('allGames')->add('CORS');


$app->run();