<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SaleItemController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompanySettingController;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login');

// keep old /dashboard URL working and redirect it to the new /index path
Route::redirect('/dashboard', '/index');

Route::get('/index', function () {
    $productsInStock = Product::count();
    $todaySales = Sale::whereDate('created_at', now())->count();
    $todayIncome = Sale::whereDate('created_at', now())->sum('paid_amount');
    $monthlyRevenue = Sale::whereYear('created_at', now()->year)
        ->whereMonth('created_at', now()->month)
        ->sum('total_amount');
    $lastSales = Sale::with(['customer', 'user'])
        ->latest('created_at')
        ->take(10)
        ->get();

    return view('index', compact('productsInStock', 'todaySales', 'todayIncome', 'monthlyRevenue', 'lastSales'));
})->name('index')->middleware('auth');

// ====== ADMIN ROUTES (Admin only) ======
Route::middleware(['auth', 'role:admin'])->group(function () {
    // User Management
    Route::resource('/users', UserController::class);
    
    // Company Settings
    Route::get('/settings/company', [CompanySettingController::class, 'edit'])->name('settings.company');
    Route::post('/settings/company', [CompanySettingController::class, 'update'])->name('settings.company.update');
    
    // Product Management (full access)
    Route::resource('/products', ProductController::class);
    
    // Transaction Management
    Route::resource('/transactions', TransactionController::class);
    
    // Expense Management
    Route::resource('/expenses', ExpenseController::class);
});

// ====== SELLER ROUTES (Seller and Admin) ======
Route::middleware(['auth', 'role:seller,admin'])->group(function () {
    // Sales Management
    Route::resource('/sales', SaleController::class);
    Route::get('/sales/today/list', [SaleController::class, 'today'])->name('sales.today');
    Route::get('/sales/{sale}/bill', [SaleController::class, 'bill'])->name('sales.bill');
    Route::get('/sales/{sale}/edit-bill', [SaleController::class, 'editBill'])->name('sales.editBill');
    Route::post('/sales/{sale}/update-bill', [SaleController::class, 'updateBill'])->name('sales.updateBill');
    
    // Customer Management
    Route::resource('/customers', CustomerController::class);
    
    // Sale Items
    Route::resource('/sale-items', SaleItemController::class);
});

// ====== MONITOR ROUTES (Monitor, Seller and Admin - Read Only) ======
Route::middleware(['auth', 'role:monitor,seller,admin'])->group(function () {
    // Monitor can only view (GET) these resources
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
    
    Route::get('/sales', [SaleController::class, 'index'])->name('sales.index');
    Route::get('/sales/today/list', [SaleController::class, 'today'])->name('sales.today');
    Route::get('/sales/{sale}', [SaleController::class, 'show'])->name('sales.show');
    Route::get('/sales/{sale}/bill', [SaleController::class, 'bill'])->name('sales.bill');
    
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('/customers/{customer}', [CustomerController::class, 'show'])->name('customers.show');
    
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');
});

// Test routes for custom error pages
Route::get('/500', function () {
    return view('505');
});
Route::get('/pro', function () {
    return view('inventory');
});
Route::get('/f', function () {
    return view('form');
});
Route::get('/err404', function () {
    abort(404);
});
Route::get('/err505', function () {
    abort(505);
});

require __DIR__.'/auth.php';
