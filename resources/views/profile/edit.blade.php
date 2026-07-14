@extends("layouts.master")

@section("page_title")
ویرایش نمایه
@endsection

@section("title")
ویرایش نمایه
@endsection

@section("content")
<div class="row">
    <div class="col-md-8">
        <div class="card card-info">
            <div class="card-header">
                <h3 class="card-title">اطلاعات نمایه</h3>
            </div>
            <form method="POST" action="{{ route('profile.update') }}" enctype="multipart/form-data">
                @csrf
                @method('PATCH')
                <div class="card-body">
                    @if (session('status') === 'profile-updated')
                        <div class="alert alert-success">
                            اطلاعات پروفایل با موفقیت بروزرسانی شد.
                        </div>
                    @endif

                    <div class="form-group">
                        <label for="image">تصویر پروفایل</label>
                        <div class="mb-2">
                            @if ($user->image)
                                <img src="{{ asset('storage/' . $user->image) }}" alt="avatar" class="img-thumbnail" style="width:120px;height:120px;object-fit:cover;">
                            @else
                                <img src="{{ asset('masterPersianAdminLTE-master/dist/img/user2-160x160.jpg') }}" alt="avatar" class="img-thumbnail" style="width:120px;height:120px;object-fit:cover;">
                            @endif
                        </div>
                        <input type="file" name="image" id="image" class="form-control @error('image') is-invalid @enderror" accept="image/*">
                        @error('image')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="name">نام</label>
                        <input type="text" name="name" id="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name', $user->name) }}" required autofocus>
                        @error('name')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="email">ایمیل</label>
                        <input type="email" name="email" id="email" class="form-control @error('email') is-invalid @enderror" value="{{ old('email', $user->email) }}" required>
                        @error('email')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
                        <div class="alert alert-warning">
                            ایمیل شما تایید نشده است.
                            <button type="submit" form="send-verification" class="btn btn-sm btn-primary">ارسال دوباره لینک تایید</button>
                        </div>
                    @endif
                </div>
                <div class="card-footer">
                    <button type="submit" class="btn btn-info">ذخیره تغییرات</button>
                </div>
            </form>

            <form id="send-verification" method="post" action="{{ route('verification.send') }}" class="d-none">
                @csrf
            </form>
        </div>

        <div class="card card-warning">
            <div class="card-header">
                <h3 class="card-title">تغییر رمز عبور</h3>
            </div>
            <form method="POST" action="{{ route('password.update') }}">
                @csrf
                @method('PUT')
                <div class="card-body">
                    @if (session('status') === 'password-updated')
                        <div class="alert alert-success">
                            رمز عبور با موفقیت بروزرسانی شد.
                        </div>
                    @endif

                    <div class="form-group">
                        <label for="current_password">رمز عبور فعلی</label>
                        <input type="password" name="current_password" id="current_password" class="form-control @error('current_password', 'updatePassword') is-invalid @enderror" autocomplete="current-password">
                        @error('current_password', 'updatePassword')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="password">رمز عبور جدید</label>
                        <input type="password" name="password" id="password" class="form-control @error('password', 'updatePassword') is-invalid @enderror" autocomplete="new-password">
                        @error('password', 'updatePassword')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="password_confirmation">تایید رمز عبور جدید</label>
                        <input type="password" name="password_confirmation" id="password_confirmation" class="form-control @error('password_confirmation', 'updatePassword') is-invalid @enderror" autocomplete="new-password">
                        @error('password_confirmation', 'updatePassword')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                </div>
                <div class="card-footer">
                    <button type="submit" class="btn btn-warning">به‌روزرسانی رمز عبور</button>
                </div>
            </form>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card card-danger">
            <div class="card-header">
                <h3 class="card-title">حذف حساب کاربری</h3>
            </div>
            <form method="POST" action="{{ route('profile.destroy') }}" class="confirm-delete" data-confirm-title="حذف حساب کاربری" data-confirm-message="آیا مطمئن هستید که می‌خواهید این حساب را حذف کنید؟ این عملیات غیرقابل بازگشت است.">
                @csrf
                @method('DELETE')
                <div class="card-body">
                    <p>برای حذف دائمی حساب، لطفاً رمز عبور خود را وارد کنید.</p>

                    <div class="form-group">
                        <label for="delete_password">رمز عبور</label>
                        <input type="password" name="password" id="delete_password" class="form-control @error('password', 'userDeletion') is-invalid @enderror" autocomplete="current-password">
                        @error('password', 'userDeletion')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    @if ($errors->userDeletion->any())
                        <div class="alert alert-danger">
                            لطفاً رمز عبور را به درستی وارد کنید.
                        </div>
                    @endif
                </div>
                <div class="card-footer">
                    <button type="submit" class="btn btn-danger">حذف حساب</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('jslinks')
@endsection
