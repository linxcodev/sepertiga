<?php

namespace App\Http\Requests;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UangRequest extends Controller
{
    public $validated;
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function __construct(Request $request)
    {
        $this->validated = $this->validate($request, [
            'total' => 'required',
            'nama_kategori' => 'string',
        ]);

        parent::__construct($request);
    }
}
