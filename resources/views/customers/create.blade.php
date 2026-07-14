@extends("layouts.master")
@section("page_title")
ایجاد مشتری
@endsection
@section("title")
ایجاد مشتری جدید
@endsection
@section("content")
<div class="container-fluid">
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="card-title">فرم ایجاد مشتری</h3>
    </div>
    <form method="POST" action="{{ route('customers.store') }}">
      @csrf
      <div class="card-body">
        <div class="form-group">
          <label for="name">نام مشتری</label>
          <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name') }}" placeholder="نام مشتری را وارد کنید">
          @error('name')<span class="text-danger">{{ $message }}</span>@enderror
        </div>
        <div class="form-group">
          <label for="phone">تلفن</label>
          <input type="text" class="form-control @error('phone') is-invalid @enderror" id="phone" name="phone" value="{{ old('phone') }}" placeholder="تلفن مشتری را وارد کنید">
          @error('phone')<span class="text-danger">{{ $message }}</span>@enderror
        </div>
        <div class="form-group">
          <label for="address">آدرس</label>
          <textarea class="form-control @error('address') is-invalid @enderror" id="address" name="address" rows="3" placeholder="آدرس مشتری را وارد کنید">{{ old('address') }}</textarea>
          @error('address')<span class="text-danger">{{ $message }}</span>@enderror
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-primary">ذخیره</button>
        <a href="{{ route('customers.index') }}" class="btn btn-secondary">انصراف</a>
      </div>
    </form>
  </div>
</div>
@endsection
