@extends("layouts.master")

@section("page_title")
افزودن تراکنش جدید
@endsection

@section("title")
افزودن تراکنش جدید
@endsection

@section("content")
<div class="card card-info">
    <div class="card-header">
        <h3 class="card-title">فرم تراکنش جدید</h3>
    </div>
    <form method="POST" action="{{ route('transactions.store') }}">
        @csrf
        <div class="card-body">
            <div class="form-group">
                <label>نوع تراکنش</label>
                <input type="text" name="type" value="{{ old('type') }}" class="form-control @error('type') is-invalid @enderror" placeholder="مثال: درآمد یا هزینه">
                @error('type')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
            <div class="form-group">
                <label>مبلغ</label>
                <input type="number" step="0.01" name="amount" value="{{ old('amount') }}" class="form-control @error('amount') is-invalid @enderror" placeholder="مبلغ را وارد کنید">
                @error('amount')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
            <div class="form-group">
                <label>تاریخ تراکنش</label>
                <input type="datetime-local" name="transaction_date" value="{{ old('transaction_date') }}" class="form-control @error('transaction_date') is-invalid @enderror">
                @error('transaction_date')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
            <div class="form-group">
                <label>توضیحات</label>
                <textarea name="description" class="form-control @error('description') is-invalid @enderror" rows="4">{{ old('description') }}</textarea>
                @error('description')<span class="text-danger">{{ $message }}</span>@enderror
            </div>
        </div>
        <div class="card-footer">
            <button type="submit" class="btn btn-info">ثبت تراکنش</button>
            <button type="button" class="btn btn-default float-left" onclick="window.location.href='{{ route('transactions.index') }}'">لغو</button>
        </div>
    </form>
</div>
@endsection
