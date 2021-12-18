<?php

namespace App\Services;

use App\Models\Kategori;
use App\Models\Pengeluaran;

class PengeluaranService
{
    public function store(array $data)
    {
        $kategori = $data['nama_kategori'] ?: 'semua';

        return Pengeluaran::create([
            'id_kategori' => $this->getIdKategori($kategori),
            'nama_kategori' => $kategori,
            'nominal' => $data['total'],
            'keterangan' => 'Pengeluaran di ' . $kategori
        ]);
    }

    public function getIdKategori(string $kategori)
    {
        $kategori = Kategori::where('nama_kategori', $kategori)->first();

        if($kategori) {
            return $kategori->id;
        } else {
            new \Exception('invalid kategori');
        }
    }
}
