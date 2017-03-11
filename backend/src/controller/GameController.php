<?php

namespace app\controller;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use app\model\Player;
use app\model\Game;
use app\model\Song;
use app\model\Game_Song;
use app\model\Game_Player;

class GameController extends AbstractController
{

    public function play($request, $response, $args)
    {

    	try 
    	{
    		$data = $request->getParams();

    		if (!isset($data["gameName"]) || !isset($data["userName"]) || !isset($data["owner"]) || !isset($data["songs"]))
    			return $this->json_error($response, 400, "Missing parameters");

    		$player = Player::where("id", "=", filter_var($data['owner'], FILTER_SANITIZE_STRING))->first();
            if (empty($player)) {
        		$player->id = filter_var($data['owner'], FILTER_SANITIZE_STRING);
        		$player->pseudo = filter_var($data['userName'], FILTER_SANITIZE_STRING);
        		$player->save();
            }

    		$game = new Game();
    		$game->name = filter_var($data['gameName'], FILTER_SANITIZE_STRING);
    		$game->owner = filter_var($data['owner'], FILTER_SANITIZE_STRING);
    		$game->save();

    		foreach ($data["songs"] as $song) {
    			$newSong = new Song();
    			$newSong->id = filter_var($song['id'], FILTER_SANITIZE_STRING);
    			$newSong->name = filter_var($song['name'], FILTER_SANITIZE_STRING);
    			$newSong->url = filter_var($song['uri'], FILTER_SANITIZE_STRING);
    			$newSong->preview_url = filter_var($song['preview_url'], FILTER_SANITIZE_STRING);
    			$newSong->save();

    			$game_song = new Game_Song();
    			$game_song->id_game = $game->id;
    			$game_song->id_song = filter_var($song['id'], FILTER_SANITIZE_STRING);
    			$game_song->save();
    		}

    		$game_player = new Game_Player();
    		$game_player->id_game = $game->id;
    		$game_player->id_player = filter_var($data['owner'], FILTER_SANITIZE_STRING);
    		$game_player->save();

    		return $this->json_success($response, 200, json_encode($game));

    	} catch (ModelNotFoundException $e) {
    		return $this->json_error($response, 404, "Not found");
    	}
    	
    }

}