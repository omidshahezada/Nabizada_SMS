@extends("layouts.master")

@section("page_title")
کاربران | اضافه کردن کاربر جدید
@endsection

@section("title")
ثبت کاربر
@endsection

@section("content")

<div class="card card-info">

    <div class="card-header">
        <h3 class="card-title">فرم ثبت کاربر</h3>
    </div>

    <!-- form start -->
    <form method="POST" action="{{ route('users.store') }}" enctype="multipart/form-data">
        @csrf
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
                               value="{{old('name')}}">
                        @error('name')
                            <span class="text-danger d-block">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label>رمز عبور</label>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="رمز عبور را وارد کنید" name="password" value="{{old('password')}}">
                            <div class="input-group-append">
                                <span class="input-group-text">حداقل 8 علامه</span>
                            </div>
                        </div>
                        @error('password')
                            <span class="text-danger d-block">{{ $message }}</span>
                        @enderror
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
                               value="{{old('email')}}">   
                        @error('email')
                            <span class="text-danger d-block">{{ $message }}</span>
                        @enderror
                    </div>
                    
                    <div class="form-group">
                        <label>عکس نمایه</label>
                        <input type="file"
                               class="form-control"
                               name="profile_image"
                               placeholder="عکس نمایه کاربر را انتخاب کنید"
                               value="{{old('profile_image')}}">   
                        @error('profile_image')
                            <span class="text-danger d-block">{{ $message }}</span>
                        @enderror
                    </div>

                </div>

                <!-- ستون سوم -->
                <div class="col-md-4">

                    <div class="form-group">
                        <label>نقش کاربر</label>
                        <select name="role_id" id="" class="form-control">
                            <option value="">نقش کاربر را انتخاب کنید</option>
                            @foreach($roles as $role)
                                <option value="{{ $role->id }}" {{ old('role') == $role->id ? 'selected' : '' }}>
                                    {{ $role->name }}
                                </option>
                            @endforeach
                        </select>
                        @error('role_id')
                            <span class="text-danger d-block">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

            </div>

        </div>

        <!-- footer -->
        <div class="card-footer">
            <button type="submit" class="btn btn-info">ثبت کاربر</button>
            <button type="button" class="btn btn-default float-left" onclick="window.location.href='{{ route('users.index') }}'">لغو</button>
        </div>

    </form>

</div>

@endsection
