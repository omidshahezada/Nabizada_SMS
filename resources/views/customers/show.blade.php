@extends("layouts.master")
@section("page_title")
مشاهده مشتری
@endsection
@section("title")
جزئیات مشتری
@endsection
@section("content")
<div class="container-fluid">
  <div class="card card-info">
    <div class="card-header">
      <h3 class="card-title">اطلاعات مشتری</h3>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-4">
          <strong>نام مشتری:</strong>
          <p class="text-muted">{{ $customer->name }}</p>
        </div>
        <div class="col-md-4">
          <strong>تلفن:</strong>
          <p class="text-muted">{{ $customer->phone }}</p>
        </div>
        <div class="col-md-4">
          <strong>آدرس:</strong>
          <p class="text-muted">{{ $customer->address }}</p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <a href="{{ route('customers.edit', $customer->id) }}" class="btn btn-warning">ویرایش</a>
      <a href="{{ route('customers.index') }}" class="btn btn-secondary">بازگشت</a>
    </div>
  </div>
</div>
@endsection
