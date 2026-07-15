@extends("layouts.master")
@section("links")
<link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.css') }}">
@endsection
@section("page_title")
کاربران
@endsection
@section("title")
پنجره کاربران | تنظیمات کاربران
@endsection
@section("content")

@if($success = session('success'))
<div class="card card-success">
                    <div class="card-header">
                      <h4 class="card-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                          {{ $success }}
                        </a>
                      </h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse">
                      <div class="card-body">
                       کاربر جدید با موفقیت اضافه گردید.
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
                       اطلاعات کاربر با موفقیت ویرایش گردید.
                      </div>
                    </div>
                  </div>

@endif
@if($success_delete = session('success_delete'))
<div class="card card-success">
                    <div class="card-header">
                      <h4 class="card-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseFive">
                          کاربر با موفقیت حذف گردید!
                        </a>
                      </h4>
                    </div>
                    <div id="collapseFive" class="panel-collapse collapse">
                      <div class="card-body">
                       کاربر با موفقیت حذف گردید.
                      </div>
                    </div>
                  </div>

@endif


<div class="card">
            <div class="card-header">
              <h3 class="card-title">جدول کاربران سیستم</h3>
            </div>
            <a href="{{ route('users.create') }}" class="btn btn-block btn-info requires-role">
  <i class="fa-solid fa-plus"></i>
  اضافه کردن کاربر جدید
</a>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>شماره</th>
                  <th>نام</th>
                  <th>ایمیل</th>
                  <th>نقش</th>
                  <th>زمان ایجاد کاربر</th>
                  <th>آخرین ویرایش</th>
                  <th>ویرایش کاربر</th>
                </tr>
                </thead>
                <tbody>
                  @foreach ( $users as $user )
                    <tr>
                      <td>{{ $user->id }}</td>
                      <td>{{ $user->name }}</td>
                      <td>{{ $user->email }}</td>
                      <td>{{ $roles[$user->role_id]->name ?? 'نقش یافت نشد' }}</td>  
                      <td>{{ $user->created_at }}</td>
                      <td>{{ $user->updated_at }}</td>
                      <td>
                        <div class="btn-group">
                          <a href="{{ route('users.show', $user->id) }}" class="btn btn-info requires-role"><i class="fa-regular fa-eye"></i></a>
                          <a href="{{ route('users.edit', $user->id) }}" class="btn btn-warning requires-role"><i class="fa-regular fa-pen-to-square"></i></a>
                          <form action="{{ route('users.destroy', $user->id) }}" method="POST" class="confirm-delete ajax-protect" data-confirm-title="حذف کاربر" data-confirm-message="آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟ این عملیات قابل بازگشت نیست.">
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
                  <th>نام</th>
                  <th>ایمیل</th>
                  <th>نقش</th>
                  <th>زمان ایجاد کاربر</th>
                  <th>آخرین ویرایش</th>
                  <th>ویرایش کاربر</th>
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