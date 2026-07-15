@extends("layouts.master")
@section("links")
<link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.css') }}">
@endsection
@section("page_title")
فروشات
@endsection
@section("title")
فروشات
@endsection
@section("content")

<div class="row mb-3">
    <div class="col-12 col-sm-6 col-md-4">
        <div class="info-box">
            <span class="info-box-icon bg-info elevation-1"><i class="fa fa-list"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">تعداد آیتم‌ها</span>
                <span class="info-box-number">{{ number_format($totalItems) }}</span>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4">
        <div class="info-box mb-3">
            <span class="info-box-icon bg-success elevation-1"><i class="fa fa-cubes"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">مجموع مقدار</span>
                <span class="info-box-number">{{ number_format($totalQuantity) }}</span>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4">
        <div class="info-box mb-3">
            <span class="info-box-icon bg-warning elevation-1"><i class="fa fa-money-bill-wave"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">مجموع ارزش</span>
                <span class="info-box-number">{{ number_format($totalValue) }}</span>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header">
      <h3 class="card-title">جدول فروشات</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <table id="example1" class="table table-bordered table-striped">
        <thead>
        <tr>
          <th>شماره فروش</th>
          <th>محصول</th>
          <th>مقدار</th>
          <th>قیمت واحد</th>
          <th>تخفیف</th>
          <th>قیمت کل</th>
          <th>مشتری</th>
          <th>فروشنده</th>
          <th>تاریخ</th>
        </tr>
        </thead>
        <tbody>
          @foreach ( $saleItems as $item )
            <tr>
              <td>{{ $item->sale_id }}</td>
              <td>{{ optional($item->product)->name ?? 'محصول حذف شده' }}</td>
              <td>{{ number_format($item->quantity) }}</td>
              <td>{{ number_format($item->unit_price) }}</td>
              <td>{{ number_format($item->discount) }}</td>
              <td>{{ number_format($item->total_price) }}</td>
              <td>{{ optional(optional($item->sale)->customer)->name ?? '-' }}</td>
              <td>{{ optional(optional($item->sale)->user)->name ?? '-' }}</td>
              <td>{{ optional($item->created_at)->format('Y-m-d H:i') ?? '-' }}</td>
            </tr>
          @endforeach
        </tbody>
        <tfoot>
        <tr>
          <th>شماره فروش</th>
          <th>محصول</th>
          <th>مقدار</th>
          <th>قیمت واحد</th>
          <th>تخفیف</th>
          <th>قیمت کل</th>
          <th>مشتری</th>
          <th>فروشنده</th>
          <th>تاریخ</th>
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
