<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale_item;

class SaleItemController extends Controller
{
    /**
     * Display a listing of all sale items.
     */
    public function index()
    {
        $saleItems = Sale_item::with(['sale', 'product'])
            ->latest('id')
            ->get();

        $totalItems = $saleItems->count();
        $totalQuantity = $saleItems->sum('quantity');
        $totalValue = $saleItems->sum('total_price');

        return view('sale_items.index', compact('saleItems', 'totalItems', 'totalQuantity', 'totalValue'));
    }
}
