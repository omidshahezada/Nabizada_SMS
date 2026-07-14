<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>دسترسی غیرمجاز - 403</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.6.0/flatly/bootstrap.min.css">
  <style>body{background:#f7fafc;font-family: Vazirmatn, sans-serif;}</style>
</head>
<body>
  <div class="container" style="padding-top:80px; text-align:center;">
    <img src="https://img.icons8.com/fluency/96/000000/lock-2.png" alt="lock" />
    <h1 class="mt-3">اجازه دسترسی ندارید</h1>
    <p class="text-muted">شما اجازه انجام این عملیات را ندارید. اگر فکر می‌کنید این یک اشتباه است، با مدیر سیستم تماس بگیرید.</p>
    <div class="mt-4">
      <a href="{{ route('index') }}" class="btn btn-secondary">بازگشت</a>
      <a href="{{ route('index') }}" class="btn btn-primary">پنجره اطلاعات</a>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script>
    // show SweetAlert modal for a nicer experience
    document.addEventListener('DOMContentLoaded', function(){
      Swal.fire({
        icon: 'error',
        title: 'دسترسی مجاز نیست',
        html: '<p style="direction:rtl;">شما اجازه انجام این عملیات را ندارید.<br>در صورت نیاز به دسترسی با مدیر سیستم تماس بگیرید.</p>',
        confirmButtonText: 'متوجه شدم',
        showCancelButton: true,
        cancelButtonText: 'بازگشت',
      }).then((res) => {
        if (res.isDismissed || res.isDenied || res.isDismissed) {
          window.location.href = '{{ route("index") }}';
        }
      });
    });
  </script>
</body>
</html>