<?php

namespace App\Http\Controllers;

use App\Events\Message;
use Illuminate\Http\Request;

class ChatAppController extends Controller
{
    public function  chatapp(Request $req)
    {
        event(new Message(
            $req->input('username'),
            $req->input('message')
        ));

        return 'kaj korse';
    }
}
