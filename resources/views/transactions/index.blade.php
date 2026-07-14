@extends("layouts.master")

@section("links")
<link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.css') }}">
@endsection

@section("page_title")
حسابات مالی
@endsection

@section("title")
حسابات مالی
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

<div class="row">
    <div class="col-md-3">
        <div class="info-box bg-info">
            <span class="info-box-icon"><i class="fa fa-exchange-alt"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">تعداد تراکنش‌ها</span>
                <span class="info-box-number">{{ number_format($transactionCount) }}</span>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="info-box bg-success">
            <span class="info-box-icon"><i class="fa fa-dollar-sign"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">جمع درآمدها</span>
                <span class="info-box-number">{{ number_format($transactionTotal, 2) }}</span>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="info-box bg-warning">
            <span class="info-box-icon"><i class="fa fa-file-invoice-dollar"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">تعداد هزینه‌ها</span>
                <span class="info-box-number">{{ number_format($expenseCount) }}</span>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="info-box bg-danger">
            <span class="info-box-icon"><i class="fa fa-minus-circle"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">جمع هزینه‌ها</span>
                <span class="info-box-number">{{ number_format($expenseTotal, 2) }}</span>
            </div>
        </div>
    </div>
</div>
<div class="row mb-3">
    <div class="col-md-12">
        <div class="card card-secondary">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>مانده خالص</h5>
                        <p class="mb-0">{{ number_format($netBalance, 2) }}</p>
                    </div>
                    <a href="{{ route('transactions.create') }}" class="btn btn-info requires-role">
                        <i class="fa-solid fa-plus"></i>
                        افزودن تراکنش جدید
                    </a>
                    <a href="{{ route('expenses.create') }}" class="btn btn-success requires-role">
                        <i class="fa-solid fa-plus"></i>
                        افزودن هزینه جدید
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header d-flex p-0">
        <ul class="nav nav-pills ml-auto p-2">
            <li class="nav-item"><a class="nav-link active" href="#transactions-tab" data-toggle="tab">تراکنش‌ها</a></li>
            <li class="nav-item"><a class="nav-link" href="#expenses-tab" data-toggle="tab">هزینه‌ها</a></li>
        </ul>
    </div>
    <div class="card-body">
        <div class="tab-content">
            <div class="tab-pane active" id="transactions-tab">
                <div class="table-responsive">
                    <table id="transactions-table" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>شناسه</th>
                    <th>نوع</th>
                    <th>مبلغ</th>
                    <th>تاریخ</th>
                    <th>توضیحات</th>
                    <th>عملیات</th>
                </tr>
            </thead>
            <tbody>
                @foreach($transactions as $transaction)
                <tr>
                    <td>{{ $transaction->id }}</td>
                    <td>{{ $transaction->type }}</td>
                    <td>{{ $transaction->amount }}</td>
                    <td>{{ $transaction->transaction_date }}</td>
                    <td>{{ $transaction->description }}</td>
                    <td>
                        <div class="btn-group">
                            <a href="{{ route('transactions.show', $transaction->id) }}" class="btn btn-info requires-role">
                                <i class="fa-regular fa-eye"></i>
                            </a>
                            <a href="{{ route('transactions.edit', $transaction->id) }}" class="btn btn-warning requires-role">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </a>
                            <form action="{{ route('transactions.destroy', $transaction->id) }}" method="POST" class="confirm-delete ajax-protect" data-confirm-title="حذف تراکنش" data-confirm-message="آیا مطمئن هستید که می‌خواهید این تراکنش را حذف کنید؟">
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
                    <th>نوع</th>
                    <th>مبلغ</th>
                    <th>تاریخ</th>
                    <th>توضیحات</th>
                    <th>عملیات</th>
                </tr>
            </tfoot>
        </table>
                </div>
            </div>
            <div class="tab-pane" id="expenses-tab">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">هزینه‌ها</h3>
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
            </div>
        </div>
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
    $("#transactions-table").DataTable({
        "language": {
            "paginate": {
                "next": "بعدی",
                "previous" : "قبلی"
            }
        },
        "info" : false,
    });
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
