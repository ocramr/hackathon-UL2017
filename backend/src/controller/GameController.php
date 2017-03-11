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

    public function play(Request $request, Response $response, $args)
    {
    	try 
    	{
    		$data = $request->getParsedBody();

    		if (!isset($data["gameName"]) || !isset($data["userName"]) || !isset($data["owner"]) || !isset($data["songs"]))
    			return $this->json_error($response, 400, "Missing parameters");

    		$player = Player::where("spotify_id", "=", filter_var($data['owner'], FILTER_SANITIZE_STRING))->first();
            if (is_null($player)) {
                $player = new Player();
        		$player->spotify_id = filter_var($data['owner'], FILTER_SANITIZE_STRING);
        		$player->pseudo = filter_var($data['userName'], FILTER_SANITIZE_STRING);
        		$player->save();
            }
            $game = new Game();
            $game->name = filter_var($data['gameName'], FILTER_SANITIZE_STRING);
            $game->owner = $player->spotify_id;
            $game->save();

    		foreach ($data["songs"] as $song) {
    		    $newSong = Song::find($song['id']);
    		    if(is_null($newSong)){
                    $newSong = new Song();
                    $newSong->id = filter_var($song['id'], FILTER_SANITIZE_STRING);
                    $newSong->name = filter_var($song['name'], FILTER_SANITIZE_STRING);
                    $newSong->url = filter_var($song['uri'], FILTER_SANITIZE_STRING);
                    $newSong->preview_url = filter_var($song['preview_url'], FILTER_SANITIZE_STRING);
                    $newSong->save();
                }
                $newSong->games()->attach($game);
    			/*$game_song = new Game_Song();
    			$game_song->id_game = $game->id;
    			$game_song->id_song = $newSong->id;*/
    			$newSong->save();
    		}

    		$game_player = new Game_Player();
    		$game_player->id_game = $game->id;
    		$game_player->id_player = filter_var($data['owner'], FILTER_SANITIZE_STRING);
    		$game_player->save();

    		return $this->json_success($response, 200, json_encode($game));

    	} catch (ModelNotFoundException $mne) {
    		return $this->json_error($response, 404, "Not found");
    	}catch (\Exception $e){
    	    return $this->json_error($response, 400, $e->getMessage());
        }
    	
    }

	public function finish($request, $response, $args){	
		$data = $request->getParsedBody();
		try{
			$game = Game::where("id", "=", filter_var($data['id_game'], FILTER_SANITIZE_STRING))->firstOrfail();
			$game->state++;
			$player = Game_Player::where("id_game", "=", filter_var($data['id_game'], FILTER_SANITIZE_STRING))->firstOrfail();
			$player->score = filter_var($data['score'], FILTER_SANITIZE_STRING);
			return $this->json_success($response, 201, json_encode(null));
		}
		catch(ModelNotFoundException $ex){
			return $this->json_error($response, 404, "Not found");
		}
	}

    public function joinGame(Request $request, Response $response, $args)
    {
        try
        {
            $id = filter_var($args['id']);
            $data = $request->getParsedBody();

            $player = Player::where("spotify_id", "=", filter_var($data['owner'], FILTER_SANITIZE_STRING))->first();
            if (empty($player)) {
                $player = new Player();
                $player->id = filter_var($data['owner'], FILTER_SANITIZE_STRING);
                $player->pseudo = filter_var($data['userName'], FILTER_SANITIZE_STRING);
                $player->save();
            }
            $game = Game::where("id", "=", $id)->firstOrFail();
            $game_player = new Game_Player();
            $game_player->id_game = $game->id;
            $game_player->id_player = $player->id;
            $game_player->save();

            return $this->json_success($response, 201, json_encode([
                "id"=>$game->id_game, "songs"=>$game->songs
            ]));
        } catch (ModelNotFoundException $mne) {
            return $this->json_error($response, 404, "Not found");
        }catch (\Exception $e){
            return $this->json_error($response, 400, $e->getMessage());
        }

    }

}