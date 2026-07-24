def success_response(
    message,
    data=None,
    meta=None,
    status_code=200,
):
    return {
        "success": True,
        "message": message,
        "data": data,
        "meta": meta,
        "errors": [],
    }, status_code


def error_response(message, errors=None, status_code=400):
    return {
        "success": False,
        "message": message,
        "data": None,
        "meta": None,
        "errors": errors or [],
    }, status_code