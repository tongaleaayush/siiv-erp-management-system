import os
from datetime import timedelta

from dotenv import load_dotenv


load_dotenv()



class Config:
    """
    Base configuration.
    Shared configuration for all environments.
    """


    SECRET_KEY = os.getenv(
        "SECRET_KEY"
    )


    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY"
    )


    # JWT Access Token Configuration
    # Used for normal API authentication
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        minutes=int(
            os.getenv(
                "JWT_ACCESS_TOKEN_EXPIRES",
                15
            )
        )
    )


    # JWT Refresh Token Configuration
    # Used for generating new access tokens
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(
        days=int(
            os.getenv(
                "JWT_REFRESH_TOKEN_EXPIRES",
                7
            )
        )
    )


    # Database Configuration

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL"
    )


    SQLALCHEMY_TRACK_MODIFICATIONS = False



    # API Configuration

    API_VERSION = os.getenv(
        "API_VERSION"
    )





class DevelopmentConfig(Config):
    """
    Development environment configuration.
    """

    DEBUG = True





class TestingConfig(Config):
    """
    Testing environment configuration.
    """

    TESTING = True
    DEBUG = False





class ProductionConfig(Config):
    """
    Production environment configuration.
    """

    DEBUG = False