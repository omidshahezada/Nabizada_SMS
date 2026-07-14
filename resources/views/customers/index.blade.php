@extends("layouts.master")
@section("links")
<link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.css') }}">
@endsection
@section("page_title")
مشتریان
@endsection
@section("title")
مشتریان | مدیریت مشتریان
@endsection
@section("content")

@if($success = session('success'))
<div class="card card-success">
  <div class="card-header">
    <h4 class="card-title">
      <a data-toggle="collapse" data-parent="#accordion" href="#collapseSuccess">
        {{ $success }}
      </a>
    </h4>
  </div>
  <div id="collapseSuccess" class="panel-collapse collapse">
    <div class="card-body">
      عملیات با موفقیت انجام شد.
    </div>
  </div>
</div>
@endif

<div class="card">
  <div class="card-header">
    <h3 class="card-title">جدول مشتریان</h3>
  </div>
  <a href="{{ route('customers.create') }}" class="btn btn-block btn-info requires-role">
    <i class="fa-solid fa-plus"></i>
    اضافه کردن مشتری جدید
  </a>
  <div class="card-body">
    <table id="example1" class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>شماره</th>
          <th>نام</th>
          <th>تلفن</th>
          <th>آدرس</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        @foreach ($customers as $customer)
          <tr>
            <td>{{ $customer->id }}</td>
            <td>{{ $customer->name }}</td>
            <td>{{ $customer->phone }}</td>
            <td>{{ $customer->address }}</td>
            <td>
              <div class="btn-group">
                <a href="{{ route('customers.show', $customer->id) }}" class="btn btn-info requires-role"><i class="fa-regular fa-eye"></i></a>
                <a href="{{ route('customers.edit', $customer->id) }}" class="btn btn-warning requires-role"><i class="fa-regular fa-pen-to-square"></i></a>
                <form action="{{ route('customers.destroy', $customer->id) }}" method="POST" class="confirm-delete ajax-protect" data-confirm-title="حذف مشتری" data-confirm-message="آیا مطمئن هستید که می‌خواهید این مشتری را حذف کنید؟ این عملیات قابل بازگشت نیست.">
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
          <th>تلفن</th>
          <th>آدرس</th>
          <th>عملیات</th>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
@endsection

@section("jslinks")
<script src="{{ asset('masterPersianAdminLTE-master/plugins/datatables/jquery.dataTables.js') }}"></script>
<script src="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.js') }}"></script>
<script src="{{ asset('masterPersianAdminLTE-master/plugins/slimScroll/jquery.slimscroll.min.js') }}"></script>
<script src="{{ asset('masterPersianAdminLTE-master/plugins/fastclick/fastclick.js') }}"></script>
<script src="{{ asset('masterPersianAdminLTE-master/dist/js/demo.js') }}"></script>
<script>
  $(function () {
    $("#example1").DataTable({
      "language": {
        "paginate": {
          "next": "بعدی",
          "previous": "قبلی"
        }
      },
      "info": false,
    });
  });
</script>
@endsection
