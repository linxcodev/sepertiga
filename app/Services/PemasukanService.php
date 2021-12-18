<?php

namespace App\Services;

use App\Models\Pemasukan;

class PemasukanService
{

    public function store(array $data)
    {
        $kategori = $data['nama_kategori'] ?: 'semua';

        return Pemasukan::create([
            'nominal' => $data['total'],
            'keterangan' => 'Masuk ke ' . $kategori
        ]);
    }
}

