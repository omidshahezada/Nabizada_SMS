@extends("layouts.master")

@section("page_title")
ویرایش تراکنش
@endsection

@section("title")
ویرایش تراکنش
@endsection

@section("content")
<div class="card card-warning">
    <div class="card-header">
        <h3 class="card-title">فرم ویرایش تراکنش</h3>
    </div>
    <form method="POST" action="{{ route('transactions.update', $transaction->id) }}">
        @csrf
        @method('PUT')
        <div class="card-body">
            <div class="form-group">
                <label>نوع تراکنش</label>
                <input type="text" name="type" value="{{ old('type', $transaction->type) }}" class="form-control @error('type') is-invalid @enderror">
                @error('type')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
            <div class="form-group">
                <label>مبلغ</label>
                <input type="number" step="0.01" name="amount" value="{{ old('amount', $transaction->amount) }}" class="form-control @error('amount') is-invalid @enderror">
                @error('amount')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
            <div class="form-group">
                <label>تاریخ تراکنش</label>
                <input type="datetime-local" name="transaction_date" value="{{ old('transaction_date', 
                    
                    \Carbon\Carbon::parse($transaction->transaction_date)->format('Y-m-d\TH:i')) }}" class="form-control @error('transaction_date') is-invalid @enderror">
                @error('transaction_date')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
            <div class="form-group">
                <label>توضیحات</label>
                <textarea name="description" class="form-control @error('description') is-invalid @enderror" rows="4">{{ old('description', $transaction->description) }}</textarea>
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
