<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>بازنشانی رمزعبور</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{asset('masterPersianAdminLTE-master/dist/css/adminlte.min.css')}}">
  <!-- iCheck -->
  <link rel="stylesheet" href="{{asset('plugins/iCheck/square/blue.css')}}">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

  <!-- bootstrap rtl -->
  <link rel="stylesheet" href="{{asset('masterPersianAdminLTE-master/dist/css/bootstrap-rtl.min.css')}}">
  <!-- template rtl version -->
  <link rel="stylesheet" href="{{asset('masterPersianAdminLTE-master//dist/css/custom-style.css')}}">
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="{{ route('login') }}"><b>بازنشانی رمزعبور</b></a>
  </div>
  <!-- /.login-logo -->
  <div class="card card-info">
    <div class="card-header">
      <h3 class="card-title">رمزعبور جدید را تنظیم کنید</h3>
    </div>
    <!-- /.card-header -->
    
    <!-- Errors -->
    @if ($errors->any())
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>خطا!</strong>
        @foreach ($errors->all() as $error)
          <div>{{ $error }}</div>
        @endforeach
      </div>
    @endif

    <!-- form start -->
    <form method="POST" action="{{ route('password.store') }}" class="form-horizontal">
      @csrf
      
      <!-- Password Reset Token -->
      <input type="hidden" name="token" value="{{ $request->route('token') }}">
      
      <div class="card-body">
        <div class="form-group">
          <label for="email" class="col-sm-2 control-label">ایمیل</label>
          <div class="col-sm-12">
            <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email', $request->email) }}" placeholder="ایمیل را وارد کنید" required autofocus>
            @error('email')
              <span class="invalid-feedback d-block">{{ $message }}</span>
            @enderror
          </div>
        </div>
        
        <div class="form-group">
          <label for="password" class="col-sm-4 control-label">رمزعبور جدید</label>
          <div class="col-sm-12">
            <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password" placeholder="رمزعبور جدید را وارد کنید" required>
            @error('password')
              <span class="invalid-feedback d-block">{{ $message }}</span>
            @enderror
          </div>
        </div>
        
        <div class="form-group">
          <label for="password_confirmation" class="col-sm-4 control-label">تأیید رمزعبور</label>
          <div class="col-sm-12">
            <input type="password" class="form-control @error('password_confirmation') is-invalid @enderror" id="password_confirmation" name="password_confirmation" placeholder="رمزعبور را تأیید کنید" required>
            @error('password_confirmation')
              <span class="invalid-feedback d-block">{{ $message }}</span>
            @enderror
          </div>
        </div>
      </div>
      <!-- /.card-body -->
      <div class="card-footer">
        <button type="submit" class="btn btn-info">بازنشانی رمزعبور</button>
        <a class="btn btn-link" href="{{ route('login') }}">بازگشت به ورود</a>
      </div>
      <!-- /.card-footer -->
    </form>
  </div>
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="{{asset('plugins/jquery/jquery.min.js')}}"></script>
<!-- Bootstrap 4 -->
<script src="{{asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- iCheck -->
<script src="{{asset('plugins/iCheck/icheck.min.js')}}"></script>
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass   : 'iradio_square-blue',
      increaseArea : '20%' // optional
    })
  })
</script>
</body>
</html>
