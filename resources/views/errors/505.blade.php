@extends('layouts.master')
@section("page_title")
خطای ۵۰۰
@endsection
@section("title")
خطا ۵۰۰
@endsection
@section('content')
    <!-- Main content -->
    <section class="content">
      <div class="error-page">
        <h2 class="headline text-danger">۵۰۰</h2>

        <div class="error-content">
          <h3><i class="fa fa-warning text-danger"></i>  پاسخی از سرور دریافت نشد.</h3>

          <p>
            متاسفانه سرور در دسترس نیست می توانید به <a href="{{ route('index') }}">داشبورد</a> برگردید و یا آدرس مورد نظر خود را جستجو کنید.
          </p>

          <form class="search-form">
            <div class="input-group">
              <input type="text" name="search" class="form-control" placeholder="جستجو...">

              <div class="input-group-append">
                <button type="submit" name="submit" class="btn btn-danger"><i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            <!-- /.input-group -->
          </form>
        </div>
      </div>
      <!-- /.error-page -->

    </section>
    <!-- /.content -->
  </div>
@endsection
