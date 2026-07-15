@extends("layouts.master")
@section("links")
<link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.css') }}">
@endsection
@section("page_title")
فروشات عمومی
@endsection
@section("title")
فروشات عمومی
@endsection
@section("content")

@if($success = session('success'))
<div class="card card-success">
                    <div class="card-header">
                      <h4 class="card-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                          با موفقیت ذخیره گردید!
                        </a>
                      </h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse">
                      <div class="card-body">
                       محصول جدید با موفقیت به گدام اضافه گردید.
                      </div>
                    </div>
                  </div>

@endif

@if($success_edit = session('success_edit'))
<div class="card card-success">
                    <div class="card-header">
                      <h4 class="card-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour">
                          با موفقیت ویرایش گردید!
                        </a>
                      </h4>
                    </div>
                    <div id="collapseFour" class="panel-collapse collapse">
                      <div class="card-body">
                       محصول با موفقیت ویرایش گردید.
                      </div>
                    </div>
                  </div>

@endif
@if($success_delete = session('success_delete'))
<div class="card card-success">
                    <div class="card-header">
                      <h4 class="card-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseFive">
                          با موفقیت حذف گردید!
                        </a>
                      </h4>
                    </div>
                    <div id="collapseFive" class="panel-collapse collapse">
                      <div class="card-body">
                       محصول با موفقیت حذف گردید.
                      </div>
                    </div>
                  </div>

@endif


<div class="card">
            <div class="card-header">
              <h3 class="card-title">جدول فروشات عمومی</h3>
            </div>
            <a href="{{ route('sales.create') }}" class="btn btn-block btn-info requires-role">
  <i class="fa-solid fa-plus"></i>
  افزودن فروش جدید
</a>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>شماره</th>
                  <th>مشتری</th>
                  <th>مبلغ پرداختی</th>
                  <th>مبلغ کل</th>
                  <th>تخفیف</th>
                  <th>فروشنده</th>
                  <th>ویرایش</th>
                </tr>
                </thead>
                <tbody>
                  @foreach ( $sales as $sale )
                    <tr>
                      <td>{{ $sale->id }}</td>
                      <td>{{ optional($sale->customer)->name ?? '-' }}</td>
                      <td>{{ $sale->paid_amount }}</td>
                      <td>{{ $sale->total_amount }}</td>
                      <td>{{ $sale->discount }}</td>
                      <td>{{ optional($sale->user)->name ?? $sale->created_by }}</td>

                      <td>
                        <div class="btn-group">
                          <a href="{{ route('sales.bill', $sale->id) }}" class="btn btn-info requires-role"><i class="fa-regular fa-eye"></i></a>
                          <a href="{{ route('sales.edit', $sale->id) }}" class="btn btn-warning requires-role"><i class="fa-regular fa-pen-to-square"></i></a>
                          <form action="{{ route('sales.destroy', $sale->id) }}" method="POST" class="ajax-protect confirm-delete" onsubmit="return confirm('آیا مطمئن هستید که می‌خواهید این فروش را حذف کنید؟');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  @endforeach
                </tbody>
                <tfoot>
                <tr>
                  <th>شماره</th>
                  <th>مشتری</th>
                  <th>مبلغ پرداختی</th>
                  <th>مبلغ کل</th>
                  <th>تخفیف</th>
                  <th>فروشنده</th>
                  <th>ویرایش</th>
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
    });
    $('#example2').DataTable({
        "language": {
            "paginate": {
                "next": "بعدی",
                "previous" : "قبلی"
            }
        },
      "info" : false,
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "autoWidth": false
    });
  });
</script>
@endsection