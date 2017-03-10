<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 10/03/17
 * Time: 15:43
 */

namespace app\model;


use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $table = 'player';
    public $timestamps = false;
}