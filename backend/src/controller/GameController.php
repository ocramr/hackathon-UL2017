<?php

namespace app\controller;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use app\model\Game;
use app\model\Song;
use app\model\Game_Song;

class GameController extends AbstractController
{

    public function play(Request $request, Response $response, $args)
    {

    	try 
    	{
    		$data = $request->getParams();

    		/*if (!isset($data["name"]) || !isset($data["owner"]) || !isset($data["songs"]))
    			return $this->json_error($response, 400, "Missing parameters");*/

    		var_dump($data);die;

    		$game = new Game();
    		$game->name = filter_var($data['name'], FILTER_SANITIZE_STRING);
    		//$game->save();

    		var_dump($data["songs"]);die;
    		foreach ($data["songs"] as $song) {
    			var_dump($song);
    			/*$newSong = new Song();
    			$newSong->id = $song["items"]["id"];
    			$newSong->url_spofity = $song["items"]["href"];
    			var_dump($newSong);*
    			//$newSong->save();

    			/*$game_song = new Game_Song();
    			$game_song->id_game = $game->id;
    			$game_song->id_song = $newSong->id;
    			$game_song->save();*/
    		}

    	} catch (ModelNotFoundException $e) {
    		return $this->json_error($response, 404, "Not found");
    	}
    	
    }

}