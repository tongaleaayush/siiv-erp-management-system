def success_response(message, data=None, status_code=200):
    """
    Return a standardized success response.
    """

    return {
        "success": True,
        "message": message,
        "data": data,
        "errors": [],
    }, status_code


def error_response(message, errors=None, status_code=400):
    """
    Return a standardized error response.
    """

    return {
        "success": False,
        "message": message,
        "data": None,
        "errors": errors or [],
    }, status_code