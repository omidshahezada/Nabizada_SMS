<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\View;
use Throwable;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     */
    public function render($request, Throwable $e)
    {
        // Determine HTTP status code
        if ($e instanceof HttpExceptionInterface) {
            $status = $e->getStatusCode();
        } else {
            $status = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 500;
        }

        // Prefer views/errors/{status}.blade.php
        if (View::exists("errors.$status")) {
            return response()->view("errors.$status", ['exception' => $e], $status);
        }

        // Allow top-level views like resources/views/404.blade.php or 505.blade.php
        if (View::exists((string) $status)) {
            return response()->view((string) $status, ['exception' => $e], $status);
        }

        // Fallback to errors.default if present
        if (View::exists('errors.default')) {
            return response()->view('errors.default', ['exception' => $e], $status);
        }

        return parent::render($request, $e);
    }
}
