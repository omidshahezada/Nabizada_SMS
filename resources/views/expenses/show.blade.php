@extends("layouts.master")

@section("page_title")
مشاهده هزینه
@endsection

@section("title")
مشاهده هزینه
@endsection

@section("content")
<div class="card card-success">
    <div class="card-header">
        <h3 class="card-title">جزئیات هزینه</h3>
    </div>
    <div class="card-body">
        <dl class="row">
            <dt class="col-sm-3">شناسه</dt>
            <dd class="col-sm-9">{{ $expense->id }}</dd>

            <dt class="col-sm-3">عنوان</dt>
            <dd class="col-sm-9">{{ $expense->title }}</dd>

            <dt class="col-sm-3">مبلغ</dt>
            <dd class="col-sm-9">{{ $expense->amount }}</dd>

            <dt class="col-sm-3">تاریخ</dt>
            <dd class="col-sm-9">{{ $expense->expense_date }}</dd>

            <dt class="col-sm-3">توضیحات</dt>
            <dd class="col-sm-9">{{ $expense->description }}</dd>
        </dl>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-default" onclick="window.location.href='{{ route('transactions.index') }}'">بازگشت</button>
    </div>
</div>
@endsection
