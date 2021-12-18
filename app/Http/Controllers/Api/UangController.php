<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UangRequest;
use App\Http\Controllers\Controller;

use App\Services\UangService;
use App\Services\PemasukanService;
use App\Services\PengeluaranService;

class UangController extends Controller
{
    private UangService $uangService;
    private PemasukanService $pemasukanService;
    private PengeluaranService $pengeluaranService;

    public function __construct()
    {
        $this->uangService = new UangService();
        $this->pemasukanService = new PemasukanService();
        $this->pengeluaranService = new PengeluaranService();
    }

    public function index()
    {
        return $this->acceptData([
            'uang' => $this->uangService->getAllUang(),
            'total' => $this->uangService->totalAll()
        ]);
    }

    public function pemasukan(UangRequest $request)
    {
        $data = $request->validated;
        $this->uangService->pemasukan($data);
        $this->pemasukanService->store($data);

        return $this->accept();
    }

    public function pengeluaran(UangRequest $request)
    {
        $data = $request->validated;
        $pengeluaran = $this->uangService->pengeluaran($data);
        
        if (!empty($pengeluaran)) {
            $this->pengeluaranService->store($data);
            return $this->accept();
        }
        
        return $this->badRequest('Total pengeluaran melebihi kapasitas.');

    }
}
