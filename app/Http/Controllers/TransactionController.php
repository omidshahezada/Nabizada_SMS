<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Expense;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::orderByDesc('transaction_date')->get();
        $expenses = Expense::orderByDesc('expense_date')->get();

        $transactionCount = $transactions->count();
        $transactionTotal = $transactions->sum('amount');
        $expenseCount = $expenses->count();
        $expenseTotal = $expenses->sum('amount');
        $netBalance = $transactionTotal - $expenseTotal;

        return view('transactions.index', compact(
            'transactions',
            'expenses',
            'transactionCount',
            'transactionTotal',
            'expenseCount',
            'expenseTotal',
            'netBalance'
        ));
    }

    public function create()
    {
        return view('transactions.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric'],
            'transaction_date' => ['required', 'date'],
            'description' => ['nullable', 'string'],
        ]);

        Transaction::create([
            'type' => $request->input('type'),
            'amount' => $request->input('amount'),
            'description' => $request->input('description'),
            'transaction_date' => $request->input('transaction_date'),
            'created_by' => auth()->id() ?? 1,
        ]);

        return redirect()->route('transactions.index')->with('success', 'تراکنش با موفقیت ثبت شد.');
    }

    public function show(string $id)
    {
        $transaction = Transaction::findOrFail($id);

        return view('transactions.show', compact('transaction'));
    }

    public function edit(string $id)
    {
        $transaction = Transaction::findOrFail($id);

        return view('transactions.edit', compact('transaction'));
    }

    public function update(Request $request, string $id)
    {
        $transaction = Transaction::findOrFail($id);

        $request->validate([
            'type' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric'],
            'transaction_date' => ['required', 'date'],
            'description' => ['nullable', 'string'],
        ]);

        $transaction->update([
            'type' => $request->input('type'),
            'amount' => $request->input('amount'),
            'description' => $request->input('description'),
            'transaction_date' => $request->input('transaction_date'),
        ]);

        return redirect()->route('transactions.index')->with('success_edit', 'تراکنش با موفقیت ویرایش شد.');
    }

    public function destroy(string $id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return redirect()->route('transactions.index')->with('success_delete', 'تراکنش با موفقیت حذف شد.');
    }
}
