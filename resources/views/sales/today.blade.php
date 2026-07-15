@extends("layouts.master")
@section("links")
<link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.css') }}">
@endsection
@section("page_title")
فروشات امروز
@endsection
@section("title")
فروشات امروز
@endsection
@section("content")

@if($success = session('success'))
<div class="card card-success">
    <div class="card-header">
      <h4 class="card-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseSuccess">
          با موفقیت ذخیره گردید!
        </a>
      </h4>
    </div>
    <div id="collapseSuccess" class="panel-collapse collapse">
      <div class="card-body">
        فروش جدید با موفقیت ثبت گردید.
      </div>
    </div>
  </div>
@endif

<div class="row mb-3">
    <div class="col-12 col-sm-6 col-md-3">
        <div class="info-box">
            <span class="info-box-icon bg-success elevation-1"><i class="fa fa-shopping-cart"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">تعداد فروش</span>
                <span class="info-box-number">{{ number_format($totalSales) }}</span>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
        <div class="info-box mb-3">
            <span class="info-box-icon bg-info elevation-1"><i class="fa fa-money-bill-wave"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">مبلغ کل</span>
                <span class="info-box-number">{{ number_format($totalAmount) }}</span>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
        <div class="info-box mb-3">
            <span class="info-box-icon bg-warning elevation-1"><i class="fa fa-money"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">مبلغ پرداختی</span>
                <span class="info-box-number">{{ number_format($totalPaid) }}</span>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
        <div class="info-box mb-3">
            <span class="info-box-icon bg-danger elevation-1"><i class="fa fa-tag"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">کل تخفیفات</span>
                <span class="info-box-number">{{ number_format($totalDiscount) }}</span>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header">
      <h3 class="card-title">جدول فروشات امروز</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <table id="example1" class="table table-bordered table-striped">
        <thead>
        <tr>
          <th>شماره</th>
          <th>مشتری</th>
          <th>مبلغ کل</th>
          <th>مبلغ پرداختی</th>
          <th>تخفیف</th>
          <th>فروشنده</th>
          <th>ساعت</th>
        </tr>
        </thead>
        <tbody>
          @foreach ( $todaySales as $sale )
            <tr>
              <td>{{ $sale->id }}</td>
              <td>{{ optional($sale->customer)->name ?? $sale->customer_id }}</td>
              <td>{{ number_format($sale->total_amount) }}</td>
              <td>{{ number_format($sale->paid_amount) }}</td>
              <td>{{ number_format($sale->discount) }}</td>
              <td>{{ optional($sale->user)->name ?? $sale->created_by }}</td>
              <td>{{ optional($sale->created_at)->format('H:i') ?? '-' }}</td>
            </tr>
          @endforeach
        </tbody>
        <tfoot>
        <tr>
          <th>شماره</th>
          <th>مشتری</th>
          <th>مبلغ کل</th>
          <th>مبلغ پرداختی</th>
          <th>تخفیف</th>
          <th>فروشنده</th>
          <th>ساعت</th>
        </tr>
        </tfoot>
      </table>
    </div>
    <!-- /.card-body -->
  </div>
@endsection

@section("jslinks")
<!-- DataTables -->
<script src="{{ asset('masterPersianAdminLTE-master/plugins/datatables/jquery.dataTables.js') }}" ></script>
<script src="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.js') }}"></script>
<!-- SlimScroll -->
<script src="{{asset('masterPersianAdminLTE-master/plugins/slimScroll/jquery.slimscroll.min.js')}}"></script>
<!-- FastClick -->
<script src="{{asset('masterPersianAdminLTE-master/plugins/fastclick/fastclick.js')}}"></script>
<!-- AdminLTE for demo purposes -->
<script src="{{asset('masterPersianAdminLTE-master/dist/js/demo.js')}}"></script>
<!-- page script -->
<script>
  $(function () {
    $("#example1").DataTable({
        "language": {
            "paginate": {
                "next": "بعدی",
                "previous" : "قبلی"
            }
        },
        "info" : false,
        "scrollX": true,
        "pageLength" : 25,
    });
  });
</script>
@endsection
