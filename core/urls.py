from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),
    path('trutests/', include('trutests.urls')),
    path('account/',include('account.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
