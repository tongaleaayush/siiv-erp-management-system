from flask_restx import Namespace, Resource

health_ns = Namespace(
    "health",
    description="Health Check APIs"
)


@health_ns.route("/")
class HealthResource(Resource):
    def get(self):
        return {
            "status": "success",
            "message": "SIIV ERP Backend is running successfully."
        }, 200