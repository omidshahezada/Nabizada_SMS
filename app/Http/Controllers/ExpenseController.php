<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::orderByDesc('expense_date')->get();

        return view('expenses.index', compact('expenses'));
    }

    public function create()
    {
        return view('expenses.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric'],
            'expense_date' => ['required', 'date'],
            'description' => ['nullable', 'string'],
        ]);

        Expense::create([
            'title' => $request->input('title'),
            'amount' => $request->input('amount'),
            'description' => $request->input('description'),
            'expense_date' => $request->input('expense_date'),
            'created_by' => auth()->id() ?? 1,
        ]);

        return redirect()->route('transactions.index')->with('success', 'هزینه با موفقیت ثبت شد.');
    }

    public function show(string $id)
    {
        $expense = Expense::findOrFail($id);

        return view('expenses.show', compact('expense'));
    }

    public function edit(string $id)
    {
        $expense = Expense::findOrFail($id);

        return view('expenses.edit', compact('expense'));
    }

    public function update(Request $request, string $id)
    {
        $expense = Expense::findOrFail($id);

        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric'],
            'expense_date' => ['required', 'date'],
            'description' => ['nullable', 'string'],
        ]);

        $expense->update([
            'title' => $request->input('title'),
            'amount' => $request->input('amount'),
            'description' => $request->input('description'),
            'expense_date' => $request->input('expense_date'),
        ]);

        return redirect()->route('transactions.index')->with('success_edit', 'هزینه با موفقیت ویرایش شد.');
    }

    public function destroy(string $id)
    {
        $expense = Expense::findOrFail($id);
        $expense->delete();

        return redirect()->route('transactions.index')->with('success_delete', 'هزینه با موفقیت حذف شد.');
    }
}
