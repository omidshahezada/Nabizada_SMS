@extends("layouts.master")

@section("page_title")
ویرایش فروش | بل
@endsection
@section("title")
ویرایش فروش | بل
@endsection
@section("content")
<div class="card card-info">

    <div class="card-header">
        <h3 class="card-title">فرم ویرایش فروش | بل</h3>
    </div>

    <!-- form start -->
    <form method="POST" action="{{ route('sales.update', $sale->id) }}">
        @csrf
        @method('PUT')
        <div class="card-body">

            <div class="row">

                <div class="col-md-4">
                    <div class="form-group">
                        <label>مشتری</label>
                        <select name="customer_id" class="form-control">
                            <option value="">--- انتخاب کنید ---</option>
                            @foreach($customers as $customer)
                                <option value="{{ $customer->id }}" {{ old('customer_id', $sale->customer_id) == $customer->id ? 'selected' : '' }}>
                                    {{ $customer->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label>مبلغ پرداختی</label>
                        <input type="number" step="0.01" class="form-control" name="paid_amount" value="{{ old('paid_amount', $sale->paid_amount) }}">
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label>وضعیت</label>
                        <select name="status" class="form-control">
                            <option value="completed" {{ old('status', $sale->status) == 'completed' ? 'selected' : '' }}>تکمیل شده</option>
                            <option value="pending" {{ old('status', $sale->status) == 'pending' ? 'selected' : '' }}>در انتظار</option>
                            <option value="cancelled" {{ old('status', $sale->status) == 'cancelled' ? 'selected' : '' }}>لغو شده</option>
                        </select>
                    </div>
                </div>

            </div>

        </div>

        <div class="card-footer">
            <button type="submit" class="btn btn-info">ذخیره</button>
            <button type="button" class="btn btn-default float-left" onclick="window.location.href='{{ route('sales.index') }}'">لغو</button>
        </div>

    </form>

</div>
@endsection