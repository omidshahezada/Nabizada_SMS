@extends("layouts.master")

@section("page_title")
ثبت محصول
@endsection

@section("title")
ثبت محصول
@endsection

@section("content")

<div class="card card-info">

    <div class="card-header">
        <h3 class="card-title">فرم ثبت محصول</h3>
    </div>

    <!-- form start -->
    <form method="POST" action="{{ route('products.store') }}">
        @csrf
        <div class="card-body">

            <div class="row">

                <!-- ستون اول -->
                <div class="col-md-4">

                    <div class="form-group">
                        <label>نام محصول</label>
                        <input type="text"
                               class="form-control"
                               name="product_name"
                               placeholder="نام محصول را وارد کنید"
                               value="{{old('product_name')}}">
                    </div>

                    <div class="form-group">
                        <label>قیمت خرید</label>
                        <div class="input-group mb-3">
                            <input type="number" class="form-control" placeholder="قیمت خرید را وارد کنید" name="purchase_price" value="{{old('purchase_price')}}">
                            <div class="input-group-append">
                                <span class="input-group-text">اف</span>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- ستون دوم -->
                <div class="col-md-4">

                    <div class="form-group">
                        <label>دسته | طبقه</label>
                        <input type=""
                               class="form-control"
                               name="category"
                               placeholder="دسته محصول را وارد کنید"
                               value="{{old('category')}}"
                               list="categories">
                            <datalist id="categories">
                                @foreach($categories as $category)
                                    <option value="{{ $category->name }}">{{ $category->name }}</option>
                                @endforeach
                            </datalist>
                               
                    </div>

                    <div class="form-group">
                        <label>قیمت فروش</label>
                        <div class="input-group mb-3">
                  <input type="number" class="form-control" placeholder="قیمت فروش را وارد کنید " name="sell_price" value="{{old('sell_price')}}">
                  <div class="input-group-append">
                    <span class="input-group-text">اف</span>
                  </div>
                </div>
                    </div>

                </div>

                <!-- ستون سوم -->
                <div class="col-md-4">

                    <div class="form-group">
                        <label>تعداد</label>
                        <input type="number"
                               class="form-control"
                               placeholder="تعداد را وارد کنید"
                               name="quantity"
                               value="{{old('quantity')}}">
                    </div>


                </div>

            </div>

        </div>

        <!-- footer -->
        <div class="card-footer">
            <button type="submit" class="btn btn-info">ذخیره</button>
            <button type="button" class="btn btn-default float-left" onclick="window.location.href='{{ route('products.index') }}'">لغو</button>
        </div>

    </form>

</div>

@endsection
