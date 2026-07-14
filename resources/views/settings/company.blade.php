@extends('layouts.master')
@section('page_title')
تنظیمات فاکتور
@endsection
@section('title')
تنظیمات فاکتور
@endsection
@section('content')
<div class="card">
  <div class="card-header">
    <h3 class="card-title">تنظیمات فاکتور و اطلاعات شرکت</h3>
  </div>
  <div class="card-body">
    @if(session('success'))
      <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    <form action="{{ route('settings.company.update') }}" method="POST" enctype="multipart/form-data">
      @csrf
      <div class="form-group">
        <label>نام شرکت</label>
        <input type="text" name="company_name" class="form-control" value="{{ old('company_name', $settings->company_name) }}">
      </div>
      <div class="form-group">
        <label>آدرس</label>
        <textarea name="address" class="form-control">{{ old('address', $settings->address) }}</textarea>
      </div>
      <div class="form-group">
        <label>تلفن</label>
        <input type="text" name="phone" class="form-control" value="{{ old('phone', $settings->phone) }}">
      </div>
      <div class="form-group">
        <label>لوگو شرکت</label>
        <div class="input-group">
          <input type="file" name="logo" id="logoInput" class="form-control" accept="image/*">
        </div>
        <small class="form-text text-muted">حداکثر اندازه: 2 مگابایت. فرمت‌های قابل‌قبول: JPEG, PNG, JPG, GIF</small>
        @if($settings->logo_path)
          <div class="mt-2">
            <img id="logoPreview" src="{{ asset('storage/' . $settings->logo_path) }}" alt="Company Logo" style="max-height: 100px; margin-top: 10px;">
          </div>
        @else
          <div class="mt-2">
            <img id="logoPreview" src="" alt="Company Logo" style="display:none; max-height: 100px; margin-top: 10px;">
          </div>
        @endif
      <div class="form-group">
        <label>سربرگ پیش‌فرض (متن ساده)</label>
        <textarea name="bill_header" class="form-control" rows="6" placeholder="متن سربرگ پیش‌فرض را وارد کنید">{{ old('bill_header', $settings->bill_header) }}</textarea>
        <small class="form-text text-muted">برای خط جدید Enter بزنید. HTML مجاز نیست.</small>
      </div>
      <div class="form-group">
        <label>پابرگ پیش‌فرض (متن ساده)</label>
        <textarea name="bill_footer" class="form-control" rows="4" placeholder="متن پابرگ پیش‌فرض را وارد کنید">{{ old('bill_footer', $settings->bill_footer) }}</textarea>
        <small class="form-text text-muted">برای خط جدید Enter بزنید. HTML مجاز نیست.</small>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">ذخیره تنظیمات</button>
      </div>
    </form>
  </div>
</div>
@endsection

@section('jslinks')
@endsection
