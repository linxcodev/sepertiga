<?php

namespace App\Services;

use App\Models\Uang;
use Illuminate\Support\Facades\DB;

class UangService
{
    public function pemasukan(array $data)
    {
        $kategori = $data['nama_kategori'];
        
        if ($kategori) {
            $total = (int) $data['total'] + $this->getTotal($kategori);
            return $this->update($kategori, $total);
        }

        $hasil = (int) $data['total'] / 3;

        foreach ($this->getAllUang() as $uang) {
            $total = (int) $hasil + $this->getTotal($uang['nama_kategori']);
            $this->update($uang['nama_kategori'], $total);
        }

        return;
    }

    public function pengeluaran(array $data)
    {
        $kategori = $data['nama_kategori'];
        $totalDariDB = $this->getTotal($kategori);
        $totalDt = (int) $data['total'];
        
        if ($kategori && $totalDariDB > $totalDt) {
            $total =  $totalDariDB - $totalDt;
            return $this->update($kategori, $total);
        }

        return;
    }

    public function update($kategori, $total) : int
    {
        return Uang::where('nama_kategori', $kategori)->update([
            'total' => $total
        ]);
    }

    public function getTotal(string $kategori)
    {
        $uang = Uang::where('nama_kategori', $kategori)->first();

        if($uang) {
            return (int) $uang->total;
        } else {
            new \Exception('invalid kategori');
        }
    }

    public function getAllUang()
    {
        return Uang::all()->toArray();
    }

    public function totalAll()
    {
        return Uang::select(DB::raw('SUM(total) AS total'))->first()->total;
    }
}
