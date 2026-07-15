<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return view('products.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return view('products.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    $request->validate([
            'product_name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'purchase_price' => 'required|numeric',
            'sell_price' => 'required|numeric',
            'quantity' => 'required|integer',

        ]);
        $category = Category::firstOrCreate(['name' => $request->input('category')]);

        $product = new Product();
        $product->name = $request->input('product_name');
        $product->category_id = $category->id;
        $product->purchase_price = $request->input('purchase_price');
        $product->sell_price = $request->input('sell_price');
        $product->quantity = $request->input('quantity');
        $product->created_by = 1; // Assuming you have authentication set up
        $product->save();


        return redirect()->route('products.index')->with('success', 'Product created successfully.');
        
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $selected_product = Product::findOrfail($id);
        $category = Category::find($selected_product->category_id);
        return view('products.show', compact('selected_product', 'category'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);
        $categories = Category::all();
        return view('products.edit', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'purchase_price' => 'required|numeric',
            'sell_price' => 'required|numeric',
            'quantity' => 'required|integer',

        ]);
        $category = Category::firstOrCreate(['name' => $request->input('category')]);
        $product = Product::findOrFail($id);
        $product->name = $request->input('product_name');
        $product->category_id = $category->id;
        $product->purchase_price = $request->input('purchase_price');
        $product->sell_price = $request->input('sell_price');
        $product->quantity = $request->input('quantity');
        $product->created_by = 1; // Assuming you have authentication set up
        $product->save();
    
        return redirect()->route('products.index')->with('success_edit', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
    
        return redirect()->route('products.index')->with('success_delete', 'Product deleted successfully.');
    }
}
