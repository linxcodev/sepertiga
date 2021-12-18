<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Uang;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call('UsersTableSeeder');
        // kategori
        Kategori::insert([
            ['nama_kategori' => 'sodaqoh'],
            ['nama_kategori' => 'modal'],
            ['nama_kategori' => 'kebutuhan'],
        ]);

        // uang
        Uang::insert([
            ['id_kategori' => 1, 'nama_kategori' => 'sodaqoh', 'total' => 0],
            ['id_kategori' => 2, 'nama_kategori' => 'modal', 'total' => 0],
            ['id_kategori' => 3, 'nama_kategori' => 'kebutuhan', 'total' => 0],
        ]);
    }
}
