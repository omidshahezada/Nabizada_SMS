@extends("layouts.master")

@section("page_title")
ویرایش کاربر
@endsection
@section("title")
ویرایش کاربر
@endsection
@section("content")
<div class="card card-info">

    <div class="card-header">
        <h3 class="card-title">فرم ویرایش کاربر</h3>
    </div>

    <!-- form start -->
    <form method="POST" action="{{ route('users.update', $user->id) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="card-body">

            <div class="row">

                <!-- ستون اول -->
                <div class="col-md-4">

                    <div class="form-group">
                        <label>نام کاربر</label>
                        <input type="text"
                               class="form-control"
                               name="name"
                               placeholder="نام کاربر را وارد کنید"
                               value="{{$user->name}}">
                    </div>

                    <div class="form-group">
                        <label>رمز عبور</label>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="رمز عبور را وارد کنید" name="password" value="{{old('password')}}">
                            <div class="input-group-append">
                                <span class="input-group-text">حداقل 8 علامه</span>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- ستون دوم -->
                <div class="col-md-4">

                    <div class="form-group">
                        <label>ایمیل کاربر</label>
                        <input type="email"
                               class="form-control"
                               name="email"
                               placeholder="ایمیل کاربر را وارد کنید"
                               value="{{$user->email}}">   
                    </div>
                    
                    <div class="form-group">
                        <label>عکس نمایه</label>
                        <input type="file"
                               class="form-control"
                               name="profile_image"
                               placeholder="عکس نمایه کاربر را انتخاب کنید"
                               value="{{old('profile_image')}}">   
                    </div>

                </div>

                <!-- ستون سوم -->
                <div class="col-md-4">

                    <div class="form-group">
                        <label>نقش کاربر</label>
                        <select name="role_id" id="" class="form-control">
                            <option value="">نقش کاربر را انتخاب کنید</option>
                            @foreach($roles as $role)
                                <option value="{{ $role->id }}" {{ $user->role_id == $role->id ? 'selected' : '' }}>
                                    {{ $role->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>

            </div>

        </div>

        <!-- footer -->
        <div class="card-footer">
            <button type="submit" class="btn btn-info">به‌روزرسانی کاربر</button>
            <button type="button" class="btn btn-default float-left" onclick="window.location.href='{{ route('users.index') }}'">لغو</button>
        </div>

    </form>

</div>
@endsection