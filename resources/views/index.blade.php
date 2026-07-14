@extends("layouts.master")
@section("page_title")
میز مدیریت
@endsection
@section("title")
میز مدیریت
@endsection
@section("content")
<div class="container-fluid">
    <div class="row">
        <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box">
                <span class="info-box-icon bg-info elevation-1"><i class="fa fa-cubes"></i></span>
                <div class="info-box-content">
                    <span class="info-box-text">محصولات در انبار</span>
                    <span class="info-box-number">{{ number_format($productsInStock) }}</span>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
                <span class="info-box-icon bg-success elevation-1"><i class="fa fa-shopping-cart"></i></span>
                <div class="info-box-content">
                    <span class="info-box-text">فروش امروز</span>
                    <span class="info-box-number">{{ number_format($todaySales) }}</span>
                </div>
            </div>
        </div>
        <div class="clearfix hidden-md-up"></div>
        <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
                <span class="info-box-icon bg-warning elevation-1"><i class="fa fa-money-bill-wave"></i></span>
                <div class="info-box-content">
                    <span class="info-box-text">درآمد امروز</span>
                    <span class="info-box-number">{{ number_format($todayIncome) }}</span>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
                <span class="info-box-icon bg-danger elevation-1"><i class="fa fa-money"></i></span>
                <div class="info-box-content">
                    <span class="info-box-text">درآمد ماهیانه</span>
                    <span class="info-box-number">{{ number_format($monthlyRevenue) }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">۱۰ فروش آخر</h3>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>شماره</th>
                                <th>مشتری</th>
                                <th>مبلغ کل</th>
                                <th>پرداخت شده</th>
                                <th>تخفیف</th>
                                <th>فروشنده</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($lastSales as $sale)
                                <tr>
                                    <td>{{ $sale->id }}</td>
                                    <td>{{ optional($sale->customer)->name ?? $sale->customer_id }}</td>
                                    <td>{{ number_format($sale->total_amount) }}</td>
                                    <td>{{ number_format($sale->paid_amount) }}</td>
                                    <td>{{ number_format($sale->discount) }}</td>
                                    <td>{{ optional($sale->user)->name ?? $sale->created_by }}</td>
                                    <td>{{ optional($sale->created_at)->format('Y-m-d H:i') ?? '-' }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
