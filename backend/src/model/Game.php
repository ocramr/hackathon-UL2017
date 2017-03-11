<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 10/03/17
 * Time: 15:43
 */

namespace app\model;


use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $table = 'game';
    public $timestamps = false;

    public function songs(){
        return $this->belongsToMany('app\model\Song','game_song','id_game','id_song');
    }

    public function players(){
        return $this->belongsToMany('app\model\Player','game_player','id_game','id_player')->withPivot('score', 'duration');
    }
}