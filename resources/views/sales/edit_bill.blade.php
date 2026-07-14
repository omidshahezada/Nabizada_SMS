@extends('layouts.master')
@section('page_title')
ویرایش فاکتور
@endsection
@section('title')
ویرایش فاکتور
@endsection
@section('content')
<div class="card">
  <div class="card-header">
    <h3 class="card-title">ویرایش سربرگ و پابرگ فاکتور #{{ $sale->id }}</h3>
  </div>
  <div class="card-body">
    <form action="{{ route('sales.updateBill', $sale->id) }}" method="POST">
      @csrf
      <div class="form-group">
        <label>سربرگ (متن ساده)</label>
        <textarea name="bill_header" class="form-control" rows="6" placeholder="متن سربرگ را وارد کنید">{{ old('bill_header', $sale->bill_header) }}</textarea>
        <small class="form-text text-muted">از وارد کردن HTML خودداری کنید؛ برای خط جدید فقط Enter بزنید.</small>
      </div>
      <div class="form-group">
        <label>پابرگ (متن ساده)</label>
        <textarea name="bill_footer" class="form-control" rows="4" placeholder="متن پابرگ را وارد کنید">{{ old('bill_footer', $sale->bill_footer) }}</textarea>
        <small class="form-text text-muted">متن ساده بنویسید. خطوط جدید به صورت خودکار نمایش داده می‌شوند.</small>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">ذخیره</button>
        <a href="{{ route('sales.bill', $sale->id) }}" class="btn btn-secondary">بازگشت به فاکتور</a>
      </div>
    </form>
  </div>
</div>
@endsection
