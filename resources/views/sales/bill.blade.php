@extends('layouts.master')
@section('page_title')
فاکتور فروش
@endsection
@section('title')
فاکتور فروش
@endsection

@section('content')
@php
    $companyName = $company->company_name ?: 'شرکت شما';
    $companyAddress = $company->address ?: 'آدرس شرکت';
    $companyPhone = $company->phone ?: '021-xxxxxxx';
    $headerText = !empty($sale->bill_header) ? $sale->bill_header : ($company->bill_header ?? '');
    $footerText = !empty($sale->bill_footer) ? $sale->bill_footer : ($company->bill_footer ?? '');
    $logoPath = $company->logo_path ?? null;
@endphp

<div style="background: #fff; padding: 30px; border-radius: 8px; max-width: 900px; margin: 20px auto;">
  <!-- Header Row with Logo and Company Info -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 3px solid #2c5f8d; padding-bottom: 20px;">
    <div style="flex: 1;">
      @if($logoPath && file_exists(storage_path('app/public/' . $logoPath)))
        <img src="{{ asset('storage/' . $logoPath) }}" alt="Company Logo" style="max-height: 60px; margin-bottom: 10px;">
      @endif
      <h2 style="margin: 0; color: #2c5f8d; font-size: 20px; font-weight: bold;">{{ $companyName }}</h2>
      <p style="margin: 5px 0; color: #666; font-size: 12px;">{{ $companyAddress }}</p>
      <p style="margin: 5px 0; color: #666; font-size: 12px;">{{ $companyPhone }}</p>
    </div>
    <div style="text-align: left;">
      <h1 style="margin: 0 0 10px 0; color: #2c5f8d; font-size: 28px; font-weight: bold;">فاکتور</h1>
      <table style="margin-top: 10px;">
        <tr>
          <td style="padding: 5px; color: #666; font-weight: bold;">شماره فاکتور:</td>
          <td style="padding: 5px; color: #2c5f8d; font-weight: bold;">#{{ $sale->id }}</td>
        </tr>
        <tr>
          <td style="padding: 5px; color: #666; font-weight: bold;">تاریخ:</td>
          <td style="padding: 5px; color: #2c5f8d;">{{ optional($sale->created_at)->format('Y-m-d H:i') }}</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Custom Header Text -->
  @if(!empty($headerText))
    <div style="background: #e3f2fd; border-right: 4px solid #2196f3; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
      {!! nl2br(e($headerText)) !!}
    </div>
  @endif

  <!-- Bill To Section -->
  <div style="margin-bottom: 25px;">
    <h4 style="margin: 0 0 10px 0; color: #2c5f8d; font-weight: bold;">صورتحساب برای:</h4>
    <div style="background: #f5f5f5; padding: 15px; border-radius: 4px;">
      <p style="margin: 0 0 5px 0; font-weight: bold; color: #333;">{{ optional($sale->customer)->name ?? 'مشتری نقدی' }}</p>
      @if(optional($sale->customer)->phone)
        <p style="margin: 0; color: #666; font-size: 12px;">{{ optional($sale->customer)->phone }}</p>
      @endif
    </div>
  </div>

  <!-- Items Table -->
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
    <thead>
      <tr style="background: #2c5f8d; color: white;">
        <th style="padding: 12px; text-align: right; border: none; font-weight: bold;">#</th>
        <th style="padding: 12px; text-align: right; border: none; font-weight: bold;">نام محصول</th>
        <th style="padding: 12px; text-align: center; border: none; font-weight: bold;">تعداد</th>
        <th style="padding: 12px; text-align: center; border: none; font-weight: bold;">قیمت واحد</th>
        <th style="padding: 12px; text-align: center; border: none; font-weight: bold;">تخفیف</th>
        <th style="padding: 12px; text-align: center; border: none; font-weight: bold;">مجموع</th>
      </tr>
    </thead>
    <tbody>
      @foreach($sale->saleItems as $i => $item)
        <tr style="border-bottom: 1px solid #ddd; background: {{ $i % 2 == 0 ? '#fff' : '#f9f9f9' }};">
          <td style="padding: 12px; text-align: right;">{{ $i+1 }}</td>
          <td style="padding: 12px; text-align: right;">{{ optional($item->product)->name ?? 'محصول حذف شده' }}</td>
          <td style="padding: 12px; text-align: center;">{{ number_format($item->quantity) }}</td>
          <td style="padding: 12px; text-align: center;">{{ number_format($item->unit_price) }}</td>
          <td style="padding: 12px; text-align: center;">{{ number_format($item->discount) }}</td>
          <td style="padding: 12px; text-align: center; font-weight: bold;">{{ number_format($item->total_price) }}</td>
        </tr>
      @endforeach
    </tbody>
  </table>

  <!-- Summary Section -->
  <div style="display: flex; gap: 30px; margin-bottom: 25px;">
    <div style="flex: 1;"></div>
    <div style="width: 300px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; text-align: right; color: #666;">جمع کل:</td>
          <td style="padding: 10px; text-align: center; font-weight: bold; color: #2c5f8d;">{{ number_format($sale->total_amount) }}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; text-align: right; color: #666;">پرداخت شده:</td>
          <td style="padding: 10px; text-align: center; font-weight: bold; color: #2c5f8d;">{{ number_format($sale->paid_amount) }}</td>
        </tr>
        <tr style="background: #e3f2fd; font-size: 16px;">
          <td style="padding: 12px; text-align: right; color: #2c5f8d; font-weight: bold;">مانده:</td>
          <td style="padding: 12px; text-align: center; font-weight: bold; color: #2196f3; font-size: 18px;">{{ number_format($sale->total_amount - $sale->paid_amount) }}</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Custom Footer Text -->
  @if(!empty($footerText))
    <div style="background: #f0f0f0; border-right: 4px solid #999; padding: 15px; margin-bottom: 20px; border-radius: 4px; font-size: 12px; color: #555;">
      {!! nl2br(e($footerText)) !!}
    </div>
  @endif

  <!-- Action Buttons -->
  <div class="no-print" style="text-align: left; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
    <a href="{{ route('sales.editBill', $sale->id) }}" class="btn btn-sm btn-primary" style="margin-right: 10px;">
      <i class="fa fa-edit"></i> ویرایش سربرگ/پابرگ
    </a>
    <button class="btn btn-sm btn-success" onclick="window.print()">
      <i class="fa fa-print"></i> چاپ
    </button>
  </div>
</div>

<style>
  @media print {
    .no-print {
      display: none !important;
    }
    body {
      background: #fff;
    }
  }
</style>
@endsection
