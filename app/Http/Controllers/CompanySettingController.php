<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompanySetting;

class CompanySettingController extends Controller
{
    public function edit()
    {
        $settings = CompanySetting::first();
        if (!$settings) {
            $settings = CompanySetting::create([]);
        }
        return view('settings.company', compact('settings'));
    }

    public function update(Request $request)
    {
        $settings = CompanySetting::first();
        $data = $request->validate([
            'company_name' => 'nullable|string',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bill_header' => 'nullable|string',
            'bill_footer' => 'nullable|string',
        ]);
        
        if ($request->hasFile('logo')) {
            if ($settings && $settings->logo_path && file_exists(storage_path('app/public/' . $settings->logo_path))) {
                unlink(storage_path('app/public/' . $settings->logo_path));
            }
            $logoPath = $request->file('logo')->store('company', 'public');
            $data['logo_path'] = $logoPath;
        }
        
        if (!$settings) {
            $settings = CompanySetting::create($data);
        } else {
            $settings->update($data);
        }
        return redirect()->route('settings.company')->with('success', 'تنظیمات ذخیره شد');
    }
}
