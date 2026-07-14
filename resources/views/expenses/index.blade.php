@extends("layouts.master")

@section("links")
<link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.css') }}">
@endsection

@section("page_title")
هزینه‌ها
@endsection

@section("title")
هزینه‌ها
@endsection

@section("content")
@if(session('success'))
<div class="card card-success">
    <div class="card-header">
        <h4 class="card-title">با موفقیت انجام شد</h4>
    </div>
    <div class="card-body">
        {{ session('success') }}
    </div>
</div>
@endif
@if(session('success_edit'))
<div class="card card-success">
    <div class="card-header">
        <h4 class="card-title">ویرایش با موفقیت انجام شد</h4>
    </div>
    <div class="card-body">
        {{ session('success_edit') }}
    </div>
</div>
@endif
@if(session('success_delete'))
<div class="card card-success">
    <div class="card-header">
        <h4 class="card-title">حذف با موفقیت انجام شد</h4>
    </div>
    <div class="card-body">
        {{ session('success_delete') }}
    </div>
</div>
@endif

<div class="card">
    <div class="card-header">
        <h3 class="card-title">جدول هزینه‌ها</h3>
    </div>
    <div class="card-body mb-3">
        <a href="{{ route('expenses.create') }}" class="btn btn-success requires-role">
            <i class="fa-solid fa-plus"></i>
            افزودن هزینه جدید
        </a>
    </div>
    <div class="card-body table-responsive">
        <table id="expenses-table" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>شناسه</th>
                    <th>عنوان</th>
                    <th>مبلغ</th>
                    <th>تاریخ</th>
                    <th>توضیحات</th>
                    <th>عملیات</th>
                </tr>
            </thead>
            <tbody>
                @foreach($expenses as $expense)
                <tr>
                    <td>{{ $expense->id }}</td>
                    <td>{{ $expense->title }}</td>
                    <td>{{ $expense->amount }}</td>
                    <td>{{ $expense->expense_date }}</td>
                    <td>{{ $expense->description }}</td>
                    <td>
                        <div class="btn-group">
                            <a href="{{ route('expenses.show', $expense->id) }}" class="btn btn-info requires-role">
                                <i class="fa-regular fa-eye"></i>
                            </a>
                            <a href="{{ route('expenses.edit', $expense->id) }}" class="btn btn-warning requires-role">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </a>
                            <form action="{{ route('expenses.destroy', $expense->id) }}" method="POST" class="confirm-delete ajax-protect" data-confirm-title="حذف هزینه" data-confirm-message="آیا مطمئن هستید که می‌خواهید این هزینه را حذف کنید؟">
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
                    <th>شناسه</th>
                    <th>عنوان</th>
                    <th>مبلغ</th>
                    <th>تاریخ</th>
                    <th>توضیحات</th>
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
<script src="{{asset('masterPersianAdminLTE-master/plugins/slimScroll/jquery.slimscroll.min.js')}}"></script>
<script src="{{asset('masterPersianAdminLTE-master/plugins/fastclick/fastclick.js')}}"></script>
<script src="{{asset('masterPersianAdminLTE-master/dist/js/demo.js')}}"></script>
<script>
  $(function () {
    $("#expenses-table").DataTable({
        "language": {
            "paginate": {
                "next": "بعدی",
                "previous" : "قبلی"
            }
        },
        "info" : false,
    });
  });
</script>
@endsection
