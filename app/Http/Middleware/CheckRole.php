<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $userRole = auth()->user()->role?->name;

        if (!in_array($userRole, $roles)) {
            if ($request->expectsJson() || $request->ajax() || $request->wantsJson()) {
                return response()->json(['error' => 'forbidden', 'message' => 'اجازه دسترسی ندارید'], 403);
            }
            abort(403, 'اجازه دسترسی ندارید');
        }

        return $next($request);
    }
}
