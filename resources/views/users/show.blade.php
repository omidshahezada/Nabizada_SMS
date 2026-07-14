@extends("layouts.master")

@section("page_title")
نمایه کاربر
@endsection
@section("title")
نمایه کاربر
@endsection

@section("content")
<div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="profile-user-img img-fluid img-circle" style="width: 20%; height: 5%;" src="{{asset('storage/'. $user->image)}}" alt="User profile picture">
                </div>
                <h3 class="profile-username text-center">{{$user->name}}</h3>
                <p class="text-muted text-center">{{$user->role->name ?? 'ندارد'}}</p>
                <div class="card">
              <div class="card-header">
                <h3 class="card-title">مشخصات کاربر</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
            <table>
                <tr>
                    <th>نام کاربر:</th>
                    <td>{{$user->name}}</td>
                </tr>
                <tr>
                    <th>ایمیل:</th>
                    <td>{{$user->email}}</td>
                </tr>
                <tr>
                    <th>نقش:</th>
                    <td>{{$user->role->name ?? 'ندارد'}}</td>
                </tr>
            </table>
                
      </div>
    </div>

    <button class="btn btn-info" onclick="window.location.href='{{ route('users.index') }}'">بازگشت</button>
  </div>
              <!-- /.card-body -->
</div>
@endsection
