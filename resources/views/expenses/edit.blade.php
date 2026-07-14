@extends("layouts.master")

@section("page_title")
ویرایش هزینه
@endsection

@section("title")
ویرایش هزینه
@endsection

@section("content")
<div class="card card-warning">
    <div class="card-header">
        <h3 class="card-title">فرم ویرایش هزینه</h3>
    </div>
    <form method="POST" action="{{ route('expenses.update', $expense->id) }}">
        @csrf
        @method('PUT')
        <div class="card-body">
            <div class="form-group">
                <label>عنوان</label>
                <input type="text" name="title" value="{{ old('title', $expense->title) }}" class="form-control @error('title') is-invalid @enderror">
                @error('title')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
            <div class="form-group">
                <label>مبلغ</label>
                <input type="number" step="0.01" name="amount" value="{{ old('amount', $expense->amount) }}" class="form-control @error('amount') is-invalid @enderror">
                @error('amount')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
            <div class="form-group">
                <label>تاریخ هزینه</label>
                <input type="datetime-local" name="expense_date" value="{{ old('expense_date', \Carbon\Carbon::parse($expense->expense_date)->format('Y-m-d\TH:i')) }}" class="form-control @error('expense_date') is-invalid @enderror">
                @error('expense_date')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
            <div class="form-group">
                <label>توضیحات</label>
                <textarea name="description" class="form-control @error('description') is-invalid @enderror" rows="4">{{ old('description', $expense->description) }}</textarea>
                @error('description')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
        </div>
        <div class="card-footer">
            <button type="submit" class="btn btn-warning">ذخیره تغییرات</button>
            <button type="button" class="btn btn-default float-left" onclick="window.location.href='{{ route('transactions.index') }}'">لغو</button>
        </div>
    </form>
</div>
@endsection
