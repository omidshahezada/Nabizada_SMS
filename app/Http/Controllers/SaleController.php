<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;
use App\Models\Product;
use App\Models\Sale_item;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with(['customer', 'user'])->get();
        return view('sales.index', compact('sales'));
    }

    /**
     * Display today's sales
     */
    public function today()
    {
        $todaySales = Sale::with(['customer', 'user'])
            ->whereDate('created_at', now())
            ->latest('created_at')
            ->get();
        
        $totalSales = $todaySales->count();
        $totalAmount = $todaySales->sum('total_amount');
        $totalPaid = $todaySales->sum('paid_amount');
        $totalDiscount = $todaySales->sum('discount');

        return view('sales.today', compact('todaySales', 'totalSales', 'totalAmount', 'totalPaid', 'totalDiscount'));
    }

    /*
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        $customers = Customer::all();
        return view('sales.create', compact('products', 'customers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'paid_amount' => 'nullable|numeric',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.discount' => 'nullable|numeric|min:0',
            'items.*.total_price' => 'required|numeric|min:0',
        ]);

        $items = $request->input('items', []);

        // server-side stock validation: ensure requested quantities are available
        foreach ($items as $it) {
            $product = Product::find($it['product_id']);
            if ($product) {
                $available = $product->quantity ?? 0;
                if ($available < $it['quantity']) {
                    return redirect()->back()
                        ->withInput()
                        ->withErrors(['stock' => "محصول {$product->name} دارای موجودی کافی نیست (موجودی فعلی: {$available})."]);
                }
            }
        }

        $totalAmount = collect($items)->sum('total_price');
        $totalDiscount = collect($items)->sum(function ($it) {
            return isset($it['discount']) ? floatval($it['discount']) : 0;
        });
        $paid = $request->input('paid_amount', 0);
        $customerId = $request->input('customer_id');

        DB::transaction(function () use ($customerId, $items, $totalAmount, $paid, $totalDiscount, &$sale) {
            $sale = Sale::create([
                'customer_id' => $customerId ?: null,
                'total_amount' => $totalAmount,
                'discount' => $totalDiscount,
                'paid_amount' => $paid,
                'status' => 'completed',
                'created_by' => Auth::id() ?? 1,
            ]);

            foreach ($items as $it) {
                $saleItem = Sale_item::create([
                    'sale_id' => $sale->id,
                    'product_id' => $it['product_id'],
                    'quantity' => $it['quantity'],
                    'unit_price' => $it['unit_price'],
                    'discount' => $it['discount'] ?? 0,
                    'total_price' => $it['total_price'],
                ]);

                // decrement product stock
                $product = Product::find($it['product_id']);
                if ($product) {
                    $product->quantity = max(0, ($product->quantity ?? 0) - $it['quantity']);
                    $product->save();
                }
            }
        });

        return redirect()->route('sales.bill', $sale->id);
    }

    /**
     * Show printable bill for a sale
     */
    public function bill($id)
    {
        $sale = Sale::with(['saleItems.product', 'customer', 'user'])->findOrFail($id);
        $company = \App\Models\CompanySetting::first();
        return view('sales.bill', compact('sale', 'company'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return redirect()->route('sales.bill', $id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $sale = Sale::with('customer')->findOrFail($id);
        $customers = Customer::all();
        return view('sales.edit', compact('sale', 'customers'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $sale = Sale::findOrFail($id);

        $data = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'paid_amount' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        $sale->update([
            'customer_id' => $data['customer_id'] ?: null,
            'paid_amount' => $data['paid_amount'],
            'status' => $data['status'],
        ]);

        return redirect()->route('sales.index')->with('success', 'فروش با موفقیت به‌روزرسانی شد');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sale = Sale::with('saleItems')->findOrFail($id);

        DB::transaction(function () use ($sale) {
            $sale->saleItems()->delete();
            $sale->delete();
        });

        return redirect()->route('sales.index')->with('success_delete', 'فروش با موفقیت حذف شد');
    }

    /**
     * Show edit form for bill header/footer
     */
    public function editBill($id)
    {
        $sale = Sale::findOrFail($id);
        return view('sales.edit_bill', compact('sale'));
    }

    /**
     * Update bill header/footer for a sale
     */
    public function updateBill(Request $request, $id)
    {
        $sale = Sale::findOrFail($id);
        $data = $request->validate([
            'bill_header' => 'nullable|string',
            'bill_footer' => 'nullable|string',
        ]);
        $sale->update($data);
        return redirect()->route('sales.bill', $sale->id)->with('success', 'فاکتور بروزرسانی شد');
    }
}
