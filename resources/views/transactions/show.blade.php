@extends("layouts.master")

@section("page_title")
مشاهده تراکنش
@endsection

@section("title")
مشاهده تراکنش
@endsection

@section("content")
<div class="card card-info">
    <div class="card-header">
        <h3 class="card-title">جزئیات تراکنش</h3>
    </div>
    <div class="card-body">
        <dl class="row">
            <dt class="col-sm-3">شناسه</dt>
            <dd class="col-sm-9">{{ $transaction->id }}</dd>

            <dt class="col-sm-3">نوع</dt>
            <dd class="col-sm-9">{{ $transaction->type }}</dd>

            <dt class="col-sm-3">مبلغ</dt>
            <dd class="col-sm-9">{{ $transaction->amount }}</dd>

            <dt class="col-sm-3">تاریخ</dt>
            <dd class="col-sm-9">{{ $transaction->transaction_date }}</dd>

            <dt class="col-sm-3">توضیحات</dt>
            <dd class="col-sm-9">{{ $transaction->description }}</dd>
        </dl>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-default" onclick="window.location.href='{{ route('transactions.index') }}'">بازگشت</button>
    </div>
</div>
@endsection
