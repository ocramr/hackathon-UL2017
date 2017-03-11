<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 10/03/17
 * Time: 15:43
 */

namespace app\model;


use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $table = 'song';
    public $timestamps = false;

    public function games(){
        return $this->belongsToMany('app\model\Game','game_song','id_song','id_game');
    }
}