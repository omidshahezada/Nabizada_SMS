@extends("layouts.master")
@section("page_title")
ویرایش مشتری
@endsection
@section("title")
ویرایش مشتری
@endsection
@section("content")
<div class="container-fluid">
  <div class="card card-warning">
    <div class="card-header">
      <h3 class="card-title">فرم ویرایش مشتری</h3>
    </div>
    <form method="POST" action="{{ route('customers.update', $customer->id) }}">
      @csrf
      @method('PUT')
      <div class="card-body">
        <div class="form-group">
          <label for="name">نام مشتری</label>
          <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name', $customer->name) }}" placeholder="نام مشتری را وارد کنید">
          @error('name')<span class="text-danger">{{ $message }}</span>@enderror
        </div>
        <div class="form-group">
          <label for="phone">تلفن</label>
          <input type="text" class="form-control @error('phone') is-invalid @enderror" id="phone" name="phone" value="{{ old('phone', $customer->phone) }}" placeholder="تلفن مشتری را وارد کنید">
          @error('phone')<span class="text-danger">{{ $message }}</span>@enderror
        </div>
        <div class="form-group">
          <label for="address">آدرس</label>
          <textarea class="form-control @error('address') is-invalid @enderror" id="address" name="address" rows="3" placeholder="آدرس مشتری را وارد کنید">{{ old('address', $customer->address) }}</textarea>
          @error('address')<span class="text-danger">{{ $message }}</span>@enderror
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-warning">به‌روزرسانی</button>
        <a href="{{ route('customers.index') }}" class="btn btn-secondary">انصراف</a>
      </div>
    </form>
  </div>
</div>
@endsection
