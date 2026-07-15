@extends('layouts.master')

@section('content')
    <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>صفحه خطا ۴۰۴</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-left">
              <li class="breadcrumb-item"><a href="#">خانه</a></li>
              <li class="breadcrumb-item active">صفحه خطا ۴۰۴</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="error-page">
        <h2 class="headline text-warning"> ۴۰۴</h2>

        <div class="error-content">
          <h3><i class="fa fa-warning text-warning"></i> آخ! صفحه مورد نظرتون شما یافت نشد.</h3>

          <p>
            متاسفانه صفحه مورد نظر شما در سایت وجود ندارد
            میتوانید به <a href="{{ route('index') }}">داشبورد</a> برگردید و یا آدرس مورد نظر خود را جستجو کنید.
          </p>

          <form class="search-form">
            <div class="input-group">
              <input type="text" name="search" class="form-control" placeholder="جستجو...">

              <div class="input-group-append">
                <button type="submit" name="submit" class="btn btn-warning"><i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            <!-- /.input-group -->
          </form>
        </div>
        <!-- /.error-content -->
      </div>
      <!-- /.error-page -->
    </section>
    <!-- /.content -->
  </div>
@endsection
