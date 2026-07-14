@extends("layouts.master")
@section("links")
<link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/plugins/datatables/dataTables.bootstrap4.css') }}">
@endsection
@section("page_title")
فروش جدید
@endsection
@section("title")
فروش جدید
@endsection
@section("content")

<div class="card">
  <div class="card-header">
    <h3 class="card-title">ایجاد فروش جدید</h3>
  </div>
  <div class="card-body">
    <form action="{{ route('sales.store') }}" method="POST" id="sale-form">
      @csrf
      @if($errors->any())
        <div class="alert alert-danger">
          <ul class="mb-0">
            @foreach($errors->all() as $error)
              <li>{{ $error }}</li>
            @endforeach
          </ul>
        </div>
      @endif
      @if(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
      @endif
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>مشتری (اختیاری)</label>
            <select name="customer_id" class="form-control">
              <option value="">--- انتخاب کنید ---</option>
              @foreach($customers as $c)
                <option value="{{ $c->id }}">{{ $c->name }}</option>
              @endforeach
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>محصول</label>
            <select id="product-select" class="form-control">
              <option value="">-- انتخاب محصول --</option>
              @foreach($products as $p)
                <option value="{{ $p->id }}" data-price="{{ $p->sell_price }}" data-qty="{{ $p->quantity }}">{{ $p->name }} (موجودی: {{ $p->quantity }})</option>
              @endforeach
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>تعداد</label>
            <input id="product-qty" type="number" class="form-control" value="1" min="1">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label>قیمت واحد</label>
            <input id="product-price" type="number" class="form-control" step="0.01">
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label>تخفیف</label>
            <input id="product-discount" type="number" class="form-control" step="0.01" value="0">
          </div>
        </div>
        <div class="col-md-3 align-self-end">
          <button id="add-item" type="button" class="btn btn-primary">اضافه کردن آیتم</button>
        </div>
      </div>

      <div class="table-responsive mt-3">
        <table class="table table-bordered" id="items-table">
          <thead>
            <tr>
              <th>محصول</th>
              <th>تعداد</th>
              <th>قیمت واحد</th>
              <th>تخفیف</th>
              <th>قیمت کل</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      <div class="row mt-3">
        <div class="col-md-3">
          <div class="form-group">
            <label>مبلغ کل</label>
            <input type="text" id="total-amount" class="form-control" readonly>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label>مبلغ پرداختی</label>
            <input type="number" name="paid_amount" step="0.01" class="form-control" value="0">
          </div>
        </div>
        <div class="col-md-3 align-self-end">
          <button type="submit" class="btn btn-success">ثبت فروش و صدور فاکتور</button>
        </div>
      </div>

    </form>
  </div>
</div>

@endsection

@section("jslinks")
<script>
  let itemIndex = 0;
  function recalcTotal(){
    let total = 0;
    $('#items-table tbody tr').each(function(){
      const price = parseFloat($(this).find('.item-total').text() || 0);
      total += price;
    });
    $('#total-amount').val(total.toFixed(2));
  }

  $(function(){
    $('#product-select').on('change', function(){
      const option = $(this).find('option:selected');
      $('#product-price').val(option.data('price') ?? '');
      // update qty max to available stock
      const available = parseInt(option.data('qty') || 0);
      if(!isNaN(available) && available >= 0){
        $('#product-qty').attr('max', available);
      } else {
        $('#product-qty').removeAttr('max');
      }
    });

    $('#add-item').on('click', function(){
      const pid = $('#product-select').val();
      if(!pid) return alert('یک محصول انتخاب کنید');
      const pname = $('#product-select option:selected').text();
      const qty = parseInt($('#product-qty').val() || 1);
      const price = parseFloat($('#product-price').val() || 0);
      const discount = parseFloat($('#product-discount').val() || 0);
      const total = (price * qty) - discount;

      // client-side stock validation: ensure total requested (existing + new) <= available
      const available = parseInt($('#product-select option:selected').data('qty') || 0);
      let existing = 0;
      $('#items-table tbody tr').each(function(){
        const pidExisting = $(this).find('input[name$="[product_id]"]').val();
        if(pidExisting == pid){
          const q = parseInt($(this).find('input[name$="[quantity]"]').val() || 0);
          existing += q;
        }
      });
      if(existing + qty > available){
        return alert('مقدار انتخاب شده بیشتر از موجودی است. موجودی فعلی: ' + available + '\n(فعلاً در جدول: ' + existing + ')');
      }

      const row = `<tr data-index="${itemIndex}">
        <td>${pname}<input type="hidden" name="items[${itemIndex}][product_id]" value="${pid}"></td>
        <td><input type="hidden" name="items[${itemIndex}][quantity]" value="${qty}">${qty}</td>
        <td><input type="hidden" name="items[${itemIndex}][unit_price]" value="${price}">${price.toFixed(2)}</td>
        <td><input type="hidden" name="items[${itemIndex}][discount]" value="${discount}">${discount.toFixed(2)}</td>
        <td class="item-total">${total.toFixed(2)}<input type="hidden" name="items[${itemIndex}][total_price]" value="${total.toFixed(2)}"></td>
        <td><button type="button" class="btn btn-sm btn-danger remove-item">حذف</button></td>
      </tr>`;

      $('#items-table tbody').append(row);
      itemIndex++;
      recalcTotal();
    });

    $(document).on('click', '.remove-item', function(){
      $(this).closest('tr').remove();
      recalcTotal();
    });

    $('#sale-form').on('submit', function(e){
      if($('#items-table tbody tr').length === 0){
        e.preventDefault();
        alert('حداقل یک آیتم اضافه کنید');
      }
    });
  });
</script>
@endsection
