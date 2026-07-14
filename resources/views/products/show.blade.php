@extends("layouts.master")

@section("page_title")
نمایش محصول
@endsection
@section("title")
نمایش محصول
@endsection

@section("content")
<div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="img-fluid img-square" style="width: 40%; height: auto;" src="{{asset('masterPersianAdminLTE-master/assets/img/bg-smart-home-1.jpg')}}" alt="User profile picture">
                </div>
                <!-- <h3 class="profile-username text-center">بارکد محصول</h3> -->

                <div class="card">
              <div class="card-header">
                <h3 class="card-title">مشخصات محصول</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table class="table table-bordered">
                  <tbody><tr>
                    <th style="width: 10px">شماره</th>
                    <th>نام محصول</th>
                    <th>دسته | گروه</th>
                    <th style="width: 10px">تعداد</th>
                    <th>قیمت خرید</th>
                    <th>قیمت فروش</th>
                  </tr>
                  <tr>
                    <td>{{$selected_product->id}}</td>
                    <td>{{$selected_product->name}}</td>
                    <td>{{$category->name ?? 'ندارد' }}</td>
                    <td>{{$selected_product->quantity}}</td>
                    <td>{{ number_format($selected_product->purchase_price, 0, ',', '.') }} اف</td>
                    <td>{{ number_format($selected_product->sell_price, 0, ',', '.') }} اف</td>
                  </tr>
                </tbody></table>
              </div>
            </div>

                <button class="btn btn-info" onclick="window.location.href='{{ route('products.index') }}'">بازگشت</button>
              </div>
              <!-- /.card-body -->
            </div>
@endsection
