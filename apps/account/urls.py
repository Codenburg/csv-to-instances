from django.urls import path
from apps.account import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.getRoutes),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test/', views.testEndPoint, name='test_endpoint'),
]
