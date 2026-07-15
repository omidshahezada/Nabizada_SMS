<!DOCTYPE html>
<html lang="en" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">

  <title>@yield('page_title')</title>

  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/plugins/font-awesome/css/font-awesome.min.css') }}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/dist/css/adminlte.min.css') }}">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

  <!-- bootstrap rtl -->
  <link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/dist/css/bootstrap-rtl.min.css') }}">
  <!-- template rtl version -->
  <link rel="stylesheet" href="{{ asset('masterPersianAdminLTE-master/dist/css/custom-style.css') }}">
  @yield("links")
  <style>
    #page-loader {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(11, 35, 79, 0.72);
      transition: opacity 0.18s ease, visibility 0.18s ease;
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      backdrop-filter: blur(3px);
    }
    #page-loader.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    #page-loader .loader-card {
      width: 220px;
      padding: 1.75rem 1.5rem;
      background: rgba(255,255,255,0.97);
      border-radius: 1.75rem;
      box-shadow: 0 28px 80px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    #page-loader .loader-brand {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #eef4ff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 0 1px rgba(63, 133, 255, 0.12);
    }
    #page-loader .loader-brand .fa-spinner {
      font-size: 2rem;
      color: #3178ff;
    }
    #page-loader .loader-text {
      margin-top: 1rem;
      color: #1f335b;
      font-weight: 700;
      font-size: 1.05rem;
      line-height: 1.4;
    }
    #page-loader .loader-subtext {
      margin-top: 0.45rem;
      color: #5c6d91;
      font-size: 0.92rem;
      line-height: 1.5;
    }
    @keyframes pulse-ring {
      0% {
        transform: scale(0.88);
        opacity: 0.75;
      }
      50% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(0.88);
        opacity: 0.75;
      }
    }
    #page-loader .loader-brand {
      animation: pulse-ring 1.6s ease-in-out infinite;
    }
  </style>
</head>
<body class="hold-transition sidebar-mini">
<div id="page-loader">
  <div class="loader-card" role="status" aria-live="polite" aria-label="در حال بارگذاری صفحه">
    <div class="loader-brand">
      <i class="fa fa-spinner fa-pulse text-info" aria-hidden="true"></i>
    </div>
    <div class="loader-text">لطفا صبر کنید...</div>
    <div class="loader-subtext">در حال آماده‌سازی صفحه و بارگذاری داده‌ها</div>
  </div>
</div>
<div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand bg-info navbar-dark border-bottom">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="{{ route('index') }}" class="nav-link">خانه</a>
      </li>
    </ul>

    <!-- SEARCH FORM
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="جستجو" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </form> -->

    <!-- Right navbar links -->
    <ul class="navbar-nav mr-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fa fa-comments-o"></i>
          <span class="badge badge-danger navbar-badge">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-left">
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img src="{{ asset('masterPersianAdminLTE-master/dist/img/user1-128x128.jpg') }}" alt="User Avatar" class="img-size-50 ml-3 img-circle">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  حسام موسوی
                  <span class="float-left text-sm text-danger"><i class="fa fa-star"></i></span>
                </h3>
                <p class="text-sm">با من تماس بگیر لطفا...</p>
                <p class="text-sm text-muted"><i class="fa fa-clock-o mr-1"></i> 4 ساعت قبل</p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img src="{{ asset('masterPersianAdminLTE-master/dist/img/user8-128x128.jpg') }}" alt="User Avatar" class="img-size-50 img-circle ml-3">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  پیمان احمدی
                  <span class="float-left text-sm text-muted"><i class="fa fa-star"></i></span>
                </h3>
                <p class="text-sm">من پیامتو دریافت کردم</p>
                <p class="text-sm text-muted"><i class="fa fa-clock-o mr-1"></i> 4 ساعت قبل</p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img src="{{ asset('masterPersianAdminLTE-master/dist/img/user3-128x128.jpg') }}" alt="User Avatar" class="img-size-50 img-circle ml-3">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  سارا وکیلی
                  <span class="float-left text-sm text-warning"><i class="fa fa-star"></i></span>
                </h3>
                <p class="text-sm">پروژه اتون عالی بود مرسی واقعا</p>
                <p class="text-sm text-muted"><i class="fa fa-clock-o mr-1"></i>4 ساعت قبل</p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">مشاهده همه پیام‌ها</a>
        </div>
      </li>
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fa fa-bell-o"></i>
          <span class="badge badge-warning navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-left">
          <span class="dropdown-item dropdown-header">15 نوتیفیکیشن</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fa fa-envelope ml-2"></i> 4 پیام جدید
            <span class="float-left text-muted text-sm">3 دقیقه</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fa fa-users ml-2"></i> 8 درخواست دوستی
            <span class="float-left text-muted text-sm">12 ساعت</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fa fa-file ml-2"></i> 3 گزارش جدید
            <span class="float-left text-muted text-sm">2 روز</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">مشاهده همه نوتیفیکیشن</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#"><i
                class="nav-icon fa fa-th-large"></i></a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{ route('index') }}" class="brand-link">
      <img src="{{ asset('masterPersianAdminLTE-master/dist/img/AdminLTELogo.png') }}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">میز مدیریت</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <div>
        <!-- Sidebar user panel (optional) -->
        @auth
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            @php
              $userImage = auth()->user()->image;
              $defaultAvatar = 'https://www.gravatar.com/avatar/' . md5(strtolower(trim(auth()->user()->email))) . '?s=200&d=mm&r=g';
              if ($userImage) {
                  $profileImage = preg_match('/^https?:\/\//', $userImage)
                      ? $userImage
                      : asset('storage/' . ltrim($userImage, '/'));
              } else {
                  $profileImage = $defaultAvatar;
              }
            @endphp
            <img src="{{ $profileImage }}" class="img-circle elevation-2" alt="{{ auth()->user()->name }}">
          </div>
          <div class="info">
            <a href="#" class="d-block">{{ auth()->user()->name }}</a>
          </div>
        </div>
        @else
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src="https://www.gravatar.com/avatar/?s=200&d=mm&r=g" class="img-circle elevation-2" alt="کاربر مهمان">
          </div>
          <div class="info">
            <a href="#" class="d-block">کاربر مهمان</a>
          </div>
        </div>
        @endauth

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <!-- Dashboard - All authenticated users can see -->
            <li class="nav-item">
              <a href="{{ route('index') }}" class="nav-link {{ request()->routeIs('index') ? 'active' : '' }}">
                <i class="nav-icon fa fa-bar-chart"></i>
                <p>پنجره اطلاعات</p>
              </a>
            </li>
            <!-- Products - All can view, Admin/Seller can manage -->
            <li class="nav-item">
              <a href="{{ route('products.index') }}" class="nav-link {{ request()->routeIs('products.*') ? 'active' : '' }}">
                <i class="nav-icon fa fa-cubes"></i>
                <p>محصولات/گدام</p>
              </a>
            </li>

            <!-- Sales - Seller/Admin only -->
            @if(auth()->user()?->hasRole('seller', 'admin'))
            <li class="nav-item">
              <a href="{{ route('sales.create') }}" class="nav-link {{ request()->routeIs('sales.create') ? 'active' : '' }}">
                <i class="nav-icon fa fa-plus-circle"></i>
                <p>فروش جدید</p>
              </a>
            </li>
            @endif

            <!-- Sales Submenu - Seller/Admin only -->
            @if(auth()->user()?->hasRole('seller', 'admin'))
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="fas fa-cart-arrow-down nav-icon"></i>
                <p>
                  فروشات
                  <i class="fa fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="{{ route('sales.today') }}" class="nav-link {{ request()->routeIs('sales.today') ? 'active' : '' }}">
                    <i class="nav-icon fa fa-clock"></i>
                    <p>فروشات امروز</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="{{ route('sale-items.index') }}" class="nav-link {{ request()->routeIs('sale-items.*') ? 'active' : '' }}">
                    <i class="nav-icon fas fa-clipboard-check"></i>
                    <p>فروشات</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="{{ route('sales.index') }}" class="nav-link {{ request()->routeIs('sales.index') ? 'active' : '' }}">
                    <i class="nav-icon fa fa-shopping-bag"></i>
                    <p>فروشات عمومی</p>
                  </a>
                </li>
              </ul>
            </li>
            @endif

            <!-- Customers - Seller/Admin can manage, Monitor can view -->
            <li class="nav-item">
              <a href="{{ route('customers.index') }}" class="nav-link {{ request()->routeIs('customers.*') ? 'active' : '' }}">
                <i class="nav-icon fa fa-users"></i>
                <p>مشتریان</p>
              </a>
            </li>

            <!-- Financial - All authenticated users can view, Admin can manage -->
            <li class="nav-item">
              <a href="{{ route('transactions.index') }}" class="nav-link {{ request()->routeIs('transactions.*') || request()->routeIs('expenses.*') ? 'active' : '' }}">
                <i class="nav-icon fa fa-money"></i>
                <p>حسابات مالی</p>
              </a>
            </li>

            <!-- Settings - Admin only -->
            @if(auth()->user()?->isAdmin())
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fa fa-gear"></i>
                <p>
                  تنظیمات
                  <i class="fa fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="{{ route('users.index') }}" class="nav-link {{ request()->routeIs('users.*') ? 'active' : '' }}">
                    <i class="fas fa-users nav-icon"></i>
                    <p>تظیمات کابران</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="{{ route('settings.company') }}" class="nav-link {{ request()->routeIs('settings.company') ? 'active' : '' }}">
                    <i class="fas fa-building nav-icon"></i>
                    <p>تنظیمات فاکتور</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="{{ route('profile.edit') }}" class="nav-link {{ request()->routeIs('profile.*') ? 'active' : '' }}">
                    <i class="fas fa-user nav-icon"></i>
                    <p>نمایه</p>
                  </a>
                </li>
              </ul>
            </li>
            @else
            <!-- Profile only for non-admin -->
            <li class="nav-item">
              <a href="{{ route('profile.edit') }}" class="nav-link {{ request()->routeIs('profile.*') ? 'active' : '' }}">
                <i class="fas fa-user nav-icon"></i>
                <p>نمایه</p>
              </a>
            </li>
            @endif

            <!-- Logout - All authenticated users -->
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                <i class="nav-icon fa fa-sign-out"></i>
                <p>خروج از سیستم</p>
              </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
          @csrf
        </form>
      </div>
    </div>
    <!-- /.sidebar -->
  </aside>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">@yield("title")</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-left">
              <li class="breadcrumb-item"><a href="{{ route('index') }}">خانه</a></li>
              <li class="breadcrumb-item active">@yield('title')</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Main content -->
    <section class="content">
      @yield('content')
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->

  <!-- Main Footer -->
  <footer class="main-footer">
    <!-- To the right -->
    <div class="float-right d-sm-none d-md-block">
      Anything you want
    </div>
    <!-- Default to the left -->
    <strong>CopyLeft &copy; 2018 <a href="http://github.com/hesammousavi/">امید شاهیزاده</a>.</strong>
  </footer>
</div>
<!-- ./wrapper -->

<div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="confirmDeleteModalLabel">حذف اطلاعات</h5>
        <button type="button" class="close text-white" data-dismiss="modal" aria-label="بستن">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟ این عملیات قابل بازگشت نیست.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">لغو</button>
        <button type="button" class="btn btn-danger" id="confirmDeleteModalConfirm">حذف</button>
      </div>
    </div>
  </div>
</div>

<!-- REQUIRED SCRIPTS -->
<!-- jQuery -->
<script src="{{ asset('masterPersianAdminLTE-master/plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap -->
<script src="{{ asset('masterPersianAdminLTE-master/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('masterPersianAdminLTE-master/dist/js/adminlte.js') }}"></script>

<!-- OPTIONAL SCRIPTS -->
<script src="{{ asset('masterPersianAdminLTE-master/dist/js/demo.js') }}"></script>

<!-- PAGE PLUGINS -->
<!-- SparkLine -->
<script src="{{ asset('masterPersianAdminLTE-master/plugins/sparkline/jquery.sparkline.min.js') }}"></script>
<!-- jVectorMap -->
<script src="{{ asset('masterPersianAdminLTE-master/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js') }}"></script>
<script src="{{ asset('masterPersianAdminLTE-master/plugins/jvectormap/jquery-jvectormap-world-mill-en.js') }}"></script>
<!-- SlimScroll 1.3.0 -->
<script src="{{ asset('masterPersianAdminLTE-master/plugins/slimScroll/jquery.slimscroll.min.js') }}"></script>
<!-- ChartJS 1.0.2 -->
<script src="{{ asset('masterPersianAdminLTE-master/plugins/chartjs-old/Chart.min.js') }}"></script>

<!-- PAGE SCRIPTS -->
<script src="{{ asset('masterPersianAdminLTE-master/dist/js/pages/dashboard2.js') }}"></script>
<script>
  $(function () {
    var confirmForm = null;
    var deleteModal = $('#confirmDeleteModal');

    $(document).on('submit', 'form.confirm-delete', function (event) {
      // If confirmation is already given, allow submission
      if ($(this).data('confirmed') === true) {
        return true;
      }
      
      event.preventDefault();
      confirmForm = this;
      var title = $(this).data('confirm-title') || 'حذف اطلاعات';
      var message = $(this).data('confirm-message') || 'آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟ این عملیات قابل بازگشت نیست.';
      deleteModal.find('.modal-title').text(title);
      deleteModal.find('.modal-body p').text(message);
      deleteModal.modal('show');
      return false;
    });

    $('#confirmDeleteModalConfirm').on('click', function () {
      if (confirmForm) {
        deleteModal.modal('hide');
        setTimeout(function () {
          $(confirmForm).data('confirmed', true);
          $(confirmForm).submit();
        }, 150);
      }
    });
  });
</script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    var loader = document.getElementById('page-loader');
    if (!loader) {
      return;
    }

    var hideTimeout;
    function hideLoader() {
      clearTimeout(hideTimeout);
      loader.classList.add('hidden');
      hideTimeout = window.setTimeout(function () {
        loader.style.display = 'none';
      }, 180);
    }

    function showLoader() {
      if (loader.classList.contains('hidden') === false && loader.style.display === 'flex') {
        return;
      }
      loader.style.display = 'flex';
      loader.classList.remove('hidden');
    }

    hideLoader();

    window.addEventListener('load', hideLoader);
    window.addEventListener('pageshow', function (event) {
      if (event.persisted) {
        hideLoader();
      }
    });

    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href]');
      if (!link || link.target && link.target !== '_self') {
        return;
      }
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) {
        return;
      }
      var destination = new URL(href, window.location.href);
      if (destination.origin !== window.location.origin) {
        return;
      }
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) {
        return;
      }
      showLoader();
    });

    window.addEventListener('beforeunload', function () {
      showLoader();
    });

    document.addEventListener('submit', function (event) {
      if (event.defaultPrevented) {
        return;
      }
      var form = event.target.closest('form');
      if (!form) {
        return;
      }
      if (form.matches('form.confirm-delete') && form.dataset.confirmed !== 'true') {
        return;
      }
      showLoader();
    });
  });
</script>
<!-- Global AJAX / Authorization handlers -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
(function(){
  function showForbidden(msg){
    Swal.fire({
      icon: 'error',
      title: 'دسترسی مجاز نیست',
      html: '<p style="direction:rtl; margin:10px 0;">'+(msg||'شما اجازه انجام این عملیات را ندارید.')+'</p>',
      confirmButtonText: 'متوجه شدم',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  // Helper function to check permission and navigate
  function checkPermissionAndNavigate(href){
    fetch(href, { 
      method: 'HEAD', 
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      redirect: 'manual'
    })
    .then(res => {
      if(res.status === 403) {
        showForbidden('شما اجازه دسترسی به این بخش را ندارید.');
        return;
      }
      if(res.status >= 200 && res.status < 400) {
        window.location.href = href;
      }
    })
    .catch(err => {
      console.error('Permission check failed:', err);
      window.location.href = href;
    });
  }

  // Intercept clicks on links with class requires-role
  document.addEventListener('click', function(e){
    const a = e.target.closest && e.target.closest('a.requires-role');
    if(!a) return;
    if(a.hasAttribute('data-checked')) return;
    
    e.preventDefault();
    e.stopImmediatePropagation();
    checkPermissionAndNavigate(a.href);
  }, true);

  // Intercept button clicks with onclick that redirect
  document.addEventListener('click', function(e){
    const btn = e.target.closest && e.target.closest('button[onclick*="window.location"]');
    if(!btn) return;
    if(btn.hasAttribute('data-checked')) return;
    
    e.preventDefault();
    e.stopImmediatePropagation();
    
    const onclick = btn.getAttribute('onclick');
    const match = onclick.match(/window\.location\.href\s*=\s*'([^']*)'|window\.location\.href\s*=\s*"([^"]*)"/);
    if(match) {
      const href = match[1] || match[2];
      checkPermissionAndNavigate(href);
    }
  }, true);

  // Intercept form submissions for forms with class ajax-protect
  document.addEventListener('submit', function(e){
    const form = e.target.closest && e.target.closest('form.ajax-protect');
    if(!form) return;
    if(form.getAttribute('data-checked') === '1') return; // bypass if already checked
    
    e.preventDefault();
    e.stopImmediatePropagation();
    
    const action = form.action;
    const method = (form.getAttribute('method') || 'POST').toUpperCase();
    
    // Check permission by attempting a HEAD request to the action endpoint
    fetch(action, { 
      method: 'HEAD',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      redirect: 'manual'
    })
    .then(res => {
      if(res.status === 403) {
        showForbidden('شما اجازه انجام این عملیات را ندارید.');
        return;
      }
      if(res.status >= 200 && res.status < 400) {
        // permission granted, allow submission
        form.setAttribute('data-checked', '1');
        form.submit();
      }
    })
    .catch(err => {
      console.error('Permission check failed:', err);
      form.setAttribute('data-checked', '1');
      form.submit();
    });
  }, true); // use capture phase

  // Wrap fetch globally to catch 403 responses from any AJAX calls
  if(window.fetch){
    const _fetch = window.fetch.bind(window);
    window.fetch = function(input, init){
      return _fetch(input, init).then(async res => {
        if(res && res.status === 403){
          try { 
            const j = await res.json(); 
            showForbidden(j.message || 'شما اجازه انجام این عملیات را ندارید.'); 
          } catch(e){ 
            showForbidden('شما اجازه انجام این عملیات را ندارید.'); 
          }
          return Promise.reject(new Error('Forbidden'));
        }
        return res;
      }).catch(err => {
        if(err.message === 'Forbidden') {
          return Promise.reject(err);
        }
        throw err;
      });
    };
  }
})();
</script>
@yield("jslinks")
</body>
</html>
